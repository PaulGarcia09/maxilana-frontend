import { CMSImage } from '~/types/Models/CMSImage';
import { CMSMktPage } from '~/types/Models/CMSMktPage';
import { CMSModel } from '~/types/Models/CMSModel';

export interface CMSBanner extends CMSModel {
  title: string;
  link: string;
  image: CMSImage;
  type: 'grande' | 'cuadrado' | 'chico';
  products_page_mkts: CMSMktPage[];
}
