import gql from 'graphql-tag';
import graphqlFetcher from '~/api/graphqlFetcher';
import { CMSMktPage } from '~/types/Models/CMSMktPage';

export default async function getCMSMktPagesSlugs(): Promise<Array<string>> {
  const query = gql`
    query AllProductsMarketingPages {
      productsPageMkts {
        slug
      }
    }
  `;
  const response = await graphqlFetcher<{ productsPageMkts: Array<Partial<CMSMktPage>> }>(query);
  return response.productsPageMkts?.map?.((item) => `${item?.slug}`);
}
