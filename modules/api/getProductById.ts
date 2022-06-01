import { normalizeProduct } from '~/api/normalizers';
import { Product } from '~/types/Models/Product';
import axios from './axios';

const getProductById = async (id: number | string): Promise<Product | null> => {
  const producto = await axios.get(`/productos/${id}`);

  return producto ? normalizeProduct(producto) : null;
};

export default getProductById;
