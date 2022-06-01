import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Image from 'next/image';
import ms from 'ms';
import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getOtherServices from '~/api/cms/getOtherServices';
import getAllCities from '~/api/getAllCities';
import { Layout } from '~/components/layout';
import { CMSContent } from '~/components/common';
import { Card } from '~/components/ui';
import { DefaultPageProps } from '~/types/DefaultPageProps';
import { CMSOtherService } from '~/types/Models';
import getCMSImageURL from '~/utils/getCMSImageURL';

export const getStaticProps: GetStaticProps<
  DefaultPageProps<{ otherServices: CMSOtherService[] }>
> = async () => {
  const [cities, legalPages, otherServices] = await Promise.all([
    getAllCities(),
    getAllLegalPages(),
    getOtherServices(),
  ]);

  return {
    props: { cities, legalPages, otherServices },
    revalidate: ms(process.env.DEFAULT_REVALIDATE || '1d') / 1000,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const OtrosServicios: NextPage<Props> = ({ cities, legalPages, otherServices }) => {
  return (
    <Layout title="Otros servicios" cities={cities} legalPages={legalPages}>
      <main className="container mx-auto p-4">
        <div className="max-w-5xl space-y-12 pt-12 pb-24 mx-auto">
          <h1 className="text-center h2">Otros Servicios</h1>
          <div className="grid md:grid-cols-2 gap-8">
            {otherServices.map((item) => (
              <Card className="prose max-w-none" key={item.id}>
                <div className="relative aspect-w-16 aspect-h-7 rounded overflow-hidden">
                  {item?.image && (
                    <Image
                      src={getCMSImageURL(item?.image)}
                      alt={item?.image?.alternativeText}
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                </div>
                <h2>{item.title}</h2>
                <CMSContent content={item.description} />
              </Card>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default OtrosServicios;
