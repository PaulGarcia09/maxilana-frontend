import { City } from '~/types/Models';

export type PropsWithCities<T = any> = T & {
  cities: City[];
};
