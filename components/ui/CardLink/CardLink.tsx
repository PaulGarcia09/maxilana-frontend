import { FC, ReactNode } from 'react';
import { RightOutlined, LinkOutlined } from '@ant-design/icons';

import styles from './CardLink.module.css';

interface Props {
  label: string;
  leftIcon?: ReactNode;
  isExternal?: boolean;
}

const CardLink: FC<Props> = ({ label, leftIcon = null, isExternal = false }) => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {leftIcon}
        <div className={styles.titleWrap}>
          <h3 className="h6">{label}</h3>
        </div>
        <span className={styles.linkIcon}>{isExternal ? <LinkOutlined /> : <RightOutlined />}</span>
      </div>
    </div>
  );
};

export default CardLink;
