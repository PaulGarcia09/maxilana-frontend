// Modelo en comun para solicitar transacciones de pago
//  es una respuesta que regresa Maxilana
//  y a su vez se envia al banco para solicitar el pago.
export interface CommonTransaction {
  id: string;
  merchancity: string;
  merchanname: string;
  merchanid: string;
  correoEmpresa: string;
  correoserv: string;
  correopass: string;
}

// Response de la transacción de Maxilana
// TODO: Remover una vez salga el carrito de compras.
export interface MaxilanaTransaction {
  id: string;
  merchancity: string; // "CULIACAN"
  merchanname: string; // "MAXILANA ECOMM",
  merchanid: string; // "8279402",
  correoEmpresa: string; // "webmaxilana@maxilana.com",
  correoserv: string; // "smtp.office365.com",
  correopass: string; // "cceMaxiWeb2015"
}

// Modelo de transacción para pagar productos
//  lo regresa Maxilana para solicitar un pago.
export interface MaxilanaCheckout3DResponse extends CommonTransaction {
  total: number;
  orden: string;
}

// Response de la transacción del banco
export interface BankTransaction {
  ECI: string;
  XID: string;
  CAVV: string;
  Status: string; //200 OK
  Total: string; //number
  CardType: 'VISA' | 'MC';
  Number: string; // CardNumber
  Expires: string;
  MerchantCity: string;
  MerchantName: string;
  MerchantId: string;
  Reference3D: string;
}
