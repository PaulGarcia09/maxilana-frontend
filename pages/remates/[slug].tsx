import { FilterOutlined } from '@ant-design/icons';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import omit from 'lodash.omit';
import React, { useEffect, useState } from 'react';
import ms from 'ms';
import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getCMSCategories from '~/api/cms/getCMSCategories';
import getCMSMktPagesSlugs from '~/api/cms/getCMSMktPagesSlugs';
import getMktPageBySlug from '~/api/cms/getMktPageBySlug';
import getAllCities from '~/api/getAllCities';
import getProductsFromCMSFilters from '~/api/getProductsFromCMSFilters';
import { CMSContent } from '~/components/common';
import { Layout } from '~/components/layout';
import { ProductsFilters } from '~/components/products';
import { Button, Img, ProductCard } from '~/components/ui';
import { City, CMSLegal } from '~/types/Models';
import { CMSCategory } from '~/types/Models/CMSCategory';
import { CMSMktPage } from '~/types/Models/CMSMktPage';
import { Product } from '~/types/Models/Product';
import { filtersToQueryParams } from '~/utils/filtersToQueryString';
import getCMSImageURL from '~/utils/getCMSImageURL';
import parseQuery from '~/utils/parseQuery';

interface GSProps {
  cities?: City[];
  categories?: Array<Partial<CMSCategory>>;
  page?: Partial<CMSMktPage>;
  products?: Product[];
  legalPages: CMSLegal[];
  css?: string[];
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const slugs = await getCMSMktPagesSlugs();
  return {
    paths: slugs?.map?.((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<GSProps, { slug: string }> = async (ctx) => {
  const { slug } = ctx?.params || {};
  if (!slug) return { notFound: true };

  const [cities, categories, page, legalPages] = await Promise.all([
    getAllCities(),
    getCMSCategories(true),
    getMktPageBySlug(slug as string),
    getAllLegalPages(),
  ]);

  if (!page) return { notFound: true };
  const products = page?.productsFilters
    ? await getProductsFromCMSFilters(page?.productsFilters)
    : [];

  return {
    props: {
      cities,
      categories,
      page,
      products,
      legalPages,
      css: ['/antd/radio.css', '/antd/checkbox.css'],
    },
    revalidate: ms(process.env.REMATE_REVALIDATE || '10m') / 1000,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const MarketingPage: NextPage<Props> = ({ page, categories, cities, products, legalPages }) => {
  const router = useRouter();
  const [visibleFilter, setVisibleFilter] = useState(false);
  const { push } = useRouter();
  const handleFiltersChanges = (queryParams: ParsedUrlQuery) => {
    setVisibleFilter(false);
    push(`/busqueda?${parseQuery(omit(queryParams, 'slug'))}`, undefined, { shallow: true });
  };

  const category = categories?.find?.((item) => item?.products_page_mkt?.id == page?.id)?.id;
  const filters = filtersToQueryParams(page?.productsFilters || {});
  const queryParams = category ? { categoria: `${category}`, ...filters } : filters;

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
    <Layout
      title={page?.title}
      meta={{ ...(page?.seo || {}) }}
      cities={cities || []}
      legalPages={legalPages}
    >
      <div className="container mx-auto p-4 grid grid-cols-1 gap-8 lg:gap-8 lg:grid-cols-4">
        <aside>
          <ProductsFilters
            onFiltersChange={handleFiltersChanges}
            cities={cities}
            categories={categories || []}
            visible={visibleFilter}
            onClose={() => setVisibleFilter(false)}
            initialValues={queryParams}
          />
        </aside>
        <main className="lg:col-span-3 mb-12">
          {page?.cover?.url && (
            <div className="aspect-w-16 aspect-h-6 relative rounded overflow-hidden mb-6">
              <Img src={getCMSImageURL(page.cover, 'large')} layout="fill" />
            </div>
          )}
          <h1 className="h4 mb-8">{page?.title}</h1>
          {!!page?.content && (
            <CMSContent content={page?.content} className="prose max-w-none mb-6" />
          )}
          <div className="fixed inset-x-6 bottom-4 z-10 flex justify-start lg:hidden">
            <Button
              icon={<FilterOutlined />}
              text="Filtros y orden"
              onClick={() => setVisibleFilter(true)}
              theme="secondary"
            />
          </div>
          <div className="productsGrid">
            {products?.map?.((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
          <div className="text-center">
            <Button
              text="Ver mas productos"
              theme="primary"
              size="large"
              href={`/busqueda?${parseQuery({
                ...queryParams,
                ...(queryParams.orden === 'rand' ? {} : { page: '2' }),
              })}`}
            />
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default MarketingPage;
