import { mutate } from 'swr';
import { NextAPIMutator } from '~/modules/api/nextApiFetcher';

const useRemoveItem = () => {
  const removeItem = async (productId: string) => {
    const cart = await NextAPIMutator({
      endpoint: '/api/cart/removeItem',
      method: 'POST',
      body: JSON.stringify({ pid: productId }),
    });

    await mutate(`/api/cart`, cart, false);
  };

  return removeItem;
};

export default useRemoveItem;
