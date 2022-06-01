import cn from 'classnames';
import { FC } from 'react';

import styles from './CartSummary.module.css';
import { formatPrice } from '~/modules/hooks/usePrice';
import { Cart } from '~/types/Models';
import { Img } from '~/components/ui';
import slugify from '~/utils/slugify';

interface Props {
  data: Cart;
  shipping?: number;
  loadingShipping?: boolean;
}

const LOCALE = 'es-MX';

const CartSummary: FC<Props> = ({ data, shipping = 0, loadingShipping }) => {
  const { cart, pricing } = data;

  const totalPrice = formatPrice({ amount: pricing.total, locale: LOCALE });
  const shippingPrice = formatPrice({ amount: pricing.shipping, locale: LOCALE });
  const subtotalPrice = formatPrice({ amount: pricing.subtotal, locale: LOCALE });

  return (
    <div>
      <h2 className="h6 mb-4">Detalles del pedido</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.branch}>
            <h3 className="text-base text-price mb-3">{item.branch}</h3>
            {item.products.map((product) => {
              const insurance = product?.insurance ?? 0;

              return (
                <div key={product.id} className={styles.productRow}>
                  <div className={styles.productImage}>
                    {product.image && (
                      <Img
                        src={product.image}
                        layout="fill"
                        objectFit="contain"
                        alt={`Thumbnail de ${product.name}`}
                      />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className={styles.productTitle}>{product.name}</h4>
                    <div className="text-sm">
                      <span className="text-secondary">Código: </span>
                      <span>{product.id}</span>
                    </div>
                    <div className={styles.rowSplit}>
                      <span className="text-secondary text-sm">Precio del artículo</span>
                      <span className={styles.amount}>
                        {formatPrice({ amount: product.price, locale: LOCALE })}
                      </span>
                    </div>
                    {insurance > 0 && (
                      <div className={styles.rowSplit}>
                        <span className="text-secondary text-sm">Seguro:</span>
                        <span className={styles.amount}>
                          {formatPrice({ amount: insurance, locale: LOCALE })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </li>
        ))}
      </ul>
      <div className="space-y-2 border-t border-gray-200 pt-2">
        <div className={styles.rowSplit}>
          <span className="text-secondary">Subtotal</span>
          <span className={cn(styles.amount)}>{loadingShipping ? '-' : subtotalPrice}</span>
        </div>
        <div className={styles.rowSplit}>
          <span className="text-secondary">Envio total</span>
          <span className={styles.amount}>{loadingShipping ? '...' : shippingPrice}</span>
        </div>
        <div>
          {cart.map((item) => (
            <div className={styles.rowSplit} key={slugify(item.branch)}>
              <span className="text-sm text-secondary">{`Envio ${item.branch}`}</span>
              <span className="text-sm text-secondary">
                {formatPrice({ amount: item.shipping, locale: LOCALE })}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.rowSplit}>
          <span className="font-semibold text-lg">Total</span>
          <span className={cn(styles.amount, styles.amountFeat)}>
            {loadingShipping ? '-' : totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
