import { ParsedUrlQuery } from 'querystring';
import getProducts from '~/api/getProducts';
import { CMSFilters } from '~/types/Models/CMSFilters';
import { Product } from '~/types/Models/Product';

const getProductsFromCMSFilters = async (filters: Partial<CMSFilters>): Promise<Product[]> => {
  const query: ParsedUrlQuery = {
    limit: `${filters?.quantity || '10'}`,
    orden: filters?.order || 'rand',
  };
  if (filters?.categories?.length) {
    query.categoria = filters?.categories
      ?.filter((item) => item.itemID.trim())
      .map((item) => item?.itemID)
      .join(',');
  }
  // TODO: soporte para obtener los productos seleccionados en la categoria (CMS)
  if (filters?.search) query.q = filters?.search;
  // query.orden = transformOrden(query?.orden as string);
  const paginatedProducts = await getProducts(query);

  return paginatedProducts?.rows;
};

export default getProductsFromCMSFilters;
