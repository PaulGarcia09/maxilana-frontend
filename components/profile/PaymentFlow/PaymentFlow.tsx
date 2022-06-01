import React, { FC, useEffect, useReducer } from 'react';

import { PageLoader } from '~/components/common';
import { requestPawn3DTransaction } from '~/api/payments';
import PaymentForm, { BankTransactionForm, PawnCalculateForm } from '~/components/payments';
import { PawnAccount } from '~/types/Models';
import { MaxilanaTransaction } from '~/types/Responses';
import { PawnPaymentRequest, ServicePaymentRequest } from '~/types/Requests';
import roundDecimals from '~/utils/roundDecimals';

type PaymentRequest = ServicePaymentRequest;

type Status = 'idle' | 'payment_selected' | 'payment_submitted';

type Payment = {
  concept: string;
  amount: number;
  paymentCode: '1' | '2' | '3';
  paymentExtension: number;
};

type Transaction = {
  payment: PawnPaymentRequest;
  transaction: MaxilanaTransaction;
};

type State = {
  status: Status;
  account: PawnAccount | null;
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
    default:
      return initialState;
  }
};

const PAYMENT_CONCEPT = [
  'PAGO DE INTERÉS NUEVO CONTRATO (REFRENDO, AMPLIACIÓN DE TÉRMINO DEL CONTRATO)',
  'ABONO A INTERÉS',
];

interface Props {
  status?: Status;
  accounts: PawnAccount[];
}

const PawnPaymentFlow: FC<Props> = ({ status = 'idle', accounts }) => {
  let singleAccount = undefined;
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState);

  useEffect(() => {
    if (status === 'payment_selected') {
      const subtotal = accounts.reduce((sum, curr) => {
        return sum + curr.paymentAmount;
      }, 0);

      const total = roundDecimals(subtotal);

      const paymentRequest = {
        paymentCode: '1',
        paymentExtension: 0,
        amount: total,
        concept: PAYMENT_CONCEPT[0],
      };

      dispatch({ type: 'SET_PAYMENT', payload: { paymentRequest } });
    }
  }, []);

  const retrievePaymentDetails = (paymentRequest: Payment) => {
    let isMultiple = true;

    if (accounts.length === 1) {
      isMultiple = false;
    }

    const details = accounts.map((item) => {
      const { amount, paymentCode, paymentExtension } = paymentRequest;
      const { branch, accountLetter, accountNumber, requestDate, loanAmount } = item;

      return {
        sucursal: branch,
        letra: accountLetter,
        boleta: accountNumber,
        fechaconsulta: requestDate,
        prestamo: loanAmount.toString(),
        codigotipopago: paymentCode,
        diaspagados: paymentExtension.toString(),
        monto: isMultiple ? item.paymentAmount.toString() : amount.toString(),
      };
    });

    return details;
  };

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
    };

    dispatch({ type: 'SET_PAYMENT', payload: { paymentRequest } });

    return Promise.resolve();
  };

  const handleSubmitPayment = async (data: PaymentRequest) => {
    const { paymentRequest } = state;
    const { concepto, correoelectronico, ...rest } = data;

    if (!paymentRequest) {
      throw new Error('No fue posible procesar el pago, vuelve a iniciar el proceso.');
    }

    const paymentDetails = retrievePaymentDetails(paymentRequest);

    const request = {
      ...rest,
      email: correoelectronico,
      detallepago: paymentDetails,
    };

    const maxilanaTransaction = await requestPawn3DTransaction(request);

    const transactionRequest = {
      payment: request,
      transaction: maxilanaTransaction,
    };

    dispatch({ type: 'SUBMIT_PAYMENT', payload: { transactionRequest } });
  };

  if (accounts.length === 1) {
    singleAccount = accounts[0];
  }

  return (
    <div>
      {state.status === 'idle' && singleAccount && (
        <PawnCalculateForm data={singleAccount} onSubmit={handlePaymentSelection} />
      )}
      {state.status === 'payment_selected' && state.paymentRequest && (
        <PaymentForm
          data={state.paymentRequest}
          title="Boleta de empeño"
          description="Realiza el pago del refrendo para no perder tu artículo.
                 El pago del desempeño de tu artículo tiene que ser en sucursal ya que pierde el seguro que lo protege."
          onSubmit={handleSubmitPayment}
        />
      )}
      {state.status === 'payment_submitted' && state.transactionRequest && (
        <PageLoader text="En un momento serás redirigido a la pasarela de pagos...">
          {state.transactionRequest !== null && (
            <BankTransactionForm
              {...state.transactionRequest}
              forwardPath={`${window.location.origin}/pagos/respuesta?type=pawns&client=${singleAccount?.name}&total=${state.paymentRequest?.amount}`}
            />
          )}
        </PageLoader>
      )}
    </div>
  );
};

export default PawnPaymentFlow;
