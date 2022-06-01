import cn from 'classnames';
import React, { FC } from 'react';
import { PictureOutlined } from '@ant-design/icons';

import { usePrice } from '~/modules/hooks';
import { Img } from '~/components/ui';
import { Product } from '~/types/Models/Product';
import slugify from '~/utils/slugify';

import styles from './Cards.module.css';
import Link from 'next/link';
import ProductBadge from '~/components/products/ProductBadge';

interface Props {
  data: Product;
  className?: string;
  imgLoader?: 'maxilana' | undefined;
}

const ProductCard: FC<Props> = ({ data, className, imgLoader }) => {
  const {
    image,
    name,
    price: productBasePrice,
    Branch,
    saleOnline,
    netPrice: productDiscountPrice,
    id,
  } = data;
  const href = `/producto/${id}-${slugify(name)}`;

  const { price, discount, basePrice } = usePrice({
    amount: productDiscountPrice,
    baseAmount: productBasePrice,
  });

  return (
    <div
      className={cn(styles.root, styles.rootProduct, { [styles.productLink]: !!href }, className)}
    >
      {!!href && (
        <Link href={href} prefetch={false}>
          <a className={styles.blockLink} title={name} />
        </Link>
      )}
      <div className={styles.productImgWrapper}>
        <div className={cn(styles.productImg, { [styles.productPlaceholder]: image === null })}>
          {image !== null ? (
            <Img
              src={image}
              alt={name}
              objectFit="contain"
              objectPosition="center"
              layout="intrinsic"
              width={300}
              height={300}
              customLoader={imgLoader}
            />
          ) : (
            <div className="flex justify-center items-center">
              <PictureOutlined />
            </div>
          )}
        </div>
        <div className={styles.productBadge}>
          <ProductBadge type="shop" />
          {saleOnline && <ProductBadge type="car" />}
        </div>
      </div>
      <div className={styles.productBody}>
        <h3 className={styles.productTitle}>
          {!!href ? (
            <Link href={href} prefetch={false}>
              <a title={name}>{name}</a>
            </Link>
          ) : (
            name
          )}
        </h3>
        <div className={styles.productBranch}>
          <div className={styles.productPrice}>
            {discount ? (
              <>
                <span className={styles.productPriceSale}>{price}</span>{' '}
                <span className={styles.productCompareAtPrice}>{basePrice}</span>
              </>
            ) : (
              <span>{price}</span>
            )}
          </div>
          <span className="block line-clamp-1">
            {Branch?.name}, {Branch?.City?.name}
          </span>
        </div>
      </div>
      {/* TODO: como sabes cuando un producto esta en oferta? */}
      {/*onSale && <span className={styles.productSaleBadge}>Oferta</span>*/}
    </div>
  );
};

export default ProductCard;
