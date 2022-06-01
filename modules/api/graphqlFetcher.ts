import { DocumentNode } from 'graphql';
import difference from 'lodash.difference';
import uniq from 'lodash.uniq';
import { cmsAxios } from '~/api/axios';
import * as Fragments from './cms/fragments';

interface FetcherOptions {
  variables?: Record<string, number | string | boolean>;
}

type GraphQLFetcher = <R = any>(
  query: string | DocumentNode,
  options?: FetcherOptions,
) => Promise<R>;

const graphqlFetcher: GraphQLFetcher = async (gqlQuery, { variables } = {}) => {
  let query = typeof gqlQuery === 'string' ? gqlQuery : `${gqlQuery?.loc?.source?.body}`;
  const fragments: Record<string, string> = {};
  Object.keys(Fragments).forEach((item) => {
    const body = Fragments[item as keyof typeof Fragments]?.loc?.source?.body;
    const [, fragmentName] = `${body}`.match(/fragment\s([a-zA-Z]+)\son/) || [];
    fragments[`${fragmentName}`] = `${body}`;
  });
  let fragmentsToAdd: string[] = [];
  let usedFragments: string[] = [];
  let newFragments: string[] = [];
  do {
    usedFragments = Array.from(query.matchAll(/\.\.\.([a-zA-Z]+)/g)).map(
      ([, fragmentName]) => fragmentName,
    );
    newFragments = difference(usedFragments, fragmentsToAdd);
    fragmentsToAdd = uniq(newFragments)
      .filter((item: string) => !query.includes(`fragment ${item}`))
      .map((item: string) => fragments[item]);
    query = [...fragmentsToAdd, query].join('\n');
  } while (fragmentsToAdd.length > 0);

  return cmsAxios
    .post('/graphql', {
      query,
      variables,
    })
    .then((response) => response?.data);
};

export default graphqlFetcher;
