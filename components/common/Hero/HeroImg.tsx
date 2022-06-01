/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react';
//import useImageLoaded from '~/hooks/useImageLoaded';

import styles from './HeroImage.module.css';

interface Props {
  mobile: string;
  tablet?: string;
  desktop?: string;
}

const getNextImageUrl = (url: string) => `/_next/image?url=${encodeURIComponent(url)}&w=1920&q=60`;

const HeroImg: FC<Props> = ({ mobile, tablet, desktop }) => (
  <picture className={styles.picture}>
    {desktop && <source srcSet={getNextImageUrl(desktop)} media="(min-width: 991px)" />}
    {tablet && (
      <source srcSet={getNextImageUrl(tablet)} media="(min-width: 768px) and (max-width: 991px)" />
    )}
    <img src={getNextImageUrl(mobile)} alt="" className={styles.img} sizes="100vw" />
  </picture>
);

export default HeroImg;
