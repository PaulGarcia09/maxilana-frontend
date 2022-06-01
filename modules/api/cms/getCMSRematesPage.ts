import gql from 'graphql-tag';
import { CMSRematesPage } from '~/types/Models/CMSRematesPage';
import graphqlFetcher from '~/api/graphqlFetcher';

/**
 * Obtiene la información para la página de remates del CMS hecho en Strapi
 */
const getCMSRematesPage = async (): Promise<CMSRematesPage> => {
  const response = await graphqlFetcher<{ remate: CMSRematesPage }>(gql`
    query Remates {
      remate {
        id
        seo {
          ...SeoFields
        }
        categories {
          id
          category {
            ...CategoryFields
          }
        }
        banners {
          id
          banner {
            ...BannerFields
          }
        }
      }
    }
  `);
  return response?.remate;
};

export default getCMSRematesPage;
