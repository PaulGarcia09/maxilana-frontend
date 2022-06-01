import gql from 'graphql-tag';
import graphqlFetcher from '~/api/graphqlFetcher';
import { CMSSection } from '~/types/Models/CMSSection';

const getCMSSectionBySlug = async (slug: string): Promise<CMSSection> => {
  const query = gql`
    query Section($slug: String!) {
      sectionBySlug(slug: $slug) {
        id
        slug
        name
        seo {
          ...SeoFields
        }
        faqs {
          id
          question
          answer
        }
      }
    }
  `;
  const response = await graphqlFetcher<{ sectionBySlug: CMSSection }>(query, {
    variables: { slug },
  });
  return response?.sectionBySlug;
};

export default getCMSSectionBySlug;
