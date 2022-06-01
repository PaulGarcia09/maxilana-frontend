import { CMSImage, Formats } from '~/types/Models/CMSImage';

const getCMSImageURL = (image: CMSImage, format?: keyof Formats): string => {
  const { provider, url, formats } = image;
  if (provider === 'local' || url.charAt(0) === '/') {
    if (format && formats?.[format]) {
      return `${process.env.NEXT_PUBLIC_CMS_API_BASEURL}${formats[format].url}`;
    }
    return `${process.env.NEXT_PUBLIC_CMS_API_BASEURL}${url}`;
  }
  return image.url;
};

export default getCMSImageURL;
