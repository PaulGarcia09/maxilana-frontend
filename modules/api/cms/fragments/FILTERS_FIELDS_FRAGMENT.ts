import gql from 'graphql-tag';

const FILTERS_FIELDS_FRAGMENT = gql`
  fragment FilterFields on ComponentSharedFiltros {
    id
    categories {
      id
      itemID
    }
    products {
      id
      itemID
    }
    search
    city
    order
    quantity
  }
`;

export default FILTERS_FIELDS_FRAGMENT;
