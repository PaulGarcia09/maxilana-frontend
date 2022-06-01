import { FilterOutlined } from '@ant-design/icons';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect, useState } from 'react';
import ms from 'ms';
import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getCMSCategories from '~/api/cms/getCMSCategories';
import getCMSRematesPage from '~/api/cms/getCMSRematesPage';
import getAllCities from '~/api/getAllCities';
import getProductsFromCMSFilters from '~/api/getProductsFromCMSFilters';
import { Banners } from '~/components/common';
import { Layout } from '~/components/layout';
import { City, CMSLegal } from '~/types/Models';
import { CMSCategory } from '~/types/Models/CMSCategory';
import { CMSRematesPage } from '~/types/Models/CMSRematesPage';
import { ProductsCarrousel, ProductsFilters } from '~/components/products';
import { Product } from '~/types/Models/Product';
import parseQuery from '~/utils/parseQuery';
import { Button } from '~/components/ui';
import generateCategoryURL from '~/utils/generateCategoryURL';

interface GSProps {
  cities?: City[];
  page?: CMSRematesPage;
  categories?: Array<Partial<CMSCategory>>;
  categoriesProducts?: Array<Partial<CMSCategory & { products: Product[] }>>;
  legalPages?: CMSLegal[];
  error?: Error;
  css?: string[];
}

export const getStaticProps: GetStaticProps<GSProps> = async () => {
  const [cities, page, categories, legalPages] = await Promise.all([
    getAllCities(),
    getCMSRematesPage(),
    getCMSCategories(true),
    getAllLegalPages(),
  ]);
  const categoriesProducts = page?.categories?.length
    ? await Promise.all(
        page?.categories.map((item) => {
          const category = categories.find(({ id }) => id === item?.category?.id);
          return category?.filters
            ? getProductsFromCMSFilters({
                ...category?.filters,
                quantity: 10,
              }).then((products) => {
                return { ...category, products };
              })
            : { ...category, products: [] as Product[] };
        }),
      )
    : [];

  return {
    props: {
      cities,
      page,
      categories,
      categoriesProducts,
      legalPages,
      css: ['/antd/radio.css', '/antd/checkbox.css'],
    },
    revalidate: ms(process.env.REMATE_REVALIDATE || '10m') / 1000,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Remates: NextPage<Props> = ({
  cities,
  page,
  categories,
  categoriesProducts,
  legalPages,
  error,
}) => {
  const router = useRouter();
  const [visibleFilter, setVisibleFilter] = useState(false);

  const handleFiltersChanges = (queryParams: ParsedUrlQuery) => {
    setVisibleFilter(false);
    router.push(`/busqueda?${parseQuery(queryParams)}`, undefined, { shallow: true });
  };

  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      setVisibleFilter(false);
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

  return (
    <Layout meta={{ ...(page?.seo || {}) }} cities={cities || []} legalPages={legalPages || []}>
      <div className="container mx-auto lg:p-4 grid grid-cols-1 gap-8 lg:gap-8 lg:grid-cols-4">
        <aside>
          <ProductsFilters
            cities={cities}
            categories={categories || []}
            visible={visibleFilter}
            onClose={() => setVisibleFilter(false)}
            onFiltersChange={handleFiltersChanges}
          />
        </aside>
        <div className="fixed inset-x-6 bottom-4 z-10 flex justify-start lg:hidden">
          <Button
            icon={<FilterOutlined />}
            text="Filtros y orden"
            onClick={() => setVisibleFilter(true)}
            theme="secondary"
          />
        </div>
        <main className="lg:col-span-3">
          <div className="px-4 lg:px-0 mb-12">
            <Banners items={page?.banners} />
          </div>
          {!!categoriesProducts?.length &&
            categoriesProducts
              .filter((item) => item?.products?.length)
              .map((item) => {
                return (
                  <div key={item?.id} className="max-w-full">
                    <div className="flex">
                      <h3 className="h5 m-4">{item?.name}</h3>
                      <Button
                        text="Ver todos"
                        theme="secondary"
                        variant="link"
                        href={generateCategoryURL(item)}
                      />
                    </div>
                    <ProductsCarrousel products={item?.products || []} />
                  </div>
                );
              })}
        </main>
      </div>
    </Layout>
  );
};

export default Remates;
