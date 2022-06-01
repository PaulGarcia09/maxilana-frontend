import { GetServerSideProps } from 'next';
import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getPaymentsList from '~/api/cms/getPayments';
import { CMSLegal, CMSPayment } from '~/types/Models';

interface GenerateSiteMapOptions {
  legalPages: CMSLegal[];
  payments: CMSPayment[];
}

const generatePayments = (payments: CMSPayment[]) =>
  payments
    .map(
      (payment) => `
        <url>
          <loc>https://www.maxilana.com/pagos/${payment.slug}</loc>
         </url>
     `,
    )
    .join('');

const generateLegalPages = (legalPages: CMSLegal[]) =>
  legalPages
    .map(
      (page) => `
       <url>
        <loc>https://www.maxilana.com/legal/${page.slug}</loc>
       </url>
     `,
    )
    .join('');

const generateSiteMap = ({ legalPages, payments }: GenerateSiteMapOptions): string => {
  // language=XML
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!--We manually set the two URLs we know already-->
    <url>
      <loc>https://www.maxilana.com</loc>
    </url>
    <url>
      <loc>https://www.maxilana.com/empresa</loc>
    </url>
    <url>
      <loc>https://www.maxilana.com/contacto</loc>
    </url>
    <url>
      <loc>https://www.maxilana.com/otros-servicios</loc>
    </url>
    <url>
      <loc>https://www.maxilana.com/preguntas-frecuentes</loc>
    </url>
    <url>
      <loc>https://www.maxilana.com/remates</loc>
    </url>
    <url>
      <loc>https://www.maxilana.com/busqueda</loc>
    </url>
    <url>
      <loc>https://www.maxilana.com/empeno</loc>
    </url>
    <url>
      <loc>https://www.maxilana.com/empeno/auto</loc>
    </url>
    <url>
      <loc>https://www.maxilana.com/prestamos-personales</loc>
    </url>
    <url>
      <loc>https://www.maxilana.com/vales</loc>
    </url>
    <url>
      <loc>https://www.maxilana.com/sucursales</loc>
    </url>
    <url>
      <loc>https://www.maxilana.com/pagos</loc>
    </url>
    ${generatePayments(payments)}
    ${generateLegalPages(legalPages)}
  </urlset>
  `;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (!process.env.NEXT_PUBLIC_DEFAULT_PAGE_LIMIT) {
    throw Error('Environment variable NEXT_PUBLIC_DEFAULT_PAGE_LIMIT does not exists.');
  }
  const [legalPages, payments] = await Promise.all([getAllLegalPages(), getPaymentsList()]);
  const sitemap = generateSiteMap({ legalPages, payments });

  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

const SiteMap = () => {};

export default SiteMap;
