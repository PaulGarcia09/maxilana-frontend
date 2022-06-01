import gql from 'graphql-tag';
import graphqlFetcher from '~/api/graphqlFetcher';
import { CMSPawn } from '~/types/Models';

const getPawnPage = async () => {
  const response = await graphqlFetcher<{ page: CMSPawn }>(gql`
    query PawnPage {
      page: pawn {
        seo {
          ...SeoFields
        }
        linkVideo
        faqs {
          id
          question
          section {
            slug
          }
        }
        payment {
          id
          title
          description
          slug
          CTAText
          image {
            ...ImageFields
          }
        }
        hero {
          ...HeroFields
        }
        bankAccount {
          bankName
          number
          clabe
        }
        whatsapp {
          id
          name
          number
          cityCode
        }
        categories {
          id
          name
          code
          formType
          image {
            ...ImageFields
          }
          subcategories {
            id
            name
            code
            image {
              ...ImageFields
            }
          }
        }
      }
    }
  `);

  return response?.page;
};

export default getPawnPage;
