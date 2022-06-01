import useSWR from 'swr';
import fetcher from '~/api/fetcher';
import slugify from '~/utils/slugify';
import { City } from '~/types/Models';
import { GetCitiesForPawns } from '~/types/Responses';

interface Data {
  error: Error;
  cities?: City[];
  isLoading: boolean;
}

const useCitiesForPawns = (): Data => {
  const { data, error } = useSWR<GetCitiesForPawns>('/calculadoraempeno/plazas', {
    fetcher: fetcher,
    revalidateOnFocus: false,
  });

  return {
    error,
    cities: data?.map((item) => ({
      id: item.CodigoPlaza,
      code: item.CodigoPlaza,
      name: item.DescripcionPlaza,
      slug: slugify(item.DescripcionPlaza),
    })),
    isLoading: data === undefined,
  };
};

export default useCitiesForPawns;
