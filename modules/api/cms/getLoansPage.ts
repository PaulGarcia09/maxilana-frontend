import gql from 'graphql-tag';
import graphqlFetcher from '~/api/graphqlFetcher';
import { CMSLoans } from '~/types/Models/CMSLoans';

const getLoansPage = async (): Promise<CMSLoans> => {
  const response = await graphqlFetcher<{ page: CMSLoans }>(gql`
    query LoanPage {
      page: loan {
        seo {
          ...SeoFields
        }
        whatsapps {
          id
          name
          number
        }
        hero {
          ...HeroFields
        }
        bank {
          bankName
          number
          clabe
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
        faqs {
          id
          question
          section {
            slug
          }
        }
      }
    }
  `);
  return response?.page;
};

export default getLoansPage;
