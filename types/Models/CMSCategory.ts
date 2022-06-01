import { CMSFilters } from '~/types/Models/CMSFilters';
import { CMSImage } from '~/types/Models/CMSImage';
import { CMSModel } from '~/types/Models/CMSModel';

export interface CMSCategory extends CMSModel {
  name: string;
  products_page_mkt: {
    id: number;
    slug: string;
  };
  filters: CMSFilters;
  image: CMSImage;
  code: string;
  formType: 'default' | 'relojes' | 'joyas';
  subcategories: Array<{
    id: number;
    name: string;
    image: CMSImage;
    code: string;
  }>;
}
