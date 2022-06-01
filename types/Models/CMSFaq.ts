import { CMSModel } from '~/types/Models/CMSModel';
import { CMSSection } from '~/types/Models/CMSSection';

export interface CMSFaq extends CMSModel {
  question: string;
  answer: string;
  section: Partial<CMSSection>;
}
