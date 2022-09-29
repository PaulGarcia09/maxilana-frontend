import { Cart } from '~/types/Models';

import { PawnAccount } from '~/types/Models';
import { MaxilanaTransaction } from '~/types/Responses';
import { PawnPaymentRequest, ServicePaymentRequest } from '~/types/Requests';
import { PaymentData } from '../../../components/payments/PaymentForm';
import { CreditCard } from '../../../types/Requests/CreditCard';
import { CartPurchase } from '~/types/Requests';

export type PaymentRequest = ServicePaymentRequest;
export type Status = 'cart' | 'delivery_data' | 'credit_card' | 'payment_submitted';

export interface DeliveryData {
  nombreenvio: string;
  apellidoenvio: string;
  domicilioenvio: string;
  codigopostalenvio: string;
  coloniaenvio: string;
  municipioenvio: string;
  estadoenvio: string;
  paisenvio: string;
  celularenvio: string;
  emailenvio: string;
  instruccionesenvio: string;
  mismosdatos?: boolean;
  concept: string;
  monto: number;
}

export const initialDeliveryData: DeliveryData = {
  nombreenvio: '',
  apellidoenvio: '',
  domicilioenvio: '',
  codigopostalenvio: '',
  coloniaenvio: '',
  municipioenvio: '',
  estadoenvio: '',
  paisenvio: '',
  celularenvio: '',
  emailenvio: '',
  instruccionesenvio: '',
  mismosdatos: false,
  concept: '',
  monto: 0,
};
export type Payment = {
  concept: string;
  amount: number;
  paymentCode: '1' | '2' | '3';
  paymentExtension: number;
  celular: number;
};

export interface Props {
  cart: Cart;
}

export type Transaction = {
  payment: PawnPaymentRequest;
  transaction: MaxilanaTransaction;
};

export type State = {
  status: Status;
  token: string;
  cart: Cart | null;
  paymentRequest: Payment | null;
  transactionRequest: Transaction | null;
  deliveryData: DeliveryData | null;
};

export const initialState: State = {
  status: 'cart',
  token: '',
  cart: null,
  paymentRequest: null,
  transactionRequest: null,
  deliveryData: null,
};

export interface Pais {
  Codigo: string;
  Pais: string;
}
export interface Estado {
  Codigo: string;
  Estado: string;
}
