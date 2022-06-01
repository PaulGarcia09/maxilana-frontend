import gql from 'graphql-tag';
import { IMAGE_FIELDS_FRAGMENT, SEO_FIELDS_FRAGMENT } from '~/api/cms/fragments';
import graphqlFetcher from '~/api/graphqlFetcher';
import { CMSPayment } from '~/types/Models';

const getPaymentBySlug = async (slug: string): Promise<CMSPayment> => {
  const response = await graphqlFetcher<{ payment: CMSPayment }>(
    gql`
      ${IMAGE_FIELDS_FRAGMENT}
      ${SEO_FIELDS_FRAGMENT}
      query Payment($slug: String!) {
        payment: payBySlug(slug: $slug) {
          id
          title
          description
          type
          faqs {
            id
            question
            section {
              slug
            }
          }
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
  return response?.payment;
};

export default getPaymentBySlug;
