export interface CreditCard {
  tarjeta: string;
  vencimiento: string;
  ccv: string;
  importe: number;
  titular: string;
  cardtype: 'VISA' | 'MC';
  credittype: 'DB' | 'CR';
  nombre: string;
  apellido: string;
  email: string;
  tipotarjeta: string;
  calle: string;
  pais: string;
  estado: string;
  ciudad: string;
  cp: string;
  celular: string;
  version3D: 2;
}
