import gql from 'graphql-tag';
import graphqlFetcher from '~/api/graphqlFetcher';
import { CMSSection } from '~/types/Models/CMSSection';

const getCMSSections = async (): Promise<Array<Partial<CMSSection>>> => {
  const response = await graphqlFetcher<{ sections: Array<Partial<CMSSection>> }>(gql`
    query AllSections {
      sections {
        id
        slug
        name
      }
    }
  `);
  return response?.sections;
};

export default getCMSSections;
