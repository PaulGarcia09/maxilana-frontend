import { normalizeBranch } from '~/api/normalizers';
import { Branch } from '~/types/Models';
import { Sucursal } from '~/types/Responses';
import axios from './axios';

const getCityBranchesBySlug = async (slug: string): Promise<Branch[]> => {
  const response = await axios.get<Sucursal[]>(`/sucursales?ciudad=${slug}`);
  return response.map(normalizeBranch);
};

export default getCityBranchesBySlug;
