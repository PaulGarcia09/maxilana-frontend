import gql from 'graphql-tag';
import graphqlFetcher from '~/api/graphqlFetcher';
import { CMSCarPawn } from '~/types/Models';

const getCarPawnPage = async () => {
  const response = await graphqlFetcher<{ page: CMSCarPawn }>(gql`
    query CarPawnPage {
      page: carPawn {
        seo {
          ...SeoFields
        }
        video
        faqs {
          id
          question
          section {
            slug
          }
        }
        hero {
          ...HeroFields
        }
      }
    }
  `);

  return response?.page;
};

export default getCarPawnPage;
