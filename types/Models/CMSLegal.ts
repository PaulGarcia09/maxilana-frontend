import { CMSModel } from '~/types/Models/CMSModel';
import { CMSSeo } from '~/types/Models/CMSSeo';

export interface CMSLegal extends CMSModel {
  id: number;
  title: string;
  content: string;
  slug: string;
  seo: CMSSeo;
}
