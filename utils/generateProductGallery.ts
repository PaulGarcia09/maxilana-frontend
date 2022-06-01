import imageExists from '~/api/imageExists';
import { Product } from '~/types/Models/Product';

const galleryLimit = 5;

const generateProductGallery = async (
  product: Product,
  result: string[] = [],
): Promise<string[]> => {
  const image = result.length + 1;
  const url = `${product.image}`.replace('.jpg', `_${image}.jpg`);
  if (image <= galleryLimit && (await imageExists(url))) {
    return generateProductGallery(product, [...result, url]);
  }
  return [`${product.image}`, ...result];
};

export default generateProductGallery;
