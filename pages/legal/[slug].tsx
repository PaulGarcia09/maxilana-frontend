import ms from 'ms';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getLegalPageBySlug from '~/api/cms/getLegalPageBySlug';
import getAllCities from '~/api/getAllCities';
import { CMSContent, SideMenu } from '~/components/common';
import { Layout } from '~/components/layout';
import legalLinks from '~/modules/mock/legal.json';
import { City, CMSLegal } from '~/types/Models';

interface GSProps {
  cities: City[];
  legalPages: CMSLegal[];
  page: CMSLegal;
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const legalPages = await getAllLegalPages();

  return {
    paths: legalPages.map((page) => ({ params: { slug: `${page.slug}` } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<GSProps> = async (ctx) => {
  const [page, cities, legalPages] = await Promise.all([
    getLegalPageBySlug(`${ctx?.params?.slug}`),
    getAllCities(),
    getAllLegalPages(),
  ]);

  return {
    props: {
      cities,
      legalPages,
      page,
    },
    revalidate: ms(process.env.DEFAULT_REVALIDATE || '10m') / 1000,
  };
};
type Props = InferGetStaticPropsType<typeof getStaticProps>;
const LegalPage: NextPage<Props> = ({ cities, legalPages, page }) => {
  return (
    <Layout cities={cities} legalPages={legalPages} meta={page?.seo}>
      <main className="container mx-auto px-4 py-12 grid gap-16 lg:grid-cols-3">
        <div className="hidden lg:block">
          <SideMenu
            links={[
              ...legalPages.map((item) => ({
                id: item.id,
                label: item.title,
                href: item.slug,
              })),
              ...legalLinks,
            ]}
          />
        </div>
        <div className="lg:col-span-2 prose">
          <CMSContent content={page?.content} />
        </div>
      </main>
    </Layout>
  );
};

export default LegalPage;
