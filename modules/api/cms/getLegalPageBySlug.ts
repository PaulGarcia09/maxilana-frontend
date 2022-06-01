import gql from 'graphql-tag';
import graphqlFetcher from '~/api/graphqlFetcher';
import { CMSLegal } from '~/types/Models';

const getLegalPageBySlug = async (slug: string): Promise<CMSLegal> => {
  const response = await graphqlFetcher<{ page: CMSLegal }>(
    gql`
      query LegalPageBySlug($slug: String!) {
        page: legalBySlug(slug: $slug) {
          id
          title
          content
          slug
          seo {
            ...SeoFields
          }
        }
      }
    `,
    {
      variables: { slug },
    },
  );
  return response?.page;
};

export default getLegalPageBySlug;
