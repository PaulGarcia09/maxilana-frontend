import { normalizeBranch } from '~/api/normalizers';
import { Branch, City, CityWithBranches } from '~/types/Models';
import { GetSucursales } from '~/types/Responses';

import axios from './axios';

const getAllBranches = async (): Promise<CityWithBranches[]> => {
  const response = await axios.get<GetSucursales>('/sucursales');
  return response.map((city) => ({
    id: city?.id,
    slug: city?.slug,
    name: city?.ciudad,
    branches: city?.sucursales.map(normalizeBranch),
  }));
};

export default getAllBranches;
