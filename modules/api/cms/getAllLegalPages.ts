import gql from 'graphql-tag';
import graphqlFetcher from '~/api/graphqlFetcher';
import { CMSLegal } from '~/types/Models';

const getAllLegalPages = async (): Promise<Array<CMSLegal>> => {
  const response = await graphqlFetcher<{ legals: Array<CMSLegal> }>(
    gql`
      query LegalSlugs {
        legals {
          id
          title
          slug
        }
      }
    `,
  );
  return response?.legals;
};

export default getAllLegalPages;
