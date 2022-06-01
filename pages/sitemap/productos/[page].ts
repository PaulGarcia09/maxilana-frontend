import { GetServerSideProps } from 'next';
import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getPaymentsList from '~/api/cms/getPayments';
import getProducts from '~/api/getProducts';
import { CMSLegal, CMSPayment } from '~/types/Models';
import { Product } from '~/types/Models/Product';
import slugify from '~/utils/slugify';

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

const generateSiteMap = (products: Product[]): string => {
  // language=XML
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${products
      .map(
        (product) => `
    <url>
      <loc>https://www.maxilana.com/producto/${product?.id}-${slugify(product?.name)}</loc>
    </url>
    `,
      )
      .join('')}
  </urlset>
  `;
};

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  if (typeof query?.page === 'string' && !query?.page?.includes?.('.xml')) {
    return { notFound: true };
  }
  const { rows: products } = await getProducts({
    limit: '100',
    page: `${query?.page}`.replace?.('.xml', ''),
  });
  const sitemap = generateSiteMap(products);

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
