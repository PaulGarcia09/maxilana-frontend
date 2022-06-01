import cn from 'classnames';
import omit from 'lodash.omit';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined, FilterOutlined } from '@ant-design/icons';
import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getCMSCategories from '~/api/cms/getCMSCategories';

import getAllCities from '~/api/getAllCities';
import getBranch from '~/api/getBranch';
import getCityBranchesBySlug from '~/api/getCityBranchesBySlug';

import { Layout } from '~/components/layout';
import getProducts from '~/api/getProducts';
import { Button, ProductCard, ProductsNotFound } from '~/components/ui';
import { SelectField } from '~/components/common';
import useEffectOnUpdate from '~/hooks/useEffectOnUpdate';
import { Branch, City, CMSLegal } from '~/types/Models';
import { CMSCategory } from '~/types/Models/CMSCategory';
import { Product } from '~/types/Models/Product';
import { Paginated } from '~/types/Paginated';
import { AppliedFilters, ProductsFilters } from '~/components/products';
import { filtersToQueryParams } from '~/utils/filtersToQueryString';
import parseQuery from '~/utils/parseQuery';

interface GSSProps {
  initialPaginatedProducts: Paginated<Product>;
  initialQuery: ParsedUrlQuery;
  cities: City[];
  initialBranch?: Branch | null;
  initialCity?: City | null;
  initialBranches?: Branch[] | null;
  categories: Array<Partial<CMSCategory>>;
  legalPages: CMSLegal[];
  css?: string[];
}

const normalizeQuery = (
  query: ParsedUrlQuery | undefined,
  categories: Partial<CMSCategory>[] | undefined,
): ParsedUrlQuery => {
  const { categoria, ...apiQuery } = query || {};
  if (categoria) {
    const category = categories?.find?.((item) => item.id === query?.categoria);
    const { filters } = category || {};
    if (filters && filters?.categories?.length) {
      apiQuery.categoria = filters?.categories.map((item) => item?.itemID).join(',');
    }
    return Object.assign(filtersToQueryParams(filters || {}), apiQuery);
  } else {
    return query || {};
  }
};

