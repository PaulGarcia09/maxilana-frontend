// TODO: Eliminar esto, se usará el carrito.
export interface CheckoutSuccess {
  reference: string;
  amount: number;
  productName: string;
  contactName: string;
  shipping: {
    address: string;
    locality: string;
    city: string;
    amount: number;
    contactName: string;
  };
}

export interface CheckoutResponse {
  reference: string;
  shipping: {
    name: string;
    cellphone: string;
    address: string;
    locality: string;
    zipcode: string;
    city: string;
    state: string;
  };
}

// LOS CÓDIGOS 201 EN ADELANTE
//  SON DEL BANCO AL TRATAR DE PAGAR
export type ErrorCodes =
  | '0' // Un error general.
  | '10' // El servidor no regresó un resultado en 2DTransaction.
  | '20' // Timeout en la respuesta 2DTransaction.
  | '30' // Por alguna razón el token del carrito se perdió...
  | '40' // Petición incorrecta para el 3DTransaction
  | '100' // No existe la variable de entorno para redireccionar al banco.
  | '200' // El status no fue 200 o no se recibieron las variables necesarias ECI, CAVV O XID para la transacción.
  | '201' // Indica que se detecto un error general en el sistema de Visa o Master Card, se recomienda esperar unos momentos para reintentar la transacción.
  | '421' // Indica que el servicio 3D Secure no está disponible, se recomienda esperar unos momentos para reintentar la transacción.
  | '422' // Indica que hubo un problema genérico al momento de realizar la Autenticación, no se debe enviar la transacción a Payworks.
  | '423' // Indica que la Autenticación no fue exitosa, no se debe enviar la transacción a Payworks ya que el comprador no se pudo autenticar con éxito.
  | '424' // Autenticación 3D Secure no fue completada. NO se debe enviar a procesar la transacción al motor de pagos Payworks, ya que la persona no está ingresando correctamente la contraseña
  | '425' // Autenticación Inválida. Indica que definitivamente NO se debe enviar a procesar la transacción a Payworks, ya que la persona no está ingresando correctamente la contraseña3D Secure.
  | '430' // Tarjeta de Crédito nulo, la variable Card se envió vacía.
  | '431' // Fecha de expiración nulo, la variable Expires se envió vacía.
  | '432' // Monto nulo, la variable Total se envió vacía.
  | '433' // Id del comercio nulo, la variable MerchantId se envió vacía.
  | '434' // Liga de retorno nula, la variable ForwardPath se envió vacía.
  | '435' // Nombre del comercio nulo, la variable MerchantName se envió vacía.
  | '436' // Formato de TC incorrecto, la variable Card debe ser de 16 dígitos.
  | '437' // Formato de Fecha de Expiración incorrecto, la variable Expires debe tener el siguiente formato: YY/MM donde YY se refiere al año y MM se refiere al mes de vencimiento de la tarjeta.
  | '438' // Fecha de Expiración incorrecto, indica que el plástico esta vencido.
  | '439' // Monto incorrecto, la variable Total debe ser un número menor a 999,999,999,999.## con la fracción decimal opcional, esta debe ser a lo más de 2 décimas.
  | '440' // Formato de nombre del comercio incorrecto, debe ser una cadena de máximo 25 caracteres alfanuméricos.
  | '441' // Marca de Tarjeta nulo, la variable CardType se envió vacía.
  | '442' // Marca de Tarjeta incorrecta, debe ser uno de los siguientes valores: VISA (para tarjetas Visa) o MC (para tarjetas Master Card).
  | '443' // CardType incorrecto, se ha especificado el CardType como VISA, sin embargo, el Bin de la tarjeta indica que esta no es Visa.
  | '444'; // CardType incorrecto, se ha especificado el CardType como MC, sin embargo, el Bin de la tarjeta indica que esta no es Master Card.
