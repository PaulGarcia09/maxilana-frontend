import axios from '~/api/axios';
import getAllBranches from '~/api/getAllBranches';
import { Branch, CityWithBranches } from '~/types/Models';
import slugify from '~/utils/slugify';

const getBranchesSlugs = async (): Promise<Array<string>> => {
  const response = await getAllBranches();
  const branches = response.reduce((r: Branch[], c: CityWithBranches) => {
    return [...r, ...c.branches];
  }, []);
  return branches.map((branch) => branch?.slug || slugify(branch?.name));
};

export default getBranchesSlugs;
