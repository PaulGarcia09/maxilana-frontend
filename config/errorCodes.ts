const ERROR_CODES = {
  // ERRORES DE PARTE NUESTRA (CÓDIGO)
  0: 'El pago no fue procesado. Cód. error: 0',
  100: 'Ocurrió un error al comunicarnos con el banco. Cód. error: 100',
  // ERRORES EN LA TRANSACCIÓN 2D (MAXILANA)
  10: 'No obtuvimos una respuesta exitosa y el pago no fue procesado. Cód. error: 10',
  20: 'El tiempo de espera para la respuesta terminó y el pago no fue procesado. Cód. error: 20',
  30: 'Los datos del carrito se han perdido, por favor vuelve a intentarlo otra véz',
  40: 'La petición para procesar el pago es incorrecta. Por favor ponte en contacto con un administrador. Cód. error: 40',
  // ERRORES EN LA TRANSACCIÓN 3D (BANCO)
  200: 'No recibimos una respuesta satisfactoria del banco y el pago no fue procesado.',
  201: 'Ocurrió un error general en el sistema de Visa o Master Card, espera unos momentos para reintentar la transacción',
  421: 'El servicio 3D Secure no está disponible, espera unos momentos para reintentar la transacción.',
  422: 'Ocurrió un problema genérico al momento de realizar la transacción, inténtalo en otro momento.',
  423: 'La autenticación no fue exitosa, el comprador no se pudo autenticar con éxito.',
  424: 'Autenticación 3D Secure no fue completada. Cód. error: 424',
  425: 'Autenticación inválida. No has ingresado correctamente la contraseña 3D Secure.',
  430: 'Ocurrió un error de parte nuestra, estamos trabajando para solucionarlo. Cód. error: 430',
  431: 'Ocurrió un error de parte nuestra, estamos trabajando para solucionarlo. Cód. error: 431',
  432: 'Ocurrió un error de parte nuestra, estamos trabajando para solucionarlo. Cód. error: 432',
  433: 'Ocurrió un error de parte nuestra, estamos trabajando para solucionarlo. Cód. error: 433',
  434: 'Ocurrió un error de parte nuestra, estamos trabajando para solucionarlo. Cód. error: 434',
  435: 'Ocurrió un error de parte nuestra, estamos trabajando para solucionarlo. Cód. error: 435',
  436: 'Ocurrió un error de parte nuestra, estamos trabajando para solucionarlo. Cód. error: 436',
  437: 'Ocurrió un error de parte nuestra, estamos trabajando para solucionarlo. Cód. error: 437',
  438: 'Ocurrió un error de parte nuestra, estamos trabajando para solucionarlo. Cód. error: 438',
  439: 'Ocurrió un error de parte nuestra, estamos trabajando para solucionarlo. Cód. error: 439',
  440: 'Ocurrió un error de parte nuestra, estamos trabajando para solucionarlo. Cód. error: 440',
  441: 'Ocurrió un error de parte nuestra, estamos trabajando para solucionarlo. Cód. error: 441',
  442: 'Ocurrió un error de parte nuestra, estamos trabajando para solucionarlo. Cód. error: 442',
  443: 'La pasarela de pagos solo acepta tarjetas VISA o Master Card, si has ingresado bien tu tarjeta comunícate con nosotros.',
  444: 'La pasarela de pagos solo acepta tarjetas VISA o Master Card, si has ingresado bien tu tarjeta comunícate con nosotros.',
};

export default ERROR_CODES;
