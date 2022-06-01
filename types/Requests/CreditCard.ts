export interface CreditCard {
  tarjeta: string;
  vencimiento: string;
  ccv: string;
  importe: number;
  titular: string;
  cardtype: 'VISA' | 'MC';
}
