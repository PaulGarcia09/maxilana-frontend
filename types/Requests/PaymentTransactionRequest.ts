import { CreditCard } from './CreditCard';
export interface PaymentTransactionRequest {
  eci: string;
  xid: string;
  cavv: string;
  status: string; //200 OK
  cardtype: 'VISA' | 'MC';
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
  correoelectronico: string;
}
