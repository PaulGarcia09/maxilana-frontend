import Axios, { AxiosInstance } from 'axios';

if (!process.env.NEXT_PUBLIC_API_BASEURL) {
  throw Error('Environment variable NEXT_PUBLIC_CMS_API_BASEURL is missing.');
}

if (!process.env.NEXT_PUBLIC_CMS_API_BASEURL) {
  throw Error('Environment variable NEXT_PUBLIC_CMS_API_BASEURL is missing.');
}

const createInstance = (baseURL: string): AxiosInstance => {
  const axios = Axios.create({ baseURL });

  axios.interceptors.response.use(
    (response) => Promise.resolve(response.data),
    (error) => Promise.reject(error),
  );
  return axios;
};

// Instancia de axios que se conecta al CMS hecho en Strapi
export const cmsAxios = createInstance(process.env.NEXT_PUBLIC_CMS_API_BASEURL);

// instancia de axios que se conecta al API de Maxilana
export const maxAxios = createInstance(process.env.NEXT_PUBLIC_API_BASEURL);

export default maxAxios;
