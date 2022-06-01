import Link from 'next/link';
import { FC, useEffect } from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';

import { Button } from '~/components/ui';
import { CartSummary } from '~/components/cart';

import styles from './Response.module.css';
import { Cart, CheckoutResponse as Order } from '~/types/Models';
import { NextAPIMutator } from '~/modules/api/nextApiFetcher';

interface Props {
  cart: Cart;
  order: Order;
}

const CheckoutSuccess: FC<Props> = ({ cart, order }) => {
  useEffect(() => {
    const removeCart = async () => {
      await NextAPIMutator({
        endpoint: '/api/cart/removeCart',
        method: 'POST',
        body: JSON.stringify({ remove: true }),
      });
    };

    removeCart();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <CheckCircleTwoTone twoToneColor="#0BBF69" style={{ fontSize: 60 }} />
          <h1 className={styles.headerTitle}>Gracias por su compra</h1>
          <p>Un email de confirmación ha sido enviado con todos los detalles de su pedido.</p>
          <p className="text-center text-lg">{order?.reference}</p>
        </div>
        <div className={styles.innerSection}>
          <h2 className={styles.subtitle}>Datos de entrega:</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className={styles.subheading}>Tu pedido se enviará a:</h3>
              <div className="space-y-2">
                <p>{order?.shipping.name}</p>
                <p>
                  {`Dirección: ${order?.shipping.address} ${order?.shipping.locality} ${order?.shipping.city}`}
                </p>
                <p>{`Código Postal: ${order?.shipping.zipcode}`}</p>
              </div>
            </div>
            <div>
              <h3 className={styles.subheading}>Entrega estimada:</h3>
              <div className="space-y-2">
                <p className="text-[#0BBF69]">de 1 a 7 días laborales</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.innerSection}>
          <h2 className={styles.subtitle}>Resumen del pedido:</h2>
          <div>
            <CartSummary data={cart} />
          </div>
        </div>
      </div>
      <div className="text-center p-4">
        <Button theme="primary" text="Seguir comprando" href="/remates" />
      </div>
      <div className={styles.footer}>
        <h5 className={styles.footerTitle}>¿Tienes alguna pregunta?</h5>
        <div className="prose">
          <p className={styles.footerCopy}>
            Para cualquier duda o aclaración, por favor comunícarse con nosotros a través del los
            siguientes medios:
          </p>
          <p className={styles.footerCopy}>
            Teléfono: <a href="tel:8002151515">800 215 1515</a>
          </p>
          <p className={styles.footerCopy}>
            Puedes visitar nuestra página de {' '}
            <Link href="/preguntas-frecuentes">
              <a>preguntas frecuentes</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
