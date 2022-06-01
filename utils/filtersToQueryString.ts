import { CMSFilters } from '~/types/Models/CMSFilters';
import parseQuery from '~/utils/parseQuery';

export const filtersToQueryParams = (filters: Partial<CMSFilters>): Record<string, string> => {
  const query: Record<string, string> = { orden: filters?.order || 'rand' };
  if (filters?.search) query.q = filters.search;
  if (filters?.city) query.ciudad = `${filters.city}`;
  if (filters?.products?.length) {
    query.producto = filters?.products?.map?.((item) => item.itemID).join(',');
  }
  return query;
};

const filtersToQueryString = (filters: Partial<CMSFilters>): string => {
  return parseQuery(filtersToQueryParams(filters));
};

export default filtersToQueryString;
