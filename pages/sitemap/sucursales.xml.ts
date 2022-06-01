import { GetServerSideProps } from 'next';
import getAllBranches from '~/api/getAllBranches';
import { Branch, CityWithBranches } from '~/types/Models';

const generateBranches = (branches: Branch[]) => {
  return branches
    .map(
      (branch) => `
   <url>
    <loc>https://www.maxilana.com/sucursales/${branch?.slug}</loc>
   </url>
 `,
    )
    .join('');
};

const generateSiteMap = (cityBranches: CityWithBranches[]): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://www.maxilana.com/sucursales</loc>
     </url>
     ${cityBranches
       .map(
         (city) => `
       <url>
        <loc>https://www.maxilana.com/sucursales/ciudad/${city?.slug}</loc>
       </url>
       ${generateBranches(city?.branches)}
     `,
       )
       .join('')}
   </urlset>
 `;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const cityBranches = await getAllBranches();
  const sitemap = generateSiteMap(cityBranches);

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
