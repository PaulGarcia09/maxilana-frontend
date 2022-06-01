import { CMSImage } from '~/types/Models/CMSImage';
import { CMSLink } from '~/types/Models/CMSLink';
import { CMSModel } from '~/types/Models/CMSModel';

export interface CMSContentCard extends CMSModel {
  title: string;
  description: string;
  image: CMSImage;
  link: CMSLink[];
}
