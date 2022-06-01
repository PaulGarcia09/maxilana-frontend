import ms from 'ms';
import Image from 'next/image';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import React from 'react';
import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getCarPawnPage from '~/api/cms/getCarPawnPage';
import getAllCities from '~/api/getAllCities';
import { YouTube } from '~/components/common';

import { Button, Img } from '~/components/ui';
import { AutoPawnForm } from '~/components/pawn';
import { Layout, Container, HelpSidebar } from '~/components/layout';
import { DefaultPageProps } from '~/types/DefaultPageProps';
import { CMSCarPawn } from '~/types/Models';
import getCMSImageURL from '~/utils/getCMSImageURL';

export const getStaticProps: GetStaticProps<
  DefaultPageProps<{ page: CMSCarPawn; css?: string[] }>
> = async () => {
  const [page, cities, legalPages] = await Promise.all([
    getCarPawnPage(),
    getAllCities(),
    getAllLegalPages(),
  ]);

  return {
    props: {
      page,
      cities,
      legalPages,
      css: ['/antd/form.css'],
    },
    revalidate: ms(process.env.DEFAULT_REVALIDATE || '10m') / 1000,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const AutoEmpenoPage: NextPage<Props> = ({ cities, legalPages, page }) => {
  return (
    <div>
      <Layout meta={page.seo} cities={cities} legalPages={legalPages}>
        <div className="pt-[108px] bg-gradient-to-r from-[#F7D067] to-[#F1C153]">
          <div className="container mx-auto px-4 py-10 sm:py-20">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative sm:order-1">
                <Img
                  width={628}
                  height={347}
                  layout="responsive"
                  priority
                  src={getCMSImageURL(page.hero?.image)}
                  alt="Imagen de un automóvil"
                  placeholder="empty"
                />
              </div>
              <div>
                <h1 className="text-2xl mb-2 lg:text-4xl">{page?.hero?.mainText}</h1>
                <p className="text-lg mb-4">{page?.hero?.secondaryText}</p>
                {page?.hero?.actions.map((item) => (
                  <Button
                    key={item.id}
                    size="small"
                    theme="secondary"
                    text={item.text}
                    href={item.url}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Container>
          <div className="my-12 max-w-5xl mx-auto sm:my-24">
            <YouTube url={page?.video} />
          </div>
        </Container>
        <Container>
          <div className="py-12 sm:py-24">
            <h2 className="text-2xl text-center">Pasos y requisitos para empeñar tu auto</h2>
            <div className="grid gap-6 mt-16 sm:gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((item, idx) => (
                <div key={item.id} className="p-2">
                  <div className="w-[90px] h-[90px] relative mx-auto mb-6">
                    <Image
                      width={90}
                      height={90}
                      layout="responsive"
                      src={item.imageSrc}
                      alt={item.title}
                      objectFit="contain"
                    />
                  </div>
                  <h3 className="text-lg mb-4">{`${idx + 1}. ${item.title}`}</h3>
                  <div
                    className="text-sm text-secondary prose"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
        <section id="solicitud-avaluo" className="my-12 sm:my-24 sm:px-4">
          <div className="max-w-3xl mx-auto">
            <AutoPawnForm />
          </div>
        </section>
        <Container>
          <div className="pt-6 pb-10">
            <HelpSidebar direction="horizontal" questions={page.faqs} />
          </div>
        </Container>
      </Layout>
    </div>
  );
};

const steps = [
  {
    id: 1,
    imageSrc: '/svg/icono-carro.svg',
    title: 'Lleva tu carro a cualquier sucursal',
    description: `
      <ul>
        <li>Tu vehiculo tiene que tener maximo 10 años de antigüedad.</li>
        <li>Los vehículos importados si se reciben pero deben de contar con placas vigentes y tener maximo 10 años de antigüedad.</li>
      </ul>
    `,
  },
  {
    id: 2,
    imageSrc: '/svg/icono-lupa-outline.svg',
    title: 'Presenta la documentación',
    description: `
      <ul>
        <li>La factura original de tu vehículo.</li>
        <li>Tarjeta de circulación a nombre de quien presenta el vehículo.</li>
        <li>Comprobantes de tenencias o revalidaciones de los últimos 5 años.</li>
        <li>Los nacionalizados deben de contar con la constancia de importación (pedimento).</li>
      </ul>
    `,
  },
  {
    id: 3,
    imageSrc: '/svg/icono-bolsa-dinero.svg',
    title: 'Llévate el dinero que necesites',
    description: `
      <ul>
        <li>Se hara la valuación de tu vehículo, revisión fisica y verificación de los documentos.</li>
        <li>Tendra de 1 a 3 meses de plazo para pagar. Lo puede retirar cuando desee, dentro del plazo señalado, pagando el préstamo e intereses al día del desempeño.</li>
      </ul>
    `,
  },
];

export default AutoEmpenoPage;
