import cn from 'classnames';
import Link from 'next/link';
import React, { FC } from 'react';
import { Img } from '~/components/ui';
import { CMSBanner } from '~/types/Models/CMSBanner';
import getCMSImageURL from '~/utils/getCMSImageURL';

import styles from './Banners.module.css';

interface Props {
  data: CMSBanner;
  priority: boolean;
}

const Banner: FC<Props> = ({ data, priority }) => {
  const image = (
    <Img
      src={getCMSImageURL(data?.image)}
      layout="fill"
      objectFit="cover"
      quality={90}
      priority={priority}
    />
  );
  const url =
    Array.isArray(data?.products_page_mkts) && data?.products_page_mkts?.length === 1
      ? `/remates/${data?.products_page_mkts[0].slug}`
      : data?.link;

  if (url) {
    return (
      <Link href={url}>
        <a className={cn(styles.item, styles[data?.type])}>{image}</a>
      </Link>
    );
  }
  return <div className={cn(styles.item, styles[data?.type])}>{image}</div>;
};

export default Banner;
