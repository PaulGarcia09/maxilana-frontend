import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import ms from 'ms';

import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getHomePage from '~/api/cms/getHomePage';
import getAllCities from '~/api/getAllCities';
import getProductsFromCMSFilters from '~/api/getProductsFromCMSFilters';
import { Container, Layout } from '~/components/layout';
import { Card, Button, ProductCard } from '~/components/ui';
import { CategoryExplorer, ComissionsTable, Hero, HeroImg } from '~/components/common';
import { City, CMSLegal } from '~/types/Models';
import { CMSCategory } from '~/types/Models/CMSCategory';
import { CMSHomePage } from '~/types/Models/CMSHomePage';
import { Product } from '~/types/Models/Product';
import getCMSCategories from '~/api/cms/getCMSCategories';
import getCMSImageURL from '~/utils/getCMSImageURL';
import parseQuery from '~/utils/parseQuery';

interface GSProps {
  products: Product[];
  page: Partial<CMSHomePage>;
  categories: Array<Partial<CMSCategory>>;
  cities: City[];
  legalPages: CMSLegal[];
}

export const getStaticProps: GetStaticProps<GSProps> = async () => {
  const [cities, page, legalPages] = await Promise.all([
    getAllCities(),
    getHomePage(),
    getAllLegalPages(),
  ]);
  const categories = page?.categories?.length ? page?.categories : await getCMSCategories();

  const products = await getProductsFromCMSFilters(
    page?.productFilters || { quantity: 8, order: 'rand' },
  );

  return {
    props: {
      cities,
      products,
      page,
      categories,
      legalPages,
    },
    revalidate: ms(process.env.HOME_REVALIDATE || '10m') / 1000,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ cities, products, page, categories, legalPages }) => {
  const url = page?.hero?.image ? getCMSImageURL(page?.hero?.image) : '';
  const baseURL = `${process.env.NEXT_PUBLIC_API_BASEURL}/image`;

  const mobileHeroImage = `${baseURL}?${parseQuery({ url, w: '300', h: '350', q: '100' })}`;
  const tabletHeroImage = `${baseURL}?${parseQuery({ url, w: '840', h: '400', q: '100' })}`;
  const desktopHeroImage = `${baseURL}?${parseQuery({ url, q: '100' })}`;

  const Cover = url ? (
    <HeroImg mobile={mobileHeroImage} tablet={tabletHeroImage} desktop={desktopHeroImage} />
  ) : null;

  return (
    <Layout
      meta={{ ...page.seo, images: url ? [mobileHeroImage] : [] }}
      cities={cities}
      legalPages={legalPages}
    >
      <Hero
        title={`${page?.hero?.mainText}`}
        subtitle={page?.hero?.secondaryText}
        actions={
          <>
            {page?.hero?.actions.map((cta, index) => (
              <Button
                key={cta.id}
                text={cta.text}
                theme={!index ? 'primary' : 'default'}
                href={cta.url}
                prefetch={false}
              />
            ))}
          </>
        }
        cover={Cover}
      />
      <Container>
        <div className="grid gap-6 my-12 md:grid-cols-2 lg:my-16">
          {page?.directAccess?.map?.((card) => (
            <Card key={card.id} className="overflow-hidden" noPadding>
              <section className="p-4 flex flex-col items-center justify-center space-y-4 sm:p-0 sm:pl-4 sm:flex-row-reverse sm:space-y-0 sm:justify-between md:pl-6">
                <div className="relative mr-2 min-w-[150px] lg:min-w-[200px]">
                  <Image
                    width={250}
                    height={364}
                    layout="responsive"
                    src={getCMSImageURL(card.image)}
                    alt={card.title}
                  />
                </div>
                <div className="text-center pb-2 space-y-3 sm:pb-0 sm:text-left lg:space-y-4">
                  <h1 className="text-lg lg:text-2xl">{card.title}</h1>
                  <p className="text-xs lg:text-base">{card.description}</p>
                  {card.link?.map?.((link) => (
                    <Button key={link?.id} size="small" href={link.url} text={link.text} />
                  ))}
                </div>
              </section>
            </Card>
          ))}
        </div>
        <section className="my-12 lg:my-[72px]">
          <h1 className="text-center text-2xl">¡Todos nuestros productos en Remate!</h1>
          {!!categories && <CategoryExplorer categories={categories} />}
          <div className="text-center">
            <Button theme="secondary" text="Ver todos los remates" href="/remates" />
          </div>
        </section>
        <section>
          <h1 className="text-2xl text-center">Nuestros últimos productos</h1>
          <div className="grid grid-cols-2 gap-2 my-4 sm:grid-cols-4 sm:gap-4 lg:gap-6">
            {products.map((item) => (
              <ProductCard key={item.id} data={item} />
            ))}
          </div>
        </section>
      </Container>
      <section className="my-12 lg:my-24">
        <h1 className="text-2xl text-center">Consulta los costos y comisiones</h1>
        <ComissionsTable />
      </section>
    </Layout>
  );
};

export default Home;
