import { ParsedUrlQuery } from 'querystring';
import { Product } from '~/types/Models/Product';
import { Paginated } from '~/types/Paginated';
import { GetProductos } from '~/types/Responses/GetProductos';
import parseQuery from '~/utils/parseQuery';
import axios from './axios';
import { normalizeProduct } from './normalizers';

/**
 * Este endpoint devuelve los productos paginas, recibe los siguiente query params:
 * ciudad: ids separados por coma
 * sucursal: ids separados por coma
 * categoria: ids separados por coma
 * limit: numero de productos por página
 * page: numero de pagina
 * vtalinea: 1 | 0 filtra los productos que tienen venta en linea.
 * order: orden (desc|asc|random) por precio
 * min: precio mínimo de productos
 * max: precio máximo del producto
 * @param query
 */
const getProducts = async (query?: ParsedUrlQuery): Promise<Paginated<Product>> => {
  const queryParams = parseQuery({ page: '1', limit: '24', ...query });
  const response = await axios.get<GetProductos>(`/productos?${queryParams}`);

  return {
    ...response,
    page: parseInt((query?.page as string) || '1'),
    rows: (response.rows || []).map(normalizeProduct),
  };
};

export default getProducts;
