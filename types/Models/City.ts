import { Branch } from './Branch';

export interface City {
  id: number;
  slug: string;
  name: string;
  state?: string;
  active?: boolean;
  code?: number;
}

export interface CityWithBranches extends City {
  branches: Branch[];
}
