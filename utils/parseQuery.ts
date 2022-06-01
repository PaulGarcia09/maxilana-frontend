import { ParsedUrlQuery } from 'querystring';

const parseQuery = (query: ParsedUrlQuery) => {
  return Object.keys(query)
    .map((param) => `${param}=${encodeURIComponent(query[param] as string)}`, '')
    .join('&');
};

export default parseQuery;
