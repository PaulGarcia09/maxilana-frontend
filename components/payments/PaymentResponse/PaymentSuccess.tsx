import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';

import { Button } from '~/components/ui';

import styles from './PaymentResponse.module.css';

interface Props {
  children?: ReactNode;
}

const PaymentSuccess: FC<Props> = ({ children = null }) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <CheckCircleTwoTone twoToneColor="#0BBF69" style={{ fontSize: 60 }} />
        <h4 className={styles.headerTitle}>Gracias por usar nuestros servicios electrónicos</h4>
        <p className={styles.headerCopy}>
          El proceso concluyó satisfactoriamente, pronto recibirás un correo electrónico con
          información.
        </p>
        {children && <div className={styles.headerContext}>{children}</div>}
      </div>
      <div className={styles.body}>
        <Button theme="primary" text="Seguir comprando" href="/remates" size="small" />
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

export default PaymentSuccess;
