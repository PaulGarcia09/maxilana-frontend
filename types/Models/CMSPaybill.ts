import { CMSBackAccount } from '~/types/Models/CMSBackAccount';
import { CMSFaq } from '~/types/Models/CMSFaq';
import { CMSHero } from '~/types/Models/CMSHero';
import { CMSModel } from '~/types/Models/CMSModel';
import { CMSPayment } from '~/types/Models/CMSPayment';
import { CMSSeo } from '~/types/Models/CMSSeo';
import { CMSWhatsApp } from '~/types/Models/CMSWhatsApp';

export interface CMSPaybill extends CMSModel {
  hero: CMSHero;
  bankAccount: CMSBackAccount;
  whatsapps: CMSWhatsApp[];
  seo: CMSSeo;
  faqs: CMSFaq[];
  payment: CMSPayment;
}