export const getServerSideProps: GetServerSideProps<GSSProps> = async (ctx) => {
  const { query } = ctx;
  if (query?.orden && !['desc', 'asc'].includes(`${query?.orden}`.toLowerCase())) {
    return {
      redirect: {
        statusCode: 307,
        destination: `/busqueda?${parseQuery({ ...query, orden: 'desc' })}`,
      },
    };
  }

  const { page, limit, ...filters } = query || {};
  const [categories, cities, legalPages] = await Promise.all([
    getCMSCategories(true),
    getAllCities(),
    getAllLegalPages(),
  ]);

  const initialPaginatedProducts = await getProducts(normalizeQuery(query, categories));

  const branch = typeof filters?.sucursal === 'string' ? await getBranch(filters.sucursal) : null;
  const city =
    branch?.CityId || filters?.ciudad
      ? cities.find((item) =>
          [branch?.CityId, parseInt(filters?.ciudad as string)].includes(item.id),
        )
      : null;
  const initialBranches = city ? await getCityBranchesBySlug(city?.slug) : null;

  return {
    props: {
      initialPaginatedProducts,
      initialQuery: query,
      cities,
      initialBranch: branch,
      initialCity: city,
      initialBranches,
      categories,
      legalPages,
      css: ['/antd/radio.css', '/antd/checkbox.css'],
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Busqueda: NextPage<Props> = ({
  initialPaginatedProducts,
  cities,
  initialBranch,
  initialCity,
  initialBranches,
  initialQuery,
  categories,
  legalPages,
}) => {
  const productImgLoader = useRef<'maxilana' | undefined>();
  const [city, setCity] = useState(initialCity);
  const [branch, setBranch] = useState(initialBranch);
  const [branches, setBranches] = useState(initialBranches);
  const [paginatedProducts, setPaginatedProducts] = useState(initialPaginatedProducts);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { query = initialQuery } = router || {};
  const [limit, setLimit] = useState(query?.limit || 24);
  const category = categories?.find?.((item) => `${item.id}` === `${query?.categoria}`);
  const { rows: products, ...pagination } = paginatedProducts;

  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      if (url.includes('busqueda')) {
        setVisibleFilter(false);
      }
    };
    const handleRouteChangeComplete = () => {
      setVisibleFilter(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  useEffectOnUpdate(() => {
    setLoading(true);
    if (query?.ciudad) {
      if (cities?.length) {
        const newCity = cities.find((item) => `${item.id}` === query?.ciudad);
        if (newCity) {
          setCity(newCity);
          getCityBranchesBySlug(newCity.slug).then(setBranches);
        }
      }
    } else {
      setCity(null);
      setBranches(null);
    }
    if (query?.sucursal) {
      if (branches?.length) {
        setBranch(branches.find((item) => `${item.id}` === query?.sucursal));
      }
    } else {
      setBranch(null);
    }
    productImgLoader.current = 'maxilana';
    getProducts(normalizeQuery(query, categories))
      .then(setPaginatedProducts)
      .finally(() => setLoading(false));
  }, [query]);

  useEffectOnUpdate(() => {
    search({ ...(query || {}), limit: `${limit}` });
  }, [limit]);

  const search = (queryParams: ParsedUrlQuery) => {
    const newQueryParams = {
      ...omit(queryParams, 'page', 'slug'),
      orden: ['desc', 'asc'].includes(`${queryParams?.orden}`) ? queryParams.orden : 'desc',
    };
    router.push(`/busqueda?${parseQuery(newQueryParams)}`, undefined, {
      scroll: false,
      shallow: true,
    });
  };

  return (
    <Layout title="Buscador de productos" cities={cities || []} legalPages={legalPages || []}>
      <main className="container mx-auto grid p-4 md:px-16 lg:p-4 mb-12 mt-4 lg:grid-cols-4 lg:gap-8 lg:flex-row">
        <aside>
          <ProductsFilters
            categories={categories || []}
            cities={cities}
            branches={branches}
            visible={visibleFilter}
            onClose={() => setVisibleFilter(false)}
            onFiltersChange={search}
          />
        </aside>
        <div className={cn('lg:col-span-3', { 'opacity-50': loading })}>
          <h2 className="h4">
            {(() => {
              if (category?.name) {
                return query?.q && `${query.q}`.toLowerCase() !== category.name.toLowerCase() ? (
                  <span>
                    {category.name}:{' '}
                    <span className="text-secondary line-clamp-1">
                      {query.q.includes('|')
                        ? `${query.q}`.split('|').map((item) => <span key={item}>{item} </span>)
                        : query.q}
                    </span>
                  </span>
                ) : (
                  category.name
                );
              }
              return query?.q ? (
                <span>{`${query?.q}`.replace?.(/\|/gm, ' | ')}</span>
              ) : (
                '¡Lista de productos en remate!'
              );
            })()}
          </h2>
          <p className="text-secondary">{pagination?.count} productos</p>
          <AppliedFilters city={city} branch={branch} onFiltersChange={search} />
          <div className="fixed inset-x-6 bottom-4 z-10 flex justify-start lg:hidden">
            <Button
              icon={<FilterOutlined />}
              text="Filtros y orden"
              onClick={() => setVisibleFilter(true)}
              theme="secondary"
            />
          </div>
          {!!products?.length ? (
            <>
              <div className="productsGrid">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    data={product}
                    imgLoader={productImgLoader.current}
                  />
                ))}
              </div>
              <div className="flex space-x-6 justify-center items-center">
                <Button
                  icon={<ArrowLeftOutlined />}
                  text="Anterior"
                  disabled={!pagination?.prev}
                  theme={pagination?.prev ? 'secondary' : 'default'}
                  href={
                    pagination?.prev
                      ? `/busqueda?${parseQuery({
                          ...(query || {}),
                          page: `${pagination?.page - 1}`,
                        })}`
                      : undefined
                  }
                />
                <span className="text-sm text-disabled">
                  {pagination?.page} /{' '}
                  {Math.ceil((pagination?.count || 1) / (pagination?.limit || 1))}
                </span>
                <Button
                  text="Siguiente"
                  rightIcon={<ArrowRightOutlined />}
                  disabled={!pagination?.next}
                  theme={pagination?.next ? 'secondary' : 'default'}
                  shallow
                  href={
                    pagination?.next
                      ? `/busqueda?${parseQuery({
                          ...(query || {}),
                          page: `${pagination?.page + 1}`,
                        })}`
                      : undefined
                  }
                />
              </div>
              <div className="flex items-center justify-center space-x-3 mt-4">
                <span>Productos por página:</span>
                <SelectField
                  value={limit}
                  name="limit"
                  options={[8, 16, 24, 48, 64, 100].map((item) => ({
                    value: item,
                    label: `${item}`,
                  }))}
                  onChange={(e) => {
                    setLimit(e.target.value);
                  }}
                />
              </div>
            </>
          ) : (
            <ProductsNotFound />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Busqueda;
