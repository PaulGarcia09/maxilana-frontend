import { City, CMSLegal, User } from '~/types/Models';

export type AuthPageProps<T = any> = T & {
  user: User;
  cities: City[];
  legalPages: CMSLegal[];
};
