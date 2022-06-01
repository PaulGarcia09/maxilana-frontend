import styles from './Link.module.css';
import { FC, PropsWithChildren } from 'react';

interface Props {
  title?: string;
}

const Link: FC<PropsWithChildren<Props>> = ({ title, children }) => (
  <a className={styles.root}>
    <h2 className={styles.linkTitle}>{title}</h2>
    {children}
  </a>
);

export default Link;
