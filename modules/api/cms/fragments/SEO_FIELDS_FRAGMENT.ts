import gql from 'graphql-tag';

const SEO_FIELDS_FRAGMENT = gql`
  fragment SeoFields on ComponentSharedSeo {
    description
    title
    keywords
    shareImage {
      ...ImageFields
    }
  }
`;

export default SEO_FIELDS_FRAGMENT;
