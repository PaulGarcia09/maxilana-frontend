import ms from 'ms';
import React from 'react';
import Image from 'next/image';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getPaybillsPage from '~/api/cms/getPaybillsPage';
import getAllCities from '~/api/getAllCities';
import { ButtonDropdown } from '~/components/ui';
import { Layout, Container, HelpSidebar } from '~/components/layout';
import { Hero, ServicePaymentCards } from '~/components/common';
import { DefaultPageProps } from '~/types/DefaultPageProps';

import HowWorks01 from '~/public/como-funcionan-vales-01.png';
import HowWorks02 from '~/public/como-funcionan-vales-02.png';
import HowWorks03 from '~/public/como-funcionan-vales-03.png';
import HowWorks04 from '~/public/como-funcionan-vales-04.png';
import GetMaxilanaVales from '~/public/gana-maxilana-vales.png';
import PayVales from '~/public/pagar-vales.png';
import { CMSPaybill } from '~/types/Models/CMSPaybill';
import getCMSImageURL from '~/utils/getCMSImageURL';

export const getStaticProps: GetStaticProps<DefaultPageProps<{ page: CMSPaybill }>> = async () => {
  const [cities, legalPages, page] = await Promise.all([
    getAllCities(),
    getAllLegalPages(),
    getPaybillsPage(),
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

const ValesPage: NextPage<Props> = ({ cities, legalPages, page }) => {
  return (
    <Layout meta={page?.seo} cities={cities} legalPages={legalPages}>
      <Hero
        title={page?.hero?.mainText}
        subtitle={page?.hero?.secondaryText}
        cover={
          <Image
            layout="fill"
            src={getCMSImageURL(page?.hero?.image)}
            alt="Mujer hablando por teléfono, consiguiendo clientes"
            objectFit="cover"
            priority
          />
        }
        actions={
          <ButtonDropdown
            theme="danger"
            items={page?.whatsapps}
            label="Conviérte en distribuidora"
          />
        }
      />
      <Container>
        <div className="py-12 max-w-5xl mx-auto sm:py-24">
          <ServicePaymentCards
            paymentType="vale"
            actionCard={{
              title: page?.payment?.title,
              imageSource: PayVales,
              description: page?.payment?.description,
              buttonLabel: page?.payment?.CTAText,
              buttonHref: `/pagos/${page?.payment?.slug}`,
            }}
            contextCard={{
              title: 'Realiza abonos de vales sin acudir a sucursal',
              description: 'Por medio de depósito o transferencia en:',
              bankAccount: page?.bankAccount,
            }}
          />
        </div>
      </Container>
      <section className="bg-[#EF6387]">
        <div className="max-w-4xl mx-auto py-2 sm:py-9">
          <p className="text-center text-white text-xl sm:text-2xl">
            <strong>¡Gana hasta un 18% ofreciendo a tus clientes los mejores servicios!</strong>
          </p>
        </div>
      </section>
      <Container>
        <div className="my-12 sm:my-24">
          <h2 className="text-2xl text-center sm:text-4xl">¿Cómo funciona?</h2>
          <div className="mt-12 sm:grid sm:grid-cols-2 gap-20 items-center">
            <div className="mb-6 order-2">
              <h3 className="text-xl mb-4">Sin invertir</h3>
              <p className="text-base sm:text-lg">
                Aprovecha el capital que te proporciona Maxilana y empieza a obtener tus propias
                ganancias.
              </p>
            </div>
            <div className="order-1">
              <div className="max-w-xs mx-auto">
                <Image
                  width={376}
                  height={431}
                  quality={80}
                  layout="responsive"
                  src={HowWorks01}
                  objectFit="cover"
                  alt="Imagen de mujer pensando en invertir en Maxilana Vales"
                />
              </div>
            </div>
          </div>
          <div className="mt-12 sm:grid sm:grid-cols-2 gap-20 items-center">
            <div className="mb-6">
              <h3 className="text-xl mb-4">Administra tu tiempo y genera tus propios ingresos</h3>
              <p className="text-base sm:text-lg">
                Con tu línea de crédito podrás realizar préstamos en vales para que tus clientes los
                cambien en tiendas Maxilana.
              </p>
            </div>
            <div>
              <div className="max-w-xs mx-auto">
                <Image
                  width={303}
                  height={359}
                  quality={80}
                  layout="responsive"
                  src={HowWorks02}
                  objectFit="cover"
                  placeholder="blur"
                  alt="Imagen de mujer con una taza de café decidiendo en qué invertir su tiempo."
                />
              </div>
            </div>
          </div>
          <div className="mt-12 sm:grid sm:grid-cols-2 gap-20 items-center">
            <div className="mb-6 order-2">
              <h3 className="text-xl mb-4">Te damos mayor plazo</h3>
              <p className="text-base sm:text-lg">
                Obtén mayor tiempo para pagar los abonos de tus créditos.
              </p>
            </div>
            <div className="order-1">
              <div className="max-w-xs mx-auto">
                <Image
                  width={368}
                  height={435}
                  quality={80}
                  layout="responsive"
                  src={HowWorks03}
                  objectFit="cover"
                  placeholder="blur"
                  alt="Imagen de mujer viendo un celular con un vaso de café en la mano"
                />
              </div>
            </div>
          </div>
          <div className="mt-12 sm:grid sm:grid-cols-2 gap-20 items-center">
            <div className="mb-6">
              <h3 className="text-xl mb-4">Crecemos contigo</h3>
              <p className="text-base sm:text-lg">
                Contamos con un equipo de asesoría que te apoyara en todo momento, apoyo en la
                administración y manejo de cartera de tus clientes.
              </p>
            </div>
            <div>
              <div className="max-w-xs mx-auto">
                <Image
                  width={317}
                  height={346}
                  quality={80}
                  layout="responsive"
                  src={HowWorks04}
                  objectFit="cover"
                  placeholder="blur"
                  alt="Dos mujeres conversando sobre un negocio"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <section className="bg-[#79BDFF9C]">
        <div className="max-w-4xl mx-auto px-4 pt-12">
          <div className="sm:flex flex-row-reverse items-center">
            <div className="mb-4">
              <h3 className="text-2xl mb-4">Gana más con Maxilana Vales</h3>
              <p>Aumenta tus ingresos y logra todas tus metas</p>
            </div>
            <div className="mr-4 flex-grow">
              <Image
                width={518}
                height={419}
                quality={80}
                layout="responsive"
                objectFit="contain"
                src={GetMaxilanaVales}
                placeholder="blur"
                alt="Mujer con expresión feliz por su dinero en mano"
              />
            </div>
          </div>
        </div>
      </section>
      <Container>
        <div className="py-12 sm:py-24">
          <div className="max-w-2xl mx-auto">
            <div className="sm:text-center">
              <h3 className="text-xl sm:text-3xl mb-4">
                Únete a la familia de distribuidoras de Maxilana Vales y empieza a mejorar tu vida
              </h3>
              <p className="mb-4">Solo envíanos un Whatsapp</p>
              <div className="inline-block">
                <ButtonDropdown
                  size="small"
                  theme="danger"
                  items={page?.whatsapps}
                  label="Conviérte en distribuidora"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <section className="bg-[#DEEAF5]">
        <div className="py-12 px-4">
          <h3 className="text-2xl mb-4 sm:text-center sm:text-3xl">
            Descarga la app para distribuidoras
          </h3>
          <p className="sm:text-center">
            Da seguimiento a tu cartera de clientes y otorga vales virtuales
          </p>
          <div className="mt-4 max-w-[510px] mx-auto flex flex-col items-center gap-1 sm:flex-row">
            <div className="flex-grow">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://apps.apple.com/mx/app/maxilanavales/id1347748194"
              >
                <Image
                  width={250}
                  height={65}
                  layout="fixed"
                  src="/appstore-badge.svg"
                  alt="Badge de descarga en AppStore"
                />
              </a>
            </div>
            <div className="flex-grow">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://play.google.com/store/apps/details?id=com.maxilana.maxilanavales&hl=es_MX&gl=US"
              >
                <Image
                  width={250}
                  height={95}
                  layout="fixed"
                  src="/google-play-badge.png"
                  alt="Badge de descarga en Google Play"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      <Container>
        <div className="py-10">
          <HelpSidebar direction="horizontal" questions={page?.faqs} />
        </div>
      </Container>
    </Layout>
  );
};

export default ValesPage;
