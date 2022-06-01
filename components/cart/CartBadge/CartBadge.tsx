import { FC } from 'react';
import Link from 'next/link';
import { ShoppingCartOutlined } from '@ant-design/icons';

import useCart from '~/hooks/cart/useCart';
import styles from './CartBadge.module.css';

const CartBadge: FC = () => {
  const { data, cartLength } = useCart();

  return (
    <Link href="/carrito" prefetch={false}>
      <a className={styles.root}>
        {data !== undefined && <small className={styles.badge}>{cartLength}</small>}
        <ShoppingCartOutlined style={{ fontSize: 24 }} />
      </a>
    </Link>
  );
};

export default CartBadge;
