import { CMSModel } from '~/types/Models/CMSModel';
import { CMSSeo } from '~/types/Models/CMSSeo';
import { CMSImage } from './CMSImage';

type JobPlatform = {
  id: number;
  name: string;
  link: string;
  logo: CMSImage;
};

export interface CMSJobsPage extends CMSModel {
  title: string;
  description: string;
  seo: CMSSeo;
  jobsPlatform: JobPlatform[];
}
