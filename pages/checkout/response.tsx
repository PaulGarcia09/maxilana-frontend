import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';

import { BareLayout } from '~/components/layout';
import { CheckoutError, CheckoutSuccess } from '~/components/checkout';
import validatePayment from '~/utils/validatePayment';
import { request2DTransaction } from '~/api/payments/checkout';
import { Cart, CheckoutResponse, ErrorCodes } from '~/types/Models';
import { getCart } from '~/modules/api/cart';
import { PaymentError } from '~/utils/errors';

type SSRProps = {
  error?: boolean;
  response?: {
    cart: Cart;
    order: CheckoutResponse;
  };
  errorCode?: ErrorCodes;
};

export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
  try {
    const { query } = context;

    const cartToken: string = (query?.oid as string) ?? undefined;

    const validation = await validatePayment(context, query?.cardtype);

    if (validation?.redirect) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (!cartToken) {
      throw new PaymentError(
        'Error al procesar la compra',
        'Los datos del carrito de compras se perdieron.',
        '30',
      );
    }

    if (!validation?.transaction) {
      throw new PaymentError(
        'Error al validar el pago',
        'No fue posible procesar la transacción del banco',
        '0',
      );
    }

    const cart = await getCart(cartToken as string);
    const { transaction } = validation;

    const request2D = {
      ...transaction,
      orden: cartToken,
    };

    const order = await request2DTransaction(
      request2D,
      query?.token,
      query?.cardtype,
      query?.total,
    );

    return {
      props: {
        response: {
          cart,
          order,
        },
      },
    };
  } catch (err) {
    let errorCode: ErrorCodes = '0';

    if (err instanceof PaymentError) {
      errorCode = err.errorCode;
    } else if ((err as AxiosError).isAxiosError) {
      const axiosError = err as AxiosError;

      if (axiosError?.request) {
        errorCode = '20';
      }
    }

    return {
      props: {
        errorCode,
        error: true,
      },
    };
  }
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const CheckoutResponsePage: NextPage<Props> = ({
  error = false,
  errorCode = '0',
  response = null,
}) => {
  return (
    <BareLayout>
      {(() => {
        if (response !== null && !error) {
          return <CheckoutSuccess cart={response.cart} order={response.order} />;
        }

        return <CheckoutError code={errorCode} />;
      })()}
    </BareLayout>
  );
};

export default CheckoutResponsePage;
