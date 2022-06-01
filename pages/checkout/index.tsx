import { GetStaticProps, NextPage } from 'next';

import { BareLayout } from '~/components/layout';
import { ConfirmPurchase } from '~/components/checkout';
import useCart from '~/hooks/cart/useCart';
import { Button } from '~/components/ui';
import { EmptyCart } from '~/components/svg';

export const getStaticProps: GetStaticProps<{ css: string[] }> = () => {
  return { props: { css: ['/antd/form.css'] } };
};
const CheckoutPage: NextPage = () => {
  const { data, isEmpty } = useCart();

  return (
    <BareLayout title="Confirmar Compra">
      {data && !isEmpty ? (
        <ConfirmPurchase cart={data} />
      ) : (
        <div className="container mx-auto py-48 sm:max-w-5xl">
          <div className="text-center space-y-4">
            <div className="w-[170px] mx-auto">
              <EmptyCart />
            </div>
            <h1 className="text-lg">No hay ningún producto para pagar</h1>
            <p className="text-secondary">
              No se ha agregado ningún artículo para proceder al pago
            </p>
            <Button theme="primary" href="/remates" text="Ir a remates" />
          </div>
        </div>
      )}
    </BareLayout>
  );
};

export default CheckoutPage;
