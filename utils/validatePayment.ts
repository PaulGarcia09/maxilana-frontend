import getRawBody from 'raw-body';
import { GetServerSidePropsContext } from 'next';

import { ErrorCodes } from '~/types/Models';
import { normalize3DTransaction } from '~/api/normalizers';
import { PaymentTransactionRequest } from '~/types/Requests';
import { PaymentError } from './errors';

type Validation = {
  redirect?: boolean;
  transaction?: PaymentTransactionRequest;
};

/**
 * Función que valida la respuesta del banco cuando se realiza un pago
 * Si ocurre algún error, lanza una excepción del tipo PaymentError
 */
const validatePayment = async (
  context: GetServerSidePropsContext,
  cardtype: any,
): Promise<Validation> => {
  const { query, req } = context;

  // PETICIÓN INTERNA
  if (req.method === 'GET') {
    // SI LA URL SE ESCRIBIÓ REDIRECCIONAMOS AL HOME
    if (!query?.error && !query?.errorCode) {
      return {
        redirect: true,
      };
    }

    // PROBABLEMENTE NO ESTÉ SETEADA UNA VARIABLE DE ENTORNO
    // VER -> BankTransactionForm
    throw new PaymentError(
      'Error al validar el pago',
      'No es posible acceder a la página de esta manera',
      (query.errorCode as ErrorCodes) ?? '0',
    );
  } else if (req.method !== 'POST') {
    throw new PaymentError(
      'Error al validar el pago',
      'No es posible acceder a la página de esta manera',
      '40',
    );
  }

  // RESPUESTA DEL BANCO, ES UN POST
  const bankresponse = await getRawBody(req);
  const paymentrequest = normalize3DTransaction(bankresponse);

  //  REVISAMOS STATUS Y RESPUESTA
  if (
    paymentrequest.status !== '200' ||
    !paymentrequest.cavv ||
    !paymentrequest.eci ||
    (!paymentrequest.xid && cardtype !== 'MC')
  ) {
    throw new PaymentError(
      'Error en 3DTransaction',
      'El banco regresó un error y no es posible procesar la transacción',
      (paymentrequest.status as ErrorCodes) ?? '200',
    );
  }

  // * TODO OK 👌🏽
  return {
    transaction: paymentrequest,
  };
};

export default validatePayment;
