import { CMSImage } from '~/types/Models/CMSImage';
import { CMSLink } from '~/types/Models/CMSLink';
import { CMSModel } from '~/types/Models/CMSModel';

export interface CMSHero extends CMSModel {
  mainText: string;
  secondaryText: string;
  tertiaryText: string;
  image: CMSImage;
  actions: CMSLink[];
}
