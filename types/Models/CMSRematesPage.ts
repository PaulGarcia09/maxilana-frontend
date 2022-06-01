import { CMSBanner } from '~/types/Models/CMSBanner';
import { CMSCategory } from '~/types/Models/CMSCategory';
import { CMSSeo } from '~/types/Models/CMSSeo';

export interface CMSRematesPage {
  id: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  seo: CMSSeo;
  categories: Array<{ id: number; category: CMSCategory }>;
  banners: Array<{ id: number; banner: CMSBanner }>;
}
