import React, { FC, useReducer } from 'react';

import { PageLoader } from '~/components/common';
import PaymentForm, {
  BankTransactionForm,
  CouponAccountForm,
  CouponCheckPaymentForm,
} from '~/components/payments';
import { checkCouponAccount, requestCoupon3DTransaction } from '~/api/payments/coupons';

import { CouponAccount } from '~/types/Models';
import { CouponPaymentRequest, ServicePaymentRequest } from '~/types/Requests';
import { MaxilanaTransaction } from '~/types/Responses';

type PaymentRequest = ServicePaymentRequest;

type Status = 'idle' | 'check_payment' | 'confirm_payment' | 'submit_payment';

type Payment = {
  concept: string;
  amount: number;
  celular: number;
};

type Transaction = {
  payment: CouponPaymentRequest;
  transaction: MaxilanaTransaction;
};

type State = {
  status: Status;
  token: string;
  account: CouponAccount | null;
  paymentRequest: Payment | null;
  transactionRequest: Transaction | null;
};

const PAYMENT_CONCEPT = 'ABONO A LÍNEA DE CRÉDITO DIST.';

const initialState: State = {
  status: 'idle',
  token: '',
  account: null,
  paymentRequest: null,
  transactionRequest: null,
};

const reducer = (state: State, action: any): State => {
  const { type, payload } = action;

  switch (type) {
    case 'CHECK_PAYMENT':
      return {
        ...state,
        status: 'check_payment',
        account: payload.account,
      };
    case 'CONFIRM_PAYMENT':
      return {
        ...state,
        status: 'confirm_payment',
        paymentRequest: payload.paymentRequest,
      };
    case 'SUBMIT_PAYMENT':
      return {
        ...state,
        status: 'submit_payment',
        transactionRequest: payload.transactionRequest,
      };
    case 'SUBMIT_TOKEN':
      return {
        ...state,
        token: payload.token,
      };
    default:
      return initialState;
  }
};

const CouponPaymentFlow: FC = () => {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState);

  const handleSignAccount = async (data: any) => {
    const account = await checkCouponAccount(data);
    dispatch({ type: 'CHECK_PAYMENT', payload: { account } });
  };

  const handleCheckPayment = async (amount: number) => {
    const paymentRequest = {
      amount,
      concept: `${PAYMENT_CONCEPT} #${state.account?.partnerNumber}`,
      celular: state.account?.phoneNumber,
    };

    dispatch({ type: 'CONFIRM_PAYMENT', payload: { paymentRequest } });
  };

  const handleSubmitPayment = async (data: PaymentRequest) => {
    const { concepto, ...rest } = data;
    const { account } = state;

    if (!account) {
      throw new Error('No fue posible procesar el pago, vuelve a iniciar el proceso.');
    }

    const paymentRequest = {
      ...rest,
      cdistribuidora: account.partnerNumber,
    };
    const maxilanaTransaction = await requestCoupon3DTransaction(paymentRequest);

    dispatch({ type: 'SUBMIT_TOKEN', payload: { token: maxilanaTransaction.JsonWebToken } });

    const transactionRequest = {
      payment: paymentRequest,
      transaction: maxilanaTransaction,
    };

    dispatch({
      type: 'SUBMIT_PAYMENT',
      payload: {
        transactionRequest,
      },
    });
  };

  return (
    <div>
      {state.status === 'idle' && <CouponAccountForm onSubmit={handleSignAccount} />}
      {state.status === 'check_payment' && state.account !== null && (
        <CouponCheckPaymentForm account={state.account} onSubmit={handleCheckPayment} />
      )}
      {state.status === 'confirm_payment' && state.paymentRequest && (
        <PaymentForm
          title="Maxilana Vales"
          data={state.paymentRequest}
          description="Paga directamente a tu distribuidora"
          onSubmit={handleSubmitPayment}
          showSubmitButton={true}
        />
      )}
      {state.status === 'submit_payment' && state.transactionRequest && (
        <PageLoader text="En un momento serás redirigido a la pasarela de pagos...">
          {state.transactionRequest !== null && (
            <BankTransactionForm
              {...state.transactionRequest}
              forwardPath={`${window.location.origin}/pagos/respuesta?type=coupons&token=${state.token}&cardtype=${state.transactionRequest.payment.cardtype}`}
            />
          )}
        </PageLoader>
      )}
    </div>
  );
};

export default CouponPaymentFlow;
