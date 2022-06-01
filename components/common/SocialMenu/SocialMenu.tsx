import cn from 'classnames';
import { FC } from 'react';
import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  TwitterOutlined,
} from '@ant-design/icons';

import styles from './SocialMenu.module.css';

interface Props {
  brand?: boolean;
  size?: 'default' | 'small';
}

const SocialMenu: FC<Props> = ({ brand, size = 'default' }) => {
  return (
    <ul className={cn(styles.root, styles[size], { [styles.brandColor]: brand })}>
      <li className={styles.item}>
        <a href="https://www.facebook.com/maxilana" target="_blank" rel="noopener noreferrer">
          <FacebookFilled />
        </a>
      </li>
      <li className={styles.item}>
        <a href="https://www.instagram.com/maxilanamx/" target="_blank" rel="noopener noreferrer">
          <InstagramFilled />
        </a>
      </li>
      <li className={styles.item}>
        <a
          href="https://www.linkedin.com/company/maxilana-casa-de-empe%C3%B1o/about/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinFilled />
        </a>
      </li>
      <li className={styles.item}>
        <a href="https://twitter.com/MaxilanaMx" target="_blank" rel="noopener noreferrer">
          <TwitterOutlined />
        </a>
      </li>
    </ul>
  );
};

export default SocialMenu;
