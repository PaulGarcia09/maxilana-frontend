import { FC, PropsWithChildren } from 'react';
import { CloseOutlined } from '@ant-design/icons';

import styles from './Tag.module.css';

interface Props {
  label?: string;
  closable?: boolean;
  onClick?: () => void;
  className?: string;
}

const Tag: FC<PropsWithChildren<Props>> = ({
  label,
  closable = false,
  onClick,
  children,
  className,
}) => {
  const closableStyles = closable ? styles.closable : '';
  const rootClassName = [styles.root, closableStyles, className].join(' ');

  return (
    <span className={rootClassName} onClick={onClick}>
      <span>{label || children}</span>
      {closable && <CloseOutlined style={{ fontSize: 12 }} />}
    </span>
  );
};

export default Tag;
