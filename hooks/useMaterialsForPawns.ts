import useSWR from 'swr';
import fetcher from '~/modules/api/fetcher';
import { GetMaterialsForPawns } from '~/types/Responses';
import slugify from '~/utils/slugify';

interface JewelryWeight {
  id: number;
  label: string;
}

interface JewelryMaterial {
  slug: string;
  name: string;
  weights: JewelryWeight[];
}

interface Data {
  error?: Error;
  data?: JewelryMaterial[];
  isLoading: boolean;
}

const useMaterialsFormPawns = (): Data => {
  const { data, error, isValidating } = useSWR<GetMaterialsForPawns>(
    '/calculadoraempeno/kilatajes',
    {
      fetcher: fetcher,
      revalidateOnFocus: false,
    },
  );

  return {
    error,
    data: data?.map((item) => ({
      slug: slugify(item.DescripcionMetal),
      name: item.DescripcionMetal,
      weights: item.Kilataje.map((element) => ({
        id: element.CodigoKilataje,
        label: element.DescripcionKilataje,
      })),
    })),
    isLoading: data === undefined || isValidating,
  };
};

export default useMaterialsFormPawns;
