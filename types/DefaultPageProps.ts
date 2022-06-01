import { City, CMSLegal } from '~/types/Models';

export type DefaultPageProps<T = any> = T & {
  cities: City[];
  legalPages: CMSLegal[];
  css?: string[];
};
