import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import cn from 'classnames';
import React, { FC, LegacyRef, UIEventHandler, useEffect, useRef, useState } from 'react';
import { ProductCard } from '~/components/ui';
import { Product } from '~/types/Models/Product';

import styles from './ProductsCarrousel.module.css';

interface Props {
  products: Product[];
}

const ProductsCarrousel: FC<Props> = ({ products }) => {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const [leftMax, setLeftMax] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  const visibleLeft = left && left > 0;
  const visibleRight = width < scrollWidth && left < leftMax;

  useEffect(() => {
    if (scrollElementRef.current && (!width || !scrollWidth)) {
      setWidth(scrollElementRef.current.offsetWidth);
      setScrollWidth(scrollElementRef.current.scrollWidth);
      setLeftMax(scrollElementRef.current.scrollWidth - scrollElementRef.current.offsetWidth);
    }
  }, [scrollElementRef.current]);

  const itemWidth = () => {
    return scrollElementRef?.current?.firstElementChild
      ? parseFloat(getComputedStyle(scrollElementRef.current.firstElementChild).width)
      : 0;
  };

  const pageWidth = () => {
    return itemWidth() * (width / itemWidth() || 0);
  };

  const handleScrollEvent: UIEventHandler<HTMLDivElement> = (e) => {
    setLeft(e?.currentTarget?.scrollLeft);
  };

  const moveToLeft = () => {
    scrollElementRef?.current?.scrollTo?.({ left: left - pageWidth(), behavior: 'smooth' });
  };

  const moveToRight = () => {
    const page = pageWidth();
    //const newLeft = left + pageWidth();
    const newLeft = left + page < leftMax ? left + page : leftMax;
    scrollElementRef?.current?.scrollTo?.({
      left: newLeft,
      behavior: 'smooth',
    });
    setLeft(newLeft);
  };

  return (
    <div className={cn(styles.root, { [styles.left]: visibleLeft, [styles.right]: visibleRight })}>
      <div className={styles.scroll} onScroll={handleScrollEvent} ref={scrollElementRef}>
        {!!products?.length &&
          products.map((product) => (
            <ProductCard data={product} key={product.id} className={styles.item} />
          ))}
        <button
          className={cn(styles.button, { [styles.leftButton]: visibleLeft })}
          onClick={moveToLeft}
        >
          <LeftOutlined />
        </button>
        <button
          className={cn(styles.button, { [styles.rightButton]: visibleRight })}
          onClick={moveToRight}
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export default ProductsCarrousel;
