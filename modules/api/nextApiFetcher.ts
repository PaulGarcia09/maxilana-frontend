import handleFetchResponse from '../lib/handleFetchResponse';

type Params = {
  endpoint: string;
  body?: BodyInit;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
};

type Fetcher = (data: Params) => Promise<any>;

const headers = {
  'Content-Type': 'application/json',
};

const NextAPIMutator: Fetcher = async ({ endpoint, method, body = null }) => {
  const url = endpoint;

  return handleFetchResponse(
    await fetch(url, {
      method,
      headers,
      body,
    }),
  );
};

const NextAPIFetcher: Fetcher = async ({ endpoint, method = 'GET' }) => {
  const url = endpoint;

  return handleFetchResponse(
    await fetch(url, {
      method,
      headers,
    }),
  );
};

export { NextAPIMutator };
export default NextAPIFetcher;
