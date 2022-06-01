import gql from 'graphql-tag';
import graphqlFetcher from '~/api/graphqlFetcher';
import { CMSPayment } from '~/types/Models';

const getPaymentsList = async () => {
  const response = await graphqlFetcher<{ pays: CMSPayment[] }>(gql`
    query PaymentsList {
      pays {
        id
        title
        description
        slug
        CTAText
        type
        image {
          ...ImageFields
        }
      }
    }
  `);
  return response?.pays;
};

export default getPaymentsList;
