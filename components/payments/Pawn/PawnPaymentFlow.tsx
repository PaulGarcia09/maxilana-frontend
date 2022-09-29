import React, { FC, useEffect, useReducer } from 'react';

import { PageLoader } from '~/components/common';
import { checkAccount, requestPawn3DTransaction } from '~/api/payments';
import PaymentForm, {
  BankTransactionForm,
  PawnAccountForm,
  PawnCalculateForm,
} from '~/components/payments';
import { PawnAccount } from '~/types/Models';
import { MaxilanaTransaction } from '~/types/Responses';
import { PawnPaymentRequest, ServicePaymentRequest } from '~/types/Requests';

type PaymentRequest = ServicePaymentRequest;

type Status = 'idle' | 'account_set' | 'payment_selected' | 'payment_submitted';

type Payment = {
  concept: string;
  amount: number;
  paymentCode: '1' | '2' | '3';
  paymentExtension: number;
  celular: number;
};

type Transaction = {
  payment: PawnPaymentRequest;
  transaction: MaxilanaTransaction;
};

type State = {
  status: Status;
  token: string;
  account: PawnAccount | null;
  paymentRequest: Payment | null;
  transactionRequest: Transaction | null;
};

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
    case 'SET_ACCOUNT':
      return {
        ...state,
        status: 'account_set',
        account: payload.account,
      };
    case 'SET_PAYMENT':
      return {
        ...state,
        status: 'payment_selected',
        paymentRequest: payload.paymentRequest,
      };
    case 'SUBMIT_PAYMENT':
      return {
        ...state,
        status: 'payment_submitted',
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

const PAYMENT_CONCEPT = [
  'PAGO DE INTERÉS NUEVO CONTRATO (REFRENDO, AMPLIACIÓN DE TÉRMINO DEL CONTRATO)',
  'ABONO A INTERÉS',
];

const PawnPaymentFlow: FC = () => {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState);

  const handleSignAccount = async (data: any) => {
    const account = await checkAccount(data);
    dispatch({ type: 'SET_ACCOUNT', payload: { account } });
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handlePaymentSelection = (data: any) => {
    let paymentCode = '1'; // REFRENDO
    let concept = PAYMENT_CONCEPT[1]; // ABONOS
    let paymentExtension = 0;

    if (data.paymentType === 'REFRENDO') {
      concept = PAYMENT_CONCEPT[0];
    } else if (data.paymentType === 'ABONO') {
      paymentCode = '2';
      paymentExtension = data.paymentExtension;
    } else {
      paymentCode = '3';
    }

    const paymentRequest = {
      concept,
      paymentCode,
      paymentExtension,
      amount: data.paymentAmount,
      celular: data.phoneNumber,
    };

    dispatch({ type: 'SET_PAYMENT', payload: { paymentRequest } });

    return Promise.resolve();
  };

  const handleSubmitPayment = async (data: PaymentRequest) => {
    const { account, paymentRequest } = state;
    const { concepto, email, ...rest } = data;

    if (!account || !paymentRequest) {
      throw new Error('No fue posible procesar el pago, vuelve a iniciar el proceso.');
    }

    const request = {
      ...rest,
      email,
      detallepago: [
        {
          sucursal: account.branch,
          letra: account.accountLetter,
          boleta: account.accountNumber,
          fechaconsulta: account.requestDate,
          prestamo: account.loanAmount.toString(),
          codigotipopago: paymentRequest.paymentCode,
          monto: paymentRequest.amount.toString(),
          diaspagados: paymentRequest.paymentExtension.toString(), // Pago de días (si se eligió)
        },
      ],
    };

    const maxilanaTransaction = await requestPawn3DTransaction(request);

    dispatch({ type: 'SUBMIT_TOKEN', payload: { token: maxilanaTransaction.JsonWebToken } });

    const transactionRequest = {
      payment: request,
      transaction: maxilanaTransaction,
    };

    dispatch({ type: 'SUBMIT_PAYMENT', payload: { transactionRequest } });
  };

  return (
    <div>
      {state.status === 'idle' && <PawnAccountForm onSubmit={handleSignAccount} />}
      {state.status === 'account_set' && state.account && (
        <PawnCalculateForm data={state.account} onSubmit={handlePaymentSelection} />
      )}
      {state.status === 'payment_selected' && state.paymentRequest && (
        <PaymentForm
          data={state.paymentRequest}
          title="Boleta de empeño"
          description="Realiza el pago del refrendo para no perder tu artículo.
                 El pago del desempeño de tu artículo tiene que ser en sucursal ya que pierde el seguro que lo protege."
          onSubmit={handleSubmitPayment}
          showSubmitButton={true}
        />
      )}
      {state.status === 'payment_submitted' && state.transactionRequest && (
        <PageLoader text="En un momento serás redirigido a la pasarela de pagos...">
          {state.transactionRequest !== null && (
            <BankTransactionForm
              {...state.transactionRequest}
              forwardPath={`${window.location.origin}/pagos/respuesta?type=pawns&client=${state.account?.name}&total=${state.paymentRequest?.amount}&token=${state.token}&cardtype=${state.transactionRequest.payment.cardtype}`}
            />
          )}
        </PageLoader>
      )}
    </div>
  );
};

export default PawnPaymentFlow;
