import Link from 'next/link';
import cn from 'classnames';
import { FC, HTMLProps, MouseEvent, ReactElement } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './Button.module.css';

export interface Props {
  text: string;
  href?: string;
  target?: HTMLProps<HTMLAnchorElement>['target'];
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactElement;
  rightIcon?: ReactElement;
  variant?: 'link' | 'default';
  size?: 'small' | 'default' | 'large';
  theme?: 'default' | 'primary' | 'secondary' | 'danger' | 'whatsapp';
  className?: string;
  disabled?: boolean;
  onClick?: (evt: MouseEvent<HTMLButtonElement>) => void;
  prefetch?: boolean;
  shallow?: boolean;
}

const classStyles = {
  size: {
    default: '',
    small: styles.sm,
    large: styles.lg,
  },
  theme: {
    default: '',
    primary: styles.primary,
    secondary: styles.secondary,
    danger: styles.danger,
    whatsapp: styles.whatsapp,
  },
};

const Button: FC<Props> = ({
  text,
  href,
  target,
  icon,
  rightIcon,
  onClick,
  loading = false,
  fullWidth = false,
  size = 'default',
  theme = 'default',
  variant = 'default',
  className,
  disabled = false,
  shallow,
  prefetch,
}) => {
  const sizeStyles = classStyles.size[size];
  const themeStyles = classStyles.theme[theme];
  const linkStyles = variant === 'link' ? styles.link : '';
  const fullWidthStyles = fullWidth ? styles.fullWidth : '';
  const rootClassName = cn(
    styles.root,
    sizeStyles,
    themeStyles,
    linkStyles,
    fullWidthStyles,
    className,
    { [styles.disabled]: disabled },
  );

  let iconElement = icon;

  if (loading) {
    iconElement = <LoadingOutlined style={{ fontSize: 20 }} />;
  }

  if (href !== undefined) {
    return (
      <Link href={href} prefetch={prefetch} shallow={shallow} scroll>
        <a className={rootClassName} target={target}>
          {icon && iconElement}
          <span className={styles.label}>{text}</span>
          {rightIcon}
        </a>
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={loading} className={rootClassName}>
      {(loading || icon) && iconElement}
      <span className={styles.label}>{text}</span>
      {rightIcon}
    </button>
  );
};

export default Button;
