import cn from 'classnames';
import Link from 'next/link';
import { FC } from 'react';

import { Card } from '~/components/ui';
import { CMSFaq } from '~/types/Models/CMSFaq';
import slugify from '~/utils/slugify';
import styles from './HelpSidebar.module.css';

interface Props {
  questions: CMSFaq[];
  direction?: 'horizontal' | 'vertical';
}

const HelpSidebar: FC<Props> = ({ direction = 'vertical', questions }) => {
  return (
    <div className={cn(styles.root, { [styles.rootHorizontal]: direction === 'horizontal' })}>
      <Card className={styles.header}>
        <h4 className={styles.headerTitle}>Preguntas Frecuentes</h4>
        <ul>
          {questions.map((item) => (
            <li key={item.id} className={styles.questionItem}>
              <Link href={`/preguntas-frecuentes/${item.section.slug}#${slugify(item.question)}`}>
                <a className={styles.questionLink}>{item.question}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
      <Card className={styles.footer}>
        <h5 className={styles.footerTitle}>¿Tienes alguna pregunta?</h5>
        <div className="prose">
          <p className={styles.footerCopy}>
            Para cualquier duda o aclaración, por favor comunícate con nosotros a través del los
            siguientes medios:
          </p>
          <p className={styles.footerCopy}>
            Teléfono: <a href="tel:8002151515">800 215 1515</a>
          </p>
          <p className={styles.footerCopy}>
            Puedes visitar nuestra página de{' '}
            <Link href="/preguntas-frecuentes">
              <a>preguntas frecuentes</a>
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default HelpSidebar;
