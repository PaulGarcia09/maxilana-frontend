import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '~/components/ui';
import { Container, Layout } from '~/components/layout';
import { DefaultPageProps } from '~/types/DefaultPageProps';

export { default as getStaticProps } from '~/utils/defaultGetStaticProps';

import HeroImg from '../public/empresa-vision.jpg';
import Empeno from '../public/empresa-servicio-empeno.png';
import Prestamos from '../public/empresa-servicio-prestamos.png';
import Remates from '../public/empresa-servicio-remates.png';
import Vales from '../public/empresa-servicio-vales.png';
import Trabajo from '../public/empresa-bolsa-trabajo.png';

const CompanyPage: NextPage<DefaultPageProps> = ({ cities, legalPages }) => {
  return (
    <Layout cities={cities} title="Nuestra Empresa" legalPages={legalPages}>
      <section>
        <div className="grid bg-action-primary items-center lg:grid-cols-2">
          <div className="lg:order-2">
            <div className="relative">
              <Image
                priority
                width={958}
                height={473}
                layout="responsive"
                src={HeroImg}
                placeholder="blur"
                alt="Foto de personas viendo al horizonte"
              />
            </div>
          </div>
          <div>
            <div className="max-w-2xl mx-auto space-y-4 p-8">
              <h1 className="text-base text-accent uppercase">Nuestra Misión</h1>
              <h2 className="text-2xl text-white">Es ayudar a las personas a salir del apuro</h2>
            </div>
          </div>
        </div>
      </section>
      <Container>
        <div className="max-w-2xl mx-auto my-12 sm:my-24">
          <h1 className="text-base text-brand uppercase text-center mb-6">
            No queremos dejarte solo
          </h1>
          <h2 className="text-lg">
            Otorgamos apoyo a personas con la necesidad de un préstamo al instante mediante el
            servicio de empeño, ofreciendo un trato amable, justo y de confianza en el resguardo de
            su prenda.
          </h2>
          <hr className="my-6" />
          <p className="text-secondary">
            Maxilana es una empresa fundada el 14 de septiembre de 1992, iniciando operaciones en la
            ciudad de Culiacán, Sinaloa, bajo el nombre comercial de Casa de Empeño Culiacán, siendo
            así, pionera en la ciudad en el servicio de préstamos prendarios.
          </p>
        </div>
      </Container>
      <section className="my-12 bg-accent sm:my-24">
        <div className="max-w-2xl mx-auto px-4 py-12 sm:py-24">
          <h1 className="text-base text-brand uppercase text-center mb-6">Nuestra Visión</h1>
          <h2 className="text-lg text-center sm:text-2xl">
            Es ofrecer la más confiable y mejor experiencia omnicanal de préstamos y remates
          </h2>
        </div>
      </section>
      <Container>
        <div className="my-12 grid gap-6 items-center sm:my-24 sm:grid-cols-2">
          <div className="space-y-6 sm:order-2">
            <h1 className="text-base text-brand uppercase">
              <Link href="/empenos">
                <a>Empeños</a>
              </Link>
            </h1>
            <h2 className="text-2xl">Recibe más por tus artículos y sal del apuro</h2>
            <p className="text-lg text-primary">
              Las mejores tasas, promociones todo el año, pagos cómodos en cualquier sucursal y en
              línea.
            </p>
          </div>
          <div className="sm:order-1">
            <div>
              <Image
                src={Empeno}
                width={628}
                height={469}
                layout="responsive"
                placeholder="blur"
                alt="Hombre con artículos para empeñar"
              />
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="my-12 grid gap-6 items-center sm:my-24 sm:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-base text-brand uppercase">
              <Link href="/remates">
                <a>Remates</a>
              </Link>
            </h1>
            <h2 className="text-2xl">Navega entre miles de remates de oportunidad</h2>
            <p className="text-lg text-primary">
              Como joyas, relojes, instrumentos musicales, carros, laptops y más.
            </p>
          </div>
          <div>
            <div>
              <Image
                src={Remates}
                width={628}
                height={422}
                quality={80}
                layout="responsive"
                placeholder="blur"
                alt="Imagen de tarjetas de productos de remate en Maxilana"
              />
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="my-12 grid gap-6 items-center sm:my-24 sm:grid-cols-2">
          <div className="space-y-6 sm:order-2">
            <h1 className="text-base text-brand uppercase">
              <Link href="/vales">
                <a>Maxilana Vales</a>
              </Link>
            </h1>
            <h2 className="text-2xl">Conviértete en distribuidora</h2>
            <p className="text-lg text-primary">Empieza a ganar dinero extra en tu tiempo libre.</p>
          </div>
          <div className="sm:order-1">
            <div>
              <Image
                width={628}
                height={422}
                quality={80}
                layout="responsive"
                objectFit="contain"
                src={Vales}
                placeholder="blur"
                alt="Mujer con expresión feliz por su dinero en mano"
              />
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="my-12 grid gap-6 items-center sm:my-24 sm:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-base text-brand uppercase">
              <Link href="/prestamos-personales">
                <a>Préstamos Personales</a>
              </Link>
            </h1>
            <h2 className="text-2xl">Te prestamos para lo que necesites</h2>
            <p className="text-lg text-primary">
              Desde $1,000 hasta $20,000 para que resuelvas tus imprevistos fácil y rápido.
            </p>
          </div>
          <div>
            <div>
              <Image
                src={Prestamos}
                width={628}
                height={422}
                quality={80}
                layout="responsive"
                placeholder="blur"
                alt="Imagen de hombre buscando dinero en su cartera"
              />
            </div>
          </div>
        </div>
      </Container>
      <section className="bg-[#79BDFF99]">
        <div className="max-w-7xl mx-auto px-4 pt-12">
          <div className="lg:flex flex-row-reverse items-center">
            <div className="mb-4 max-w-[700px]">
              <div className="space-y-6">
                <h1 className="text-3xl">Forma parte del equipo de Maxilana</h1>
                <p className="text-lg">
                  Uno de nuestros propósitos es ser una empresa donde los colaboradores logren un
                  desarrollo personal y profesional.
                </p>
                <Button theme="primary" text="Buscar empleo" href="/empleos" />
              </div>
            </div>
            <div className="mr-4 flex-grow">
              <div className="relative">
                <Image
                  width={518}
                  height={573}
                  quality={80}
                  layout="responsive"
                  objectFit="contain"
                  src={Trabajo}
                  placeholder="blur"
                  alt="Imagen de joven con playera de Maxilana"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Container>
        <div className="my-12 sm:my-24">
          <div className="space-y-6 sm:max-w-4xl">
            <h1 className="text-base text-brand uppercase">Empresa Socialmente Responsable</h1>
            <h2 className="text-lg sm:text-2xl">
              Somos una organización que mantiene un compromiso social, intelectual y económico a
              Asociaciones Pro-Personas con capacidades diferentes.
            </h2>
          </div>
          <div className="my-12 sm:my-28">
            <div className="grid gap-6 sm:grid-cols-3">
              {organizations.map((item) => (
                <div key={item.id}>
                  <div className="relative max-w-[120px] min-h-[60px] max-h-[60px] text-left">
                    <Image
                      layout="fill"
                      src={item.imgSrc}
                      alt={`Logotipo de ${item.title}`}
                      objectFit="contain"
                      objectPosition="left"
                    />
                  </div>
                  <h3 className="text-lg mb-2">{item.title}</h3>
                  <p className="text-secondary text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="my-12 mx-auto max-w-5xl rounded overflow-hidden sm:my-24">
          <Image src="/imagen-inegi.jpg" width={956} height={372} alt="Imagen INEGI" />
        </div>
      </Container>
    </Layout>
  );
};

const organizations = [
  {
    id: 1,
    title: 'APAC Culiacán',
    text: 'La empresa estableció el apoyo económico a la Asociación de Personas con Parálisis Cerebral (APAC)',
    imgSrc: '/logo-apac-culiacan.png',
  },
  {
    id: 2,
    title: 'APAC Sonora',
    text: 'Queremos estar siempre cerca de nuestros objetivos, ya que todos juntos nos ayudan a que las personas con parálisis cerebral',
    imgSrc: '/logo-apac-sonora.png',
  },
  {
    id: 3,
    title: 'CIRIAC',
    text: 'El Centro Integral de Rehabilitación Infantil A.C mejorará la calidad de vida de personas con parálisis cerebral, durante sus más de veinte años de servicio.',
    imgSrc: '/logo-ciriac.png',
  },
  {
    id: 4,
    title: 'Casa Down',
    text: 'Nuestra institución surge para ofrecer a las personas con síndrome de Down programas y proyectos educativos que promuevan su desarrollo.',
    imgSrc: '/logo-casa-down-mazatlan.png',
  },
  {
    id: 5,
    title: 'Pasitos',
    text: 'Nos dedicamos a atender a niños con autismo y otros trastornos afines con el objetivo de lograr su integración a la sociedad y mejorar su calidad de vida.',
    imgSrc: '/logo-centro-pedagogico-pasitos.png',
  },
  {
    id: 6,
    title: 'Vifac',
    text: 'Nos dedicamos a atender a niños con autismo y otros trastornos afines con el objetivo de lograr su integración a la sociedad y mejorar su calidad de vida.',
    imgSrc: '/logo-vifac.png',
  },
];

export default CompanyPage;
