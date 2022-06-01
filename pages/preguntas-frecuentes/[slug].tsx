import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import ms from 'ms';
import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getCMSSectionBySlug from '~/api/cms/getCMSSectionBySlug';
import getCMSSections from '~/api/cms/getCMSSections';
import getCMSSectionsSlugs from '~/api/cms/getCMSSectionsSlugs';
import getAllCities from '~/api/getAllCities';
import { Layout } from '~/components/layout';
import { SideMenu, CMSContent } from '~/components/common';
import { Collapse } from '~/components/ui';
import { City, CMSLegal } from '~/types/Models';
import { CMSSection } from '~/types/Models/CMSSection';
import slugify from '~/utils/slugify';

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const slugs = await getCMSSectionsSlugs();
  return {
    paths: slugs?.map?.((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

interface GSProps {
  cities: City[];
  section: CMSSection;
  sections: Array<Partial<CMSSection>>;
  legalPages: CMSLegal[];
}

export const getStaticProps: GetStaticProps<GSProps> = async (ctx) => {
  const { slug } = ctx?.params || {};
  const [cities, section, sections, legalPages] = await Promise.all([
    getAllCities(),
    getCMSSectionBySlug(slug as string),
    getCMSSections(),
    getAllLegalPages(),
  ]);

  return {
    props: {
      cities,
      section,
      sections,
      legalPages,
    },
    revalidate: ms(process.env.DEFAULT_REVALIDATE || '10m') / 1000,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Faq: NextPage<Props> = ({ cities, section, sections, legalPages }) => {
  const router = useRouter();
  const [, slug] = router.asPath.match(/#([a-zA-z0-9-_]+)/) || [];
  return (
    <Layout title={section?.name} cities={cities} meta={section?.seo} legalPages={legalPages}>
      <main className="container mx-auto px-4 py-12 grid gap-16 lg:grid-cols-3">
        <div className="hidden lg:block">
          <SideMenu
            links={
              sections.map((item) => ({
                label: `${item?.name}`,
                href: `/preguntas-frecuentes/${item?.slug}`,
              })) || []
            }
          />
        </div>
        <div className="lg:col-span-2">
          <h1 className="h4 mb-8">{section?.name}</h1>
          <div className="bg-white rounded divide-y">
            {section?.faqs?.map?.((faq) => (
              <Collapse
                key={faq?.id}
                title={
                  <h2 className="h6 relative">
                    {faq?.question}
                    <span id={slugify(`${faq?.question}`)} className="absolute top-[-108px]" />
                  </h2>
                }
                className="p-4"
                indicatorStyle="circle"
                collapsed={slug !== slugify(`${faq?.question}`)}
              >
                <CMSContent content={`${faq?.answer}`} className="prose max-w-none" />
              </Collapse>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Faq;
