import { normalizeBranch } from '~/api/normalizers';
import { Branch } from '~/types/Models';
import { Sucursal } from '~/types/Responses';

import axios from './axios';

const getBranch = async (idOrSlug: string | number): Promise<Branch> => {
  const sucursal = await axios.get<Sucursal>(`/sucursal/${idOrSlug}`);

  return normalizeBranch(sucursal);
};

export default getBranch;
