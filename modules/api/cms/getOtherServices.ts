import gql from 'graphql-tag';
import graphqlFetcher from '~/api/graphqlFetcher';
import { CMSOtherService } from '~/types/Models';

const getOtherServices = async (): Promise<Array<CMSOtherService>> => {
  const response = await graphqlFetcher<{ otherServices: CMSOtherService[] }>(gql`
    query OtherServicesPage {
      otherServices {
        id
        title
        description
        image {
          alternativeText
          url
        }
      }
    }
  `);
  return response.otherServices;
};

export default getOtherServices;
