import gql from 'graphql-tag';
import graphqlFetcher from '~/api/graphqlFetcher';

const getCMSSections = async (): Promise<string[]> => {
  const response = await graphqlFetcher<{ sections: Array<{ slug: string }> }>(gql`
    query SectionsSlugs {
      sections {
        slug
      }
    }
  `);
  return response?.sections?.map?.((section) => section?.slug);
};

export default getCMSSections;
