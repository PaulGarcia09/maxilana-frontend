import { normalizeCity } from '~/api/normalizers';
import { City } from '~/types/Models';
import { GetCities } from '~/types/Responses';
import axios from './axios';

const getAllCities = async (): Promise<City[]> => {
  const response = await axios.get<GetCities>('/ciudades');

  return response.map(normalizeCity);
};

export default getAllCities;
