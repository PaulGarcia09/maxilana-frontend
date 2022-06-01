import Link from 'next/link';
import { FC } from 'react';
import { CloseCircleTwoTone } from '@ant-design/icons';

import { Button } from '~/components/ui';

import styles from './PaymentResponse.module.css';
import { ErrorCodes } from '~/types/Models';
import ERROR_CODES from 'config/errorCodes';

interface Props {
  code?: ErrorCodes;
}

const PaymentError: FC<Props> = ({ code = '0' }) => {
  return (
    <section className="py-10">
      <div className={styles.root}>
        <div className={styles.header}>
          <CloseCircleTwoTone twoToneColor="#EF3A3A" style={{ fontSize: 60 }} />
          <h4 className={styles.headerTitle}>Ocurrió un problema</h4>
          <p className={styles.headerCopy}>
            No fue posible procesar la transacción, por favor inténtalo de nuevo más tarde.
          </p>
          <p className="text-sm text-secondary">
            <span>{ERROR_CODES[code]}</span>
          </p>
        </div>
        <div className={styles.body}>
          <Button theme="primary" text="Volver a los pagos" size="small" href="/pagos" />
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
    </section>
  );
};

export default PaymentError;
