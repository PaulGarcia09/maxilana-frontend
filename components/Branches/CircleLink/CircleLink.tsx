import cn from 'classnames';
import React, { AnchorHTMLAttributes, FC, ReactElement } from 'react';
import styles from './CircleLink.module.css';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  icon: ReactElement;
  whatsapp?: boolean;
}

const CircleLink: FC<Props> = ({ icon, text, className, whatsapp, children, ...props }) => {
  return (
    <a {...props} className={cn(styles.root, className)}>
      <span className={cn(styles.icon, { [styles.whatsapp]: whatsapp })}>{icon}</span>
      <span className={styles.text}>{text}</span>
    </a>
  );
};

export default CircleLink;
