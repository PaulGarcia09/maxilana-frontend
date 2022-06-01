import useSWR from 'swr';
import { useMemo } from 'react';

import NextAPIFetcher from '~/modules/api/nextApiFetcher';
import { Cart } from '~/types/Models';
import { FetcherError } from '~/modules/lib/errors';

const useCart = () => {
  const wrapper = (endpoint: string) => NextAPIFetcher({ endpoint });
  const { data, isValidating } = useSWR<Cart, FetcherError>('/api/cart', {
    fetcher: wrapper,
    revalidateOnFocus: false,
  });

  const productsInCart = useMemo(() => {
    if (data?.id) {
      const qtyProducts = data.cart.reduce((prevValue, currItem) => {
        const { products } = currItem;
        const newValue = prevValue + (products?.length ?? 0);

        return newValue;
      }, 0);

      return qtyProducts;
    }

    return 0;
  }, [data]);

  return {
    data,
    isEmpty: productsInCart < 1,
    isLoading: isValidating && data === undefined,
    cartLength: productsInCart,
  };
};

export default useCart;
