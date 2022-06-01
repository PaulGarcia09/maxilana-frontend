import React, { FC } from 'react';
import { CMSBanner } from '~/types/Models/CMSBanner';
import Banner from './Banner';

import styles from './Banners.module.css';

interface Props {
  items?: Array<{ id: number; banner: CMSBanner }>;
}

const Banners: FC<Props> = ({ items = [] }) => {
  const count = items?.length;
  if (!count) return null;

  return (
    <div className={styles.root}>
      {items
        .filter((item) => Boolean(item?.banner?.id))
        .map((item, index) => (
          <Banner key={item?.id} data={item?.banner} priority={index < 2} />
        ))}
    </div>
  );
};

export default Banners;
