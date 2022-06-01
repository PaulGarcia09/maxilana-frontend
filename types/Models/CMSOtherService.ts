import { CMSImage } from '~/types/Models/CMSImage';
import { CMSModel } from '~/types/Models/CMSModel';

export interface CMSOtherService extends CMSModel {
  title: string;
  description: string;
  image?: CMSImage;
}
