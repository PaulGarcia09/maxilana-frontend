import React, { FC, useReducer } from 'react';
import { checkLoanAccount, requestLoan3DTransaction } from '~/api/payments';
import { PageLoader } from '~/components/common';
import PaymentForm, {
  BankTransactionForm,
  LoanAccountForm,
  LoanSelectionPaymentForm,
} from '~/components/payments';
import { LoanAccount } from '~/types/Models';
import { LoanPaymentRequest, ServicePaymentRequest } from '~/types/Requests';
import { MaxilanaTransaction } from '~/types/Responses';

type PaymentRequest = ServicePaymentRequest;

type Status = 'idle' | 'select_payment' | 'confirm_payment' | 'submit_payment';

type Payment = {
  concept: string;
  amount: number;
};

type Transaction = {
  payment: LoanPaymentRequest;
  transaction: MaxilanaTransaction;
};

type State = {
  status: Status;
  account: LoanAccount | null;
  paymentRequest: Payment | null;
  transactionRequest: Transaction | null;
};

const initialState: State = {
  status: 'idle',
  account: null,
  paymentRequest: null,
  transactionRequest: null,
};

const reducer = (state: State, action: any): State => {
  const { type, payload } = action;

  switch (type) {
    case 'SELECT_PAYMENT':
      return {
        ...state,
        status: 'select_payment',
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
    default:
      return initialState;
  }
};

const LoanPaymentFlow: FC = () => {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState);

  const handleSignAccount = async (data: any) => {
    const account = await checkLoanAccount(data);
    dispatch({ type: 'SELECT_PAYMENT', payload: { account } });
  };

  const handleSelectPayment = async (amount: number) => {
    const paymentRequest = {
      amount,
      concept: `ABONO A PRÉSTAMO NÚMERO ${state?.account?.clientCode}`,
    };

    dispatch({ type: 'CONFIRM_PAYMENT', payload: { paymentRequest } });
  };

  const handleSubmitPayment = async (data: PaymentRequest) => {
    const { concepto, ...rest } = data;
    const { account } = state;

    // NO REGRESAN LA SUCURSAL, LA TENGO QUE SACAR DESDE LA CUENTA
    const [sucursal, codigoprestamo] = account?.clientCode.split('-') || [];

    if (!account || (!sucursal && !codigoprestamo)) {
      throw new Error('No fue posible procesar el pago, vuelve a iniciar el proceso.');
    }

    const paymentRequest = {
      ...rest,
      sucursal,
      codigoprestamo,
    };

    const maxilanaTransaction = await requestLoan3DTransaction(paymentRequest);

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
      {state.status === 'idle' && <LoanAccountForm onSubmit={handleSignAccount} />}
      {state.status === 'select_payment' && state.account && (
        <LoanSelectionPaymentForm account={state.account} onSubmit={handleSelectPayment} />
      )}
      {state.status === 'confirm_payment' && state.paymentRequest && (
        <PaymentForm
          data={state.paymentRequest}
          title="Préstamos personales"
          description="Abona a tu préstamo personal en línea"
          onSubmit={handleSubmitPayment}
        />
      )}
      {state.status === 'submit_payment' && state.transactionRequest && (
        <PageLoader text="En un momento serás redirigido a la pasarela de pagos...">
          {state.transactionRequest !== null && (
            <BankTransactionForm
              {...state.transactionRequest}
              forwardPath={`${window.location.origin}/pagos/respuesta?type=loans`}
            />
          )}
        </PageLoader>
      )}
    </div>
  );
};

export default LoanPaymentFlow;
