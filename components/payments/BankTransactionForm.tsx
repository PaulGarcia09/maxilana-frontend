import { useRouter } from 'next/router';
import { FC, useEffect, useRef } from 'react';

import { CommonTransaction } from '~/types/Responses';
import {
  CouponPaymentRequest,
  LoanPaymentRequest,
  PawnPaymentRequest,
  ProductPurchase,
  CartPurchase as CartPaymentRequest,
} from '~/types/Requests';

type PaymentRequest =
  | ProductPurchase // ! Esto se quitaría una vez se suba la compra del carrito
  | CartPaymentRequest
  | CouponPaymentRequest
  | LoanPaymentRequest
  | PawnPaymentRequest;

interface Props {
  forwardPath: string;
  payment: PaymentRequest;
  transaction: CommonTransaction;
}

const BankTransactionForm: FC<Props> = ({ transaction, payment, forwardPath }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PAYMENT_URL) {
      router.push('/checkout/response?error=true&errorCode=100');
    } else {
      if (formRef?.current) {
        formRef.current.submit();
      }
    }
  }, []);

  return (
    <form ref={formRef} method="POST" action={process.env.NEXT_PUBLIC_PAYMENT_URL}>
      <input type="hidden" name="CARD_NUMBER" value={payment.tarjeta} />
      <input type="hidden" name="CARD_EXP" value={payment.vencimiento} />
      <input type="hidden" name="AMOUNT" value={payment.importe} />
      <input type="hidden" name="CARD_TYPE" value={payment.cardtype} />
      <input type="hidden" name="MERCHANT_ID" value={transaction.Resultado.merchanid} />
      <input type="hidden" name="MERCHANT_NAME" value={transaction.Resultado.merchanname} />
      <input type="hidden" name="MERCHANT_CITY" value={transaction.Resultado.merchancity} />
      <input type="hidden" name="FORWARD_PATH" value={forwardPath} />
      <input type="hidden" name="3D_CERTIFICATION" value="03" />
      <input type="hidden" name="REFERENCE3D" value={transaction.Resultado.id} />
      <input type="hidden" name="CITY" value={payment.ciudad} />
      <input type="hidden" name="COUNTRY" value={payment.pais} />
      <input type="hidden" name="EMAIL" value={payment.email} />
      <input type="hidden" name="NAME" value={payment.nombre} />
      <input type="hidden" name="LAST_NAME" value={payment.apellido} />
      <input type="hidden" name="POSTAL_CODE" value={payment.cp} />
      <input type="hidden" name="STATE" value={payment.estado} />
      <input type="hidden" name="STREET" value={payment.calle} />
      <input type="hidden" name="MOBILE_PHONE" value={payment.celular} />
      <input type="hidden" name="CREDIT_TYPE" value={payment.tipotarjeta} />
      <input type="hidden" name="THREED_VERSION" value="2" />
    </form>
  );
};

export default BankTransactionForm;
