import cn from 'classnames';
import { FC, PropsWithChildren, ReactElement } from 'react';

import styles from './Cards.module.css';

interface Props {
  className?: string;
  noPadding?: boolean;
}

const Card: FC<PropsWithChildren<Props>> = ({ children, className, noPadding }) => {
  return (
    <div className={cn(styles.root, { [styles.noPadding]: noPadding }, className)}>{children}</div>
  );
};

export default Card;
