import { CMSFaq } from '~/types/Models/CMSFaq';
import { CMSHero } from '~/types/Models/CMSHero';
import { CMSModel } from '~/types/Models/CMSModel';
import { CMSSeo } from '~/types/Models/CMSSeo';

export interface CMSCarPawn extends CMSModel {
  seo: CMSSeo;
  video: string;
  faqs: CMSFaq[];
  hero: CMSHero;
}
