import { CMSImage } from '~/types/Models/CMSImage';

export interface CMSSeo {
  id: number;
  title: string;
  description: string;
  keywords: string;
  shareImage: CMSImage | string;
}
