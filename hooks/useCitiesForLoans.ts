import useSWR from 'swr';
import fetcher from '~/api/fetcher';
import slugify from '~/utils/slugify';
import { GetCitiesForLoans } from '~/types/Responses/GetCitiesForLoans';
import { City } from '~/types/Models';

interface Data {
  error: Error;
  cities?: City[];
  isLoading: boolean;
}

const useCitiesForLoans = (): Data => {
  const { data, error } = useSWR<GetCitiesForLoans>('/servicios/pp/getplazas', {
    fetcher: fetcher,
    revalidateOnFocus: false,
  });

  return {
    error,
    cities: data?.map((item) => ({
      id: item.CodigoPlaza,
      code: item.CodigoPlaza,
      name: item.Plaza,
      slug: slugify(item.Plaza),
    })),
    isLoading: data === undefined,
  };
};

export default useCitiesForLoans;
