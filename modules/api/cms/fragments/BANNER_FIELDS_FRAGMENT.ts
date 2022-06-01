import gql from 'graphql-tag';

const BANNER_FIELDS_FRAGMENT = gql`
  fragment BannerFields on Banner {
    id
    title
    image {
      ...ImageFields
    }
    type
    link
    products_page_mkts {
      id
      slug
    }
  }
`;

export default BANNER_FIELDS_FRAGMENT;
