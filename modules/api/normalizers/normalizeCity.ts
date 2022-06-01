import { City } from '~/types/Models';
import { Ciudad } from '~/types/Responses';

export default function normalizeCity(ciudad: Ciudad): City {
  return {
    id: ciudad?.id,
    slug: ciudad?.slug,
    code: ciudad?.codigoplaza,
    name: ciudad?.nombre,
    state: ciudad?.estado,
    active: Boolean(ciudad?.activo),
  };
}
