import Image from 'next/image';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import ms from 'ms';

import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getLoansPage from '~/api/cms/getLoansPage';
import LoanRequestFlow from '~/components/loans';
import { Card, ButtonDropdown, Img } from '~/components/ui';
import { HeroComposed, ServicePaymentCards } from '~/components/common';
import { Layout, VStack, Container, HelpSidebar } from '~/components/layout';
import useResponsive from '~/hooks/useResponsive';
import { DefaultPageProps } from '~/types/DefaultPageProps';
import { CMSLoans } from '~/types/Models/CMSLoans';
import getAllCities from '~/api/getAllCities';
import getCMSImageURL from '~/utils/getCMSImageURL';

export const getStaticProps: GetStaticProps<DefaultPageProps<{ page: CMSLoans }>> = async () => {
  const [cities, legalPages, page] = await Promise.all([
    getAllCities(),
    getAllLegalPages(),
    getLoansPage(),
  ]);
  return {
    props: {
      cities,
      legalPages,
      page,
      css: ['/antd/form.css', '/antd/radio.css', '/antd/slider.css'],
    },
    revalidate: ms(process.env.DEFAULT_REVALIDATE || '10m') / 1000,
  };
};
type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PrestamosPage: NextPage<Props> = ({ cities, legalPages, page }) => {
  const { isNotMobile } = useResponsive();
  return (
    <Layout cities={cities} title="Prestamos personales" legalPages={legalPages}>
      <HeroComposed
        title={page.hero.mainText}
        copy={page.hero.secondaryText}
        footer={<p className="text-lg uppercase text-accent">{page.hero.tertiaryText}</p>}
        cover={
          isNotMobile ? (
            <Img
              priority
              layout="fill"
              src={getCMSImageURL(page.hero.image)}
              alt="Prestamos Hero Image"
              objectFit="cover"
              placeholder="empty"
              quality={100}
            />
          ) : null
        }
      >
        <LoanRequestFlow />
      </HeroComposed>
      <Container>
        <div className="py-12 max-w-5xl mx-auto sm:py-24">
          <ServicePaymentCards
            paymentType="prestamo"
            actionCard={{
              title: page?.payment?.title,
              imageSource: getCMSImageURL(page?.payment?.image),
              description: page?.payment?.description,
              buttonLabel: page?.payment?.CTAText,
              buttonHref: `/pagos/${page?.payment?.slug}`,
            }}
            contextCard={{
              title: 'Realiza abonos de tu préstamo sin acudir a sucursal',
              description: 'Por medio de depósito o transferencia en:',
              bankAccount: page.bank,
            }}
          />
        </div>
      </Container>
      <section className="bg-[#EBF1F6]">
        <div className="container mx-auto px-4 py-12 sm:py-24">
          <h2 className="text-xl text-center sm:text-2xl">
            Requisitos para el préstamo personal de Maxilana
          </h2>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {requisitos.map((item) => (
              <Card key={item.id}>
                <div>
                  <div className="w-[120px] h-[120px] relative mx-auto m-10">
                    <Image
                      width={120}
                      height={120}
                      layout="responsive"
                      src={item.imageSrc}
                      alt={item.label}
                      objectFit="contain"
                    />
                  </div>
                  <p className="text-lg text-center font-semibold">{item.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Container>
        <div className="py-12 sm:py-24">
          <h2 className="text-2xl text-center">¿Cómo funciona?</h2>
          <div className="grid gap-6 mt-12 sm:gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
              <div key={item.id} className="text-center p-2">
                <div className="w-[100px] h-[100px] relative mx-auto mb-4">
                  <Image
                    width={100}
                    height={100}
                    layout="responsive"
                    src={item.imageSrc}
                    alt={item.title}
                    objectFit="contain"
                  />
                </div>
                <h3 className="text-lg mb-4">{`${item.id}. ${item.title}`}</h3>
                <p className="text-sm text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <Container>
        <div className="py-12 sm:py-24">
          <h2 className="text-2xl text-center">Beneficios de los préstamos personales Maxilana</h2>
          <div className="mt-12 grid gap-6 sm:gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => (
              <div key={item.id} className="p-2">
                <div className="w-[70px] h-[70px] relative mb-4">
                  <Image
                    width={70}
                    height={70}
                    layout="responsive"
                    src={item.imageSrc}
                    alt={item.title}
                    objectFit="contain"
                  />
                </div>
                <h3 className="text-lg mb-4">{item.title}</h3>
                <p className="text-sm text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <section className="bg-[#79BDFF99]">
        <div className="max-w-7xl mx-auto px-4 pt-12">
          <div className="sm:flex flex-row-reverse items-center">
            <div className="mb-4 max-w-[700px]">
              <VStack>
                <h2 className="text-2xl mb-4">¿Te interesa dar crédito a tus colaboradores?</h2>
                <p>Nosotros tenemos una opción para tí</p>
                <ButtonDropdown
                  size="small"
                  theme="primary"
                  label="Más información"
                  items={page.whatsapps}
                />
              </VStack>
            </div>
            <div className="mr-4 flex-grow">
              <Image
                width={519}
                height={628}
                quality={80}
                layout="responsive"
                objectFit="contain"
                src="/prestamos-credito-empresas.png"
                alt="Hombre cruzado de brazos"
              />
            </div>
          </div>
        </div>
      </section>
      <Container>
        <div className="py-10">
          <HelpSidebar direction="horizontal" questions={page.faqs} />
        </div>
      </Container>
    </Layout>
  );
};

const requisitos = [
  {
    id: 1,
    label: 'IFE o INE Vigente',
    imageSrc: '/svg/icono-ine.svg',
  },
  {
    id: 2,
    label: 'Comprobante de ingresos (último mes)',
    imageSrc: '/svg/icono-voucher.svg',
  },
  {
    id: 3,
    label: 'Comprobante de domicilio reciente (no más de 3 meses)',
    imageSrc: '/svg/icono-comprobante-domicilio.svg',
  },
  {
    id: 4,
    label: '2 referencias personales y familiares',
    imageSrc: '/svg/icono-referencias.svg',
  },
];

const steps = [
  {
    id: 1,
    imageSrc: '/svg/icono-computadora.svg',
    title: 'Simula tu crédito y solicita tu préstamo',
    description: 'Ingresa la información solicitada en el formularío. Empieza ya.',
  },
  {
    id: 2,
    imageSrc: '/svg/icono-telefono.svg',
    title: 'El equipo de Maxilana se comunicará contigo',
    description: 'Espera la llamada, a la brevedad un agente de Maxilana se comunicara contigo.',
  },
  {
    id: 3,
    imageSrc: '/svg/icono-pin-mapa.svg',
    title: 'Acude a tu sucursal más cercana',
    description:
      'Visita una de nuestras sucursales, con todos los requisitos solicitados y en una plazo de 24 horas resolvemos.',
  },
  {
    id: 4,
    imageSrc: '/svg/icono-bolsa-dinero.svg',
    title: 'Te entregamos tu dinero',
    description: 'A partir de ese momento, puedes hacer pagos a capital y reducir tus pagos.',
  },
];

const benefits = [
  {
    id: 1,
    imageSrc: '/svg/icono-bolsa-dinero.svg',
    title: 'Pago a capital',
    description:
      'Abona a capital cuando lo decidas, baja tu deuda y tus pagos parciales. Sin penalización.',
  },
  {
    id: 2,
    imageSrc: '/svg/icono-cronometro.svg',
    title: 'Pago puntual',
    description: 'Al pagar puntualmente tu crédito el último abono se te bonifica.',
  },
  {
    id: 3,
    imageSrc: '/svg/icono-persona.svg',
    title: 'Tasa de interés personalizada',
    description:
      'Si tu primer crédito fue pagado puntual el segundo obtiene un beneficio de una tasa más baja.',
  },
  {
    id: 4,
    imageSrc: '/svg/icono-calculadora.svg',
    title: 'Restructuración de tu crédito',
    description:
      'Tu crédito puede ser reestructurado a la mitad de tiempo estimado (se liquida el préstamo actual y se otorga la diferencia)',
  },
];

export default PrestamosPage;
