import { CMSBackAccount } from '~/types/Models/CMSBackAccount';
import { CMSCategory } from '~/types/Models/CMSCategory';
import { CMSFaq } from '~/types/Models/CMSFaq';
import { CMSHero } from '~/types/Models/CMSHero';
import { CMSModel } from '~/types/Models/CMSModel';
import { CMSPayment } from '~/types/Models/CMSPayment';
import { CMSSeo } from '~/types/Models/CMSSeo';
import { CMSWhatsApp } from '~/types/Models/CMSWhatsApp';

export interface CMSPawn extends CMSModel {
  seo: CMSSeo;
  video: string;
  faqs: CMSFaq[];
  hero: CMSHero;
  bankAccount: CMSBackAccount;
  payment: CMSPayment;
  categories: CMSCategory[];
  whatsapp: CMSWhatsApp[];
}
