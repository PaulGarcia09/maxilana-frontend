import { GetServerSideProps } from 'next';
import getProducts from '~/api/getProducts';

const generateSiteMap = (pages: number): string => {
  // language=XML
  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>https://www.maxilana.com/sitemap/base.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://www.maxilana.com/sitemap/sucursales.xml</loc>
    </sitemap>
    ${new Array(pages)
      .fill('')
      .map(
        (_, index) => `
    <sitemap>
      <loc>https://www.maxilana.com/sitemap/productos/${index + 1}.xml</loc>
    </sitemap>
    `,
      )
      .join('')}
  </sitemapindex>
  `;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { pages } = await getProducts({ limit: '100' });
  const sitemap = generateSiteMap(pages);

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
