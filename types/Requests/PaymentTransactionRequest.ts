import { CreditCard } from './CreditCard';
export interface PaymentTransactionRequest {
  // headers: {
  //   authorization: string,
  // },
  // body: {
  //   Reference3D: string;
  //   eci: string;
  //   xid: string;
  //   cavv: string;
  //   status: string; //200 OK
  //   cardtype: 'VISA' | 'MC';
  // }
  eci: string;
  xid: string;
  cavv: string;
  status: string; //200 OK
  cardtype: string; //'VISA' | 'MC';
  Reference3D: string;
  total: number; //number
  //Number: string; // CardNumber
  // Expires: string;
  // MerchantCity: string;
  // MerchantName: string;
  // MerchantId: string;
}

export interface ServicePaymentRequest extends CreditCard {
  concepto: string;
  email: string;
}
