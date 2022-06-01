import { FC, ReactNode } from 'react';

import styles from './FullBleedBanner.module.css';

interface Props {
  children: ReactNode;
  backgroundColor?: string;
}

const FullBleedBanner: FC<Props> = ({ children, backgroundColor = 'transparent' }) => {
  return (
    <div className={styles.root}>
      <div style={{ backgroundColor }}>{children}</div>
    </div>
  );
};

export default FullBleedBanner;
