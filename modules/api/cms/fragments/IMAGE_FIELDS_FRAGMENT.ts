import gql from 'graphql-tag';

const IMAGE_FIELDS_FRAGMENT = gql`
  fragment ImageFields on UploadFile {
    id
    alternativeText
    url
    hash
    ext
    width
    height
    provider
  }
`;

export default IMAGE_FIELDS_FRAGMENT;
