import { FC, PropsWithChildren, ReactNode } from 'react';

import styles from '../Hero/Hero.module.css';

interface Props {
  title: string;
  copy: string;
  footer?: ReactNode;
  cover?: ReactNode;
}

const HeroComposed: FC<PropsWithChildren<Props>> = ({
  title,
  copy,
  children,
  cover = null,
  footer = null,
}) => {
  return (
    <div className={styles.root}>
      {cover !== null && <div className={styles.cover}>{cover}</div>}
      <div className="container mx-auto sm:px-4 sm:py-8">
        <div className="grid gap-7 items-center sm:grid-cols-2 lg:gap-14">
          <div className="relative sm:order-1">{children}</div>
          <div className="relative hidden sm:block">
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{copy}</p>
            {footer !== null && <div className={styles.actionsWrap}>{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroComposed;
