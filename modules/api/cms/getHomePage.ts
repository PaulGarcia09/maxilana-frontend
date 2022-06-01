import gql from 'graphql-tag';
import graphqlFetcher from '~/api/graphqlFetcher';
import { CMSHomePage } from '~/types/Models/CMSHomePage';

const getHomePage = async () => {
  const response = await graphqlFetcher<{ homepage: Partial<CMSHomePage> }>(gql`
    query HomePage {
      homepage {
        seo {
          ...SeoFields
        }
        hero {
          ...HeroFields
        }
        directAccess {
          id
          title
          description
          image {
            ...ImageFields
          }
          link {
            text
            url
          }
        }
        categories {
          ...CategoryFields
        }
        productFilters {
          ...FilterFields
        }
      }
    }
  `);

  return response?.homepage;
};

export default getHomePage;
