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
      <input type="hidden" name="Card" value={payment.tarjeta} />
      <input type="hidden" name="Expires" value={payment.vencimiento} />
      <input type="hidden" name="Total" value={payment.importe} />
      <input type="hidden" name="CardType" value={payment.cardtype} />
      <input type="hidden" name="MerchantId" value={transaction.merchanid} />
      <input type="hidden" name="MerchantName" value={transaction.merchanname} />
      <input type="hidden" name="MerchantCity" value={transaction.merchancity} />
      <input type="hidden" name="ForwardPath" value={forwardPath} />
      <input type="hidden" name="Cert3D" value="03" />
      <input type="hidden" name="Reference3D" value={transaction.id} />
    </form>
  );
};

export default BankTransactionForm;
