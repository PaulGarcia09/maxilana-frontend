import { FacebookOutlined, TwitterOutlined, WhatsAppOutlined } from '@ant-design/icons';
import cn from 'classnames';
import React, { FC } from 'react';

import styles from './ShareLinks.module.css';

interface Props {
  url: string;
  text: string;
  className?: string;
}

const ShareLinks: FC<Props> = ({ url, text, className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <span>Compartir:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        className={cn(styles.item, styles.facebook)}
        target="_blank"
        rel="noreferrer"
      >
        <FacebookOutlined />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(text)}`}
        target="_blank"
        className={cn(styles.item, styles.twitter)}
        rel="noreferrer"
      >
        <TwitterOutlined />
      </a>
      <a
        href={`https://wa.me/whatsappphonenumber/?text=${url}`}
        target="_blank"
        className={cn(styles.item, styles.whatsapp)}
        rel="noreferrer"
      >
        <WhatsAppOutlined />
      </a>
    </div>
  );
};

export default ShareLinks;
