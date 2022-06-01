import gql from 'graphql-tag';
import graphqlFetcher from '../graphqlFetcher';
import { CMSJobsPage } from '~/types/Models/CMSJobsPage';

const getJobsPage = async (): Promise<CMSJobsPage> => {
  const response = await graphqlFetcher<{ page: CMSJobsPage }>(gql`
    query JobsPlatformPage {
      page: vacancy {
        title
        description
        seo {
          ...SeoFields
        }
        jobsPlatform {
          id
          name
          link
          logo {
            ...ImageFields
          }
        }
      }
    }
  `);

  return response?.page;
};

export default getJobsPage;
