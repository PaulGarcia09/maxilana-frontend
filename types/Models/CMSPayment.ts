import { CMSFaq } from '~/types/Models/CMSFaq';
import { CMSImage } from '~/types/Models/CMSImage';
import { CMSModel } from '~/types/Models/CMSModel';
import { CMSSeo } from '~/types/Models/CMSSeo';

export interface CMSPayment extends CMSModel {
  title: string;
  description: string;
  slug: string;
  CTAText: string;
  type: 'empeno' | 'prestamo' | 'vale';
  seo: CMSSeo;
  faqs: CMSFaq[];
  image: CMSImage;
}
