import { CMSFaq } from '~/types/Models/CMSFaq';
import { CMSModel } from '~/types/Models/CMSModel';
import { CMSSeo } from '~/types/Models/CMSSeo';

export interface CMSSection extends CMSModel {
  name: string;
  slug: string;
  seo: CMSSeo;
  faqs: Array<Partial<CMSFaq>>;
}
