import { AxiosError } from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';

import { BareLayout } from '~/components/layout';
import { PaymentError, PaymentSuccess } from '~/components/payments';
import validatePayment from '~/utils/validatePayment';
import {
  requestCoupon2DTransaction,
  requestLoan2DTransaction,
  requestPawn2DTransaction,
} from '~/api/payments';
import { Pawn2DRequest } from '~/types/Requests';
import { ErrorCodes, PawnPaymentSuccess } from '~/types/Models';
import { PaymentError as PaymentErrorType } from '~/utils/errors';

interface SSRProps {
  error?: boolean;
  errorCode?: ErrorCodes;
  response?: boolean | PawnPaymentSuccess;
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
  const { query } = context;

  try {
    let response;
    const validation = await validatePayment(context);

    if (validation?.redirect) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (!validation?.transaction) {
      throw new PaymentErrorType(
        'Error al validar el pago',
        'No fue posible procesar la transacción del banco',
        '0',
      );
    }

    const request2D = validation.transaction;

    if (query?.type === 'coupons') {
      response = await requestCoupon2DTransaction(request2D);
    } else if (query?.type === 'loans') {
      response = await requestLoan2DTransaction(request2D);
    } else if (query?.type === 'pawns') {
      // ASÍ ME LO PIDEN...
      const pawn2DRequest = {
        ...request2D,
        Cliente: query?.client,
        total: query?.total ? Number(query?.total) : undefined,
      } as Pawn2DRequest;

      response = await requestPawn2DTransaction(pawn2DRequest);
    }

    return {
      props: {
        response,
      },
    };
  } catch (err) {
    let errorCode: ErrorCodes = '0';

    if (err instanceof PaymentErrorType) {
      errorCode = err.errorCode;
    }

    if ((err as AxiosError).isAxiosError) {
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

const PaymentResponsePage: NextPage<Props> = ({ error = false, errorCode, response = null }) => {
  return (
    <BareLayout>
      {(() => {
        if (response && !error) {
          return <PaymentSuccess />;
        }

        return <PaymentError code={errorCode} />;
      })()}
    </BareLayout>
  );
};

export default PaymentResponsePage;
