import omit from 'lodash.omit';
import { ParsedUrlQuery } from 'querystring';
import { CMSCategory } from '~/types/Models/CMSCategory';
import { filtersToQueryParams } from '~/utils/filtersToQueryString';
import parseQuery from '~/utils/parseQuery';

export const generateCategoryQueryParams = (
  item: Partial<CMSCategory>,
  query?: ParsedUrlQuery,
): ParsedUrlQuery => {
  return {
    ...omit(query || {}, 'q'),
    categoria: `${item?.id}`,
    ...(item?.filters ? filtersToQueryParams(item?.filters) : {}),
  };
};

const generateCategoryURL = (item: Partial<CMSCategory>, query?: ParsedUrlQuery): string => {
  return item?.products_page_mkt?.slug
    ? `/remates/${item.products_page_mkt.slug}`
    : `/busqueda?${parseQuery(generateCategoryQueryParams(item, query))}`;
};

export default generateCategoryURL;
