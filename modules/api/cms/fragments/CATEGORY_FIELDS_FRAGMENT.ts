import gql from 'graphql-tag';

const CATEGORY_FIELDS_FRAGMENT = gql`
  fragment CategoryFields on Category {
    id
    name
    filters {
      ...FilterFields
    }
    image {
      ...ImageFields
    }
    products_page_mkt {
      id
      slug
    }
  }
`;

export default CATEGORY_FIELDS_FRAGMENT;
