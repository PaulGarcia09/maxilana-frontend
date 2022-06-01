import { CMSBanner } from '~/types/Models/CMSBanner';
import { CMSFilters } from '~/types/Models/CMSFilters';
import { CMSImage } from '~/types/Models/CMSImage';
import { CMSModel } from '~/types/Models/CMSModel';
import { CMSSeo } from '~/types/Models/CMSSeo';

export interface CMSMktPage extends CMSModel {
  title: string;
  slug: string;
  content: string;
  cover: CMSImage;
  seo: CMSSeo;
  productsFilters: CMSFilters;
  banners: CMSBanner[];
}
