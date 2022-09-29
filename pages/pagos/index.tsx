import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import ms from 'ms';

import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getPaymentsList from '~/api/cms/getPayments';
import getAllCities from '~/api/getAllCities';
import { Button, Card } from '~/components/ui';
import { Container, Layout } from '~/components/layout';
import Image from 'next/image';
import { DefaultPageProps } from '~/types/DefaultPageProps';
import { CMSPayment } from '~/types/Models';
import getCMSImageURL from '~/utils/getCMSImageURL';

export const getStaticProps: GetStaticProps<
  DefaultPageProps<{ payments: CMSPayment[] }>
> = async () => {
  const [cities, legalPages, payments] = await Promise.all([
    getAllCities(),
    getAllLegalPages(),
    getPaymentsList(),
  ]);
  return {
    props: {
      cities,
      legalPages,
      payments,
    },
    revalidate: ms(process.env.DEFAULT_REVALIDATE || '10m') / 1000,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PaymentsPage: NextPage<Props> = ({ cities, legalPages, payments }) => {
  return (
    <Layout
      meta={{
        title: 'Paga online directamente a tu distribuidora',
        description: 'Ahora puedes pagar nuestros servicios desde la comodidad de tu casa.',
      }}
      cities={cities}
      legalPages={legalPages}
    >
      <Container>
        <div className="py-12 sm:py-16">
          <div className="mb-11">
            <h1 className="text-2xl mb-4 sm:text-4xl">Pago en línea</h1>
            <p className="text-lg">
              Ahora puedes pagar nuestros servicios desde la comodidad de tu casa.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-4">
            {payments.map((item) => (
              <Card key={item.id}>
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <Image
                      width={370}
                      height={179}
                      layout="responsive"
                      alt={item.image.alternativeText}
                      src={getCMSImageURL(item.image)}
                    />
                  </div>
                  <div className="flex-grow text-center">
                    <h2 className="text-lg mb-4">{item.title}</h2>
                    <p className="text-secondary mb-4">{item.description}</p>
                  </div>
                  <Button
                    fullWidth
                    theme="primary"
                    href={`/pagos/${item.slug}`}
                    text={item?.CTAText}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default PaymentsPage;
