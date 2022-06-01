import { CMSCategory } from '~/types/Models/CMSCategory';
import { CMSContentCard } from '~/types/Models/CMSContentCard';
import { CMSFilters } from '~/types/Models/CMSFilters';
import { CMSHero } from '~/types/Models/CMSHero';
import { CMSModel } from '~/types/Models/CMSModel';
import { CMSSeo } from '~/types/Models/CMSSeo';

export interface CMSHomePage extends CMSModel {
  seo: CMSSeo;
  hero: CMSHero;
  directAccess: CMSContentCard[];
  categories: CMSCategory[];
  productFilters: CMSFilters;
}
