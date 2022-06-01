import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import ms from 'ms';
import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getCMSSections from '~/api/cms/getCMSSections';
import getAllCities from '~/api/getAllCities';
import { Layout } from '~/components/layout';
import { City, CMSLegal } from '~/types/Models';
import { CMSSection } from '~/types/Models/CMSSection';
import { CardLink } from '~/components/ui';

interface GSProps {
  cities: City[];
  sections?: Array<Partial<CMSSection>>;
  legalPages: CMSLegal[];
}

export const getStaticProps: GetStaticProps<GSProps> = async () => {
  const [cities, sections, legalPages] = await Promise.all([
    getAllCities(),
    getCMSSections(),
    getAllLegalPages(),
  ]);

  return {
    props: {
      cities,
      sections,
      legalPages,
    },
    revalidate: ms(process.env.DEFAULT_REVALIDATE || '10m') / 1000,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Sections: NextPage<Props> = ({ cities, sections, legalPages }) => {
  return (
    <Layout title="Preguntas frecuentes" cities={cities} legalPages={legalPages}>
      <main className="container mx-auto p-4 my-12 grid gap-8 lg:grid-cols-3">
        <div>
          <h1 className="h6 text-brand uppercase mb-2">Preguntas frecuentes</h1>
          <h2 className="h4 mb-4">¿En que podemos ayudarte?</h2>
          <p className="text-secondary">
            Encuentra las respuestas que buscas del tema de tu interés. para más información{' '}
            <Link href="/contacto">
              <a className="text-brand underline">comunicate con nosotros</a>
            </Link>
          </p>
        </div>
        <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
          {sections?.map?.((section) => (
            <Link href={`/preguntas-frecuentes/${section.slug}`} key={section.id}>
              <a>
                <CardLink label={section.name as string} />
              </a>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
};
export default Sections;
