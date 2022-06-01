import gql from 'graphql-tag';
import graphqlFetcher from '~/api/graphqlFetcher';
import { CMSPaybill } from '~/types/Models/CMSPaybill';

const getPaybillsPage = async (): Promise<CMSPaybill> => {
  const response = await graphqlFetcher<{ paybill: CMSPaybill }>(gql`
    query PaybillsPage {
      paybill {
        hero {
          ...HeroFields
        }
        seo {
          ...SeoFields
        }
        bankAccount {
          bankName
          number
          clabe
        }
        whatsapps {
          name
          number
        }
        faqs {
          id
          question
          section {
            slug
          }
        }
        payment {
          title
          description
          CTAText
          slug
          image {
            ...ImageFields
          }
        }
      }
    }
  `);
  return response?.paybill;
};

export default getPaybillsPage;
