import ms from 'ms';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Image from 'next/image';

import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getAllCities from '~/api/getAllCities';
import { CMSContent } from '~/components/common';
import { Layout } from '~/components/layout';
import { City, CMSLegal } from '~/types/Models';
import { CardLink } from '~/components/ui';
import getJobsPage from '~/api/cms/getJobsPage';
import { CMSJobsPage } from '~/types/Models/CMSJobsPage';
import getCMSImageURL from '~/utils/getCMSImageURL';

interface GSProps {
  page: CMSJobsPage;
  cities: City[];
  legalPages: CMSLegal[];
}

export const getStaticProps: GetStaticProps<GSProps> = async () => {
  const [cities, legalPages, page] = await Promise.all([
    getAllCities(),
    getAllLegalPages(),
    getJobsPage(),
  ]);

  return {
    props: {
      page,
      cities,
      legalPages,
    },
    revalidate: ms(process.env.DEFAULT_REVALIDATE || '10m') / 1000,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const JobsPage: NextPage<Props> = ({ page, cities, legalPages }) => {
  const jobsPlatforms = page.jobsPlatform;

  return (
    <Layout meta={page.seo} cities={cities} legalPages={legalPages}>
      <main className="container mx-auto p-4 my-12 grid gap-8 lg:grid-cols-3">
        <div>
          <h1 className="h4 mb-4">{page?.title}</h1>
          <CMSContent content={page?.description} className="prose text-secondary" />
        </div>
        <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
          {jobsPlatforms?.map?.((item) => (
            <a key={item.id} target="_blank" href={item.link} rel="noreferrer noopener">
              <CardLink
                isExternal
                label={item.name}
                leftIcon={
                  <Image
                    priority
                    width={56}
                    height={56}
                    layout="fixed"
                    src={getCMSImageURL(item.logo)}
                    alt={`Logo de ${item.name}`}
                  />
                }
              />
            </a>
          ))}
        </div>
      </main>
    </Layout>
  );
};
export default JobsPage;
