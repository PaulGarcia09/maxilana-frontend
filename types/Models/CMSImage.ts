import { CMSModel } from '~/types/Models/CMSModel';

export interface Formats {
  large: Omit<CMSImage, 'formats'>;
  small: Omit<CMSImage, 'formats'>;
  medium: Omit<CMSImage, 'formats'>;
  thumbnail: Omit<CMSImage, 'formats'>;
}

export interface CMSImage extends CMSModel {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: string;
  provider_metadata: string;
}
