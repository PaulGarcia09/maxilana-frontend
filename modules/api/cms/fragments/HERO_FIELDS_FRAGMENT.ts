import gql from 'graphql-tag';

const HERO_FIELDS_FRAGMENT = gql`
  fragment HeroFields on ComponentSectionsHero {
    id
    mainText
    secondaryText
    image {
      ...ImageFields
    }
    actions {
      id
      text
      url
    }
  }
`;

export default HERO_FIELDS_FRAGMENT;
