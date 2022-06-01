import capitalize from 'lodash.capitalize';
import { Product } from '~/types/Models/Product';
import { Producto } from '~/types/Responses/GetProductos';

const imageBaseURL = process.env.NEXT_PUBLIC_PRODUCT_IMAGES_BASEURL;
if (!imageBaseURL) {
  throw Error('Environment variable NEXT_PUBLIC_PRODUCT_IMAGES_BASEURL is missing');
}

const normalizeProduct = (noNormalized: Producto): Product => ({
  id: noNormalized.codigo,
  name: noNormalized.nombre.split(' ').map(capitalize).join(' '),
  BranchId: noNormalized.idsucursal,
  Branch: {
    id: noNormalized.idsucursal,
    name: noNormalized.nombresucursal,
    slug: noNormalized.slugsucursal,
    CityId: noNormalized.idciudad,
    City: {
      id: noNormalized.idciudad,
      name: noNormalized.ciudadnombre,
      slug: noNormalized.slugciudad,
    },
  },
  CategoryId: noNormalized.idcategoria,
  Category: {
    id: noNormalized.idcategoria,
    name: noNormalized.nombrecategoria,
    slug: noNormalized.slugcategoria,
  },
  price: Number(noNormalized.precio),
  netPrice: Number(noNormalized.precioneto),
  brand: noNormalized.marca ? noNormalized.marca.trim() : '',
  observations: noNormalized.observaciones ? noNormalized.observaciones.trim() : '',
  image: !!noNormalized.imagen
    ? (() => {
        const version = noNormalized.fechaimagen ? `?v=${noNormalized.fechaimagen}` : '';
        return `${imageBaseURL}/${noNormalized.codigo}.jpg${version}`;
      })()
    : null,
  precod: noNormalized.precod,
  saleOnline: Boolean(noNormalized.ventalinea),
  promoDiscount: Number(noNormalized?.descuento ?? 0),
});

export default normalizeProduct;
