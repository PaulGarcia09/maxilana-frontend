import useSWR from 'swr';
import fetcher from '~/modules/api/fetcher';

interface BrandWatch {
  CodigoMarca: number;
  DescripcionMarca: string;
}

interface Brand {
  id: number;
  label: string;
}

interface Data {
  error?: Error;
  isLoading: boolean;
  data?: Brand[];
}

const useBrandWatchesForPawns = (): Data => {
  const { data, error, isValidating } = useSWR<BrandWatch[]>('/calculadoraempeno/marcas', {
    fetcher,
    revalidateOnFocus: false,
  });

  return {
    error,
    data: data?.map((item) => ({
      id: item.CodigoMarca,
      label: item.DescripcionMarca,
    })),
    isLoading: data === undefined || isValidating,
  };
};

export default useBrandWatchesForPawns;
