import { AxiosResponse } from 'axios';

import axios from './axios';

const handleResponse = (response: AxiosResponse) => {
  return response;
};

function fetcher(endpoint: string) {
  return axios.get(endpoint).then(handleResponse);
}

export default fetcher;
