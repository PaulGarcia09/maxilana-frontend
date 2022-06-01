import { mutate } from 'swr';
import { Product } from '~/types/Models/Product';
import { NextAPIMutator } from '~/modules/api/nextApiFetcher';

const useAddItem = () => {
  const addItem = async (product: Product) => {
    const productId = product.id;

    const cart = await NextAPIMutator({
      endpoint: '/api/cart/addItem',
      method: 'POST',
      body: JSON.stringify({ pid: productId }),
    });

    await mutate(`/api/cart`, cart, false);
  };

  return addItem;
};

export default useAddItem;
