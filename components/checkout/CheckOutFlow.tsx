import React, { FC, useEffect, useReducer, useState } from 'react';
import { PageLoader } from '~/components/common';
import { checkAccount, requestPawn3DTransaction, request3DTransaction } from '~/api/payments';
import PaymentForm, {
  BankTransactionForm,
  PawnAccountForm,
  PawnCalculateForm,
} from '~/components/payments';
import { ConfirmPurchase } from '../../components/checkout/ConfirmPurchase/ConfirmPurchase';
import {
  DeliveryData,
  Payment,
  Props,
  PaymentRequest,
  Status,
  Transaction,
  State,
  initialState,
} from './Types/CheckOutTypes';
import { CartPurchase, CreditCard } from '~/types/Requests';

const reducer = (state: State, action: any): State => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_INIT':
      return {
        ...state,
        status: 'cart',
        cart: payload.cart,
      };
    case 'SET_DELIVERYDATA':
      return {
        ...state,
        status: 'delivery_data',
        deliveryData: payload.deliveryData,
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

export const CheckOutFlow: FC<Props> = ({ cart }) => {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState);
  const [mismosDatos, setMismosDatos] = useState(false);

  useEffect(() => {
    dispatch({ type: 'SET_INIT', payload: { cart } });
  }, []);

  useEffect(() => {
    console.log({ msg: 'Modificado STATE.....', state });
  }, [state]);

  const handleSubmitEnvios = async (data: any) => {
    setMismosDatos(data.mismosDatos);
    const {
      nombreenvio,
      apellidos,
      codigopostal,
      domicilio,
      colonia,
      municipio,
      pais,
      celular,
      correo,
      estado,
      instrucciones,
    } = data.dataform;
    const { cart } = state;

    const deliveryData: DeliveryData = {
      nombreenvio,
      apellidoenvio: apellidos,
      celularenvio: celular,
      codigopostalenvio: codigopostal,
      concept: 'PAGO DE PRODUCTOS DESDE LA PÁGINA WEB',
      domicilioenvio: `${domicilio} ${colonia}`,
      municipioenvio: municipio,
      paisenvio: pais,
      emailenvio: correo,
      estadoenvio: estado,
      coloniaenvio: colonia,
      instruccionesenvio: instrucciones,
      monto: cart ? cart.pricing.total : 0,
    };
    dispatch({ type: 'SET_DELIVERYDATA', payload: { deliveryData } });
  };

  const handleSubmitPayment = async (data: any) => {
    const { deliveryData } = state;

    try {
      if (!data || !deliveryData) {
        throw new Error('No se ha iniciado el objeto card.');
      }

      if (!deliveryData) {
        throw new Error('No fue posible procesar el pago, vuelve a iniciar el proceso.');
      }

      const request: any = {
        ...data,
        orden: cart.id,
        importe: cart.pricing.total,
      };

      const maxilanaTransaction = await request3DTransaction(request, deliveryData);

      dispatch({ type: 'SUBMIT_TOKEN', payload: { token: maxilanaTransaction.JsonWebToken } });

      const transactionRequest = {
        payment: request,
        transaction: maxilanaTransaction,
      };
      dispatch({ type: 'SUBMIT_PAYMENT', payload: { transactionRequest } });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      {state.status === 'cart' && state.cart && (
        <div className="p-2">
          <ConfirmPurchase cart={cart} onSubmit={handleSubmitEnvios} />
        </div>
      )}
      {state.status === 'delivery_data' && state.deliveryData && (
        <div className="p-8">
          <PaymentForm
            data={state.deliveryData}
            title="Pago de producto"
            copiarDatos={mismosDatos}
            description="Pago en linea de productos."
            onSubmit={handleSubmitPayment}
            showSubmitButton={true}
          />
        </div>
      )}
      {state.status === 'payment_submitted' && state.transactionRequest && (
        <PageLoader text="En un momento serás redirigido a la pasarela de pagos...">
          {state.transactionRequest !== null && (
            <BankTransactionForm
              {...state.transactionRequest}
              forwardPath={`${window.location.origin}/checkout/response?oid=${cart.id}&total=${state.transactionRequest.payment?.importe}&token=${state.token}&cardtype=${state.transactionRequest.payment.cardtype}`}
              //forwardPath={`${window.location.origin}/pagos/respuesta?type=prod&oid=${state.cart?.id}&total=${state.paymentRequest?.amount}$token=${state.token}$cardtype)${state.transactionRequest.payment.cardtype}`}
            />
          )}
        </PageLoader>
      )}
    </>
  );
};

export default CheckOutFlow;
