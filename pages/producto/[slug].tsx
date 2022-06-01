import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import ms from 'ms';
import { WhatsAppOutlined, LoadingOutlined, ShopFilled, PhoneOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import getAllLegalPages from '~/api/cms/getAllLegalPages';
import fetcher from '~/modules/api/fetcher';

import getAllCities from '~/api/getAllCities';
import getBranch from '~/api/getBranch';
import getProducts from '~/api/getProducts';
import { ShareLinks } from '~/components/common';
import { Layout } from '~/components/layout';
import { usePrice } from '~/modules/hooks';
import { Branch, City, CMSLegal } from '~/types/Models';
import { Product } from '~/types/Models/Product';
import generateProductGallery from '~/utils/generateProductGallery';
import slugify from '~/utils/slugify';
import getProductById from '~/api/getProductById';
import { Button, LazyMap, ProductCard } from '~/components/ui';
import { ProductBadge, Gallery } from '~/components/products';
import { Truck } from '~/components/svg';

import LogoRedondo from '../../public/logo-redondo.png';
import useAddItem from '~/hooks/cart/useAddItem';
import { formatPrice } from '~/modules/hooks/usePrice';
import getOnlinePrice from '~/utils/getOnlinePrice';

type CartStatus = 'default' | 'adding' | 'added';

interface GSProps {
  product: Product;
  gallery: string[];
  cities?: City[];
  relatedProducts?: Product[];
  branch?: Branch;
  legalPages: CMSLegal[];
}

interface ProductPriceResponse {
  precio: number;
  precioneto: number;
  descuento: string;
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const paginatedProducts = await getProducts();
  const { rows: products } = paginatedProducts;
  return {
    paths: products.map((product) => ({
      params: { slug: `${product?.id}-${slugify(product?.name)}` },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<GSProps, { slug: string }> = async (ctx) => {
  const slug = ctx?.params?.slug as string;
  const id = slug.split('-')[0];
  const product = await getProductById(id);
  if (!product) return { notFound: true };

  const [products, branch, cities, gallery, legalPages] = await Promise.all([
    getProducts({
      limit: '4',
      ciudad: `${product?.Branch?.CityId}`,
      categoria: `${product.CategoryId}`,
    }),
    getBranch(product?.BranchId),
    getAllCities(),
    generateProductGallery(product),
    getAllLegalPages(),
  ]);

  return {
    props: {
      product,
      gallery,
      branch,
      relatedProducts: products.rows,
      cities,
      legalPages,
    },
    revalidate: ms(process.env.PRODUCT_REVALIDATE || '1m') / 1000,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps> & WithRouterProps;

const ProductView: NextPage<Props> = ({
  product,
  gallery,
  cities,
  relatedProducts,
  branch,
  router,
  legalPages,
}) => {
  const { data: ProductPrice, isValidating: loadingPrice } = useSWR<ProductPriceResponse>(
    `/productos/${product.id}/precio`,
    { revalidateOnFocus: true, fetcher },
  );
  const { isFallback } = router;
  const addItem = useAddItem();
  const [shareURL, setShareURL] = useState<string>();
  const [status, setStatus] = useState<CartStatus>('default');
  const { price, discount, basePrice } = usePrice({
    amount: ProductPrice?.precioneto || product?.netPrice,
    baseAmount: ProductPrice?.precio || product?.price,
  });

  useEffect(() => {
    if (process.browser) {
      setShareURL(window?.location?.toString());
    }
  }, []);

  if (isFallback || !product) {
    return (
      <Layout title="Cargando..." cities={cities || []} legalPages={legalPages || []}>
        <div className="container mx-auto px4 py-48 text-center space-y-6">
          <LoadingOutlined className="text-brand text-2xl" />
          <span className="block text-secondary text-2xl md:text-3xl">
            Obteniendo información del producto
          </span>
        </div>
      </Layout>
    );
  }

  const onlinePrice = getOnlinePrice(product.netPrice, product?.promoDiscount);

  const handleAddToCart = async () => {
    setStatus('adding');

    try {
      await addItem(product);
      setStatus('added');
      // Notificar que se agregó el producto...
    } catch (err) {
      setStatus('default');
      console.log(err);
    }
  };

  const { phone = '', whatsapp = '' } = branch || {};
  const phoneLink = `tel:52${phone.replace(/\s/g, '')}`;

  const message = encodeURIComponent(
    `Hola me gustaría comprar el producto: *${product?.name}* con código *${product?.id}* que cuesta *$${product?.netPrice}*`,
  );
  const number = whatsapp.replace(/\s/g, '');
  const whatsappLink = `https://api.whatsapp.com/send?phone=521${number}&text=${message}`;

  const buyButtonText = status === 'added' ? 'Producto en carrito' : 'Agregar al carrito';

  return (
    <Layout title={product?.name} cities={cities || []} bgWhite legalPages={legalPages}>
      <div className="container mx-auto pb-12">
        <div className="grid gap-6 mt-8 px-4 md:grid-cols-2 md:max-w-none lg:grid-cols-5 xl:grid-cols-3">
          <main className="md:px-0 lg:col-span-2 order-2 xl:col-span-1">
            <div className="px-4 space-y-6 border rounded pt-4">
              <div>
                <h1 className="h6">{product.name}</h1>
                <span className="text-secondary block">Código: {product.id}</span>
              </div>
              <div className="mt-4 relative">
                {discount ? (
                  <>
                    <span className="h4 text-danger">{price}</span>{' '}
                    <span className="h5 text-secondary line-through">{basePrice}</span>
                  </>
                ) : (
                  <span className="h4 text-price">{price}</span>
                )}
                {loadingPrice && (
                  <span className="absolute inset-0 bg-white/90 grid place-content-center">
                    <span className="flex items-center space-x-3">
                      <LoadingOutlined />
                      <span>Actualizando precio...</span>
                    </span>
                  </span>
                )}
              </div>
              {product?.saleOnline && product?.promoDiscount && (
                <div className="mt-4">
                  <p>
                    {`${ProductPrice?.descuento || product.promoDiscount}%`} de descuento adicional
                    comprando en línea.
                  </p>
                </div>
              )}
              {product?.observations && (
                <div>
                  <span className="font-bold block text-secondary">Descripción</span>
                  <p>{product?.observations}</p>
                </div>
              )}
              {product?.brand && (
                <div>
                  <span className="font-bold block text-secondary">Marca</span>
                  <p>{product?.brand}</p>
                </div>
              )}
              {product?.saleOnline && (
                <span className="flex items-center gap-4">
                  <ProductBadge type="car" />
                  <strong>Disponible para compra en línea</strong>
                </span>
              )}
              <span className="flex items-center gap-4">
                <ProductBadge type="shop" />
                <span>Disponible en sucursal</span>
              </span>
              <p className="font-semibold">
                Si te interesa recoger en tienda este producto comunicate a la sucursal.
              </p>
              {product?.saleOnline && (
                <Button
                  fullWidth
                  disabled={status === 'added'}
                  loading={status === 'adding'}
                  theme={status === 'added' ? 'default' : 'primary'}
                  text={`${buyButtonText} (${formatPrice({
                    amount: onlinePrice,
                    locale: 'es-MX',
                  })})`}
                  onClick={handleAddToCart}
                />
              )}
              <Button
                fullWidth
                theme="whatsapp"
                text="Comprar en sucursal"
                target="_blank"
                href={whatsappLink}
                icon={<WhatsAppOutlined />}
              />
              {!product?.saleOnline && (
                <Button
                  fullWidth
                  text="Llamar a sucursal"
                  icon={<PhoneOutlined />}
                  href={phoneLink}
                />
              )}
              <ShareLinks url={`${shareURL}`} text={product?.name} className="border-t border-b" />
              <div className="flex items-center gap-4 border-b py-4">
                <div className="shadow rounded-full overflow-hidden w-[48px] h-[48px] sm:w-[72px] sm:h-[72px]">
                  <Image src={LogoRedondo} width={72} height={72} alt="Logo Maxilana" />
                </div>
                <div>
                  <span className="text-secondary text-sm">Sucursal</span>
                  <Link href={`/sucursales/${product?.Branch?.slug}`}>
                    <a className="font-bold block">{product?.Branch?.name}</a>
                  </Link>
                  <span className="text-secondary text-sm">{product?.Branch?.City?.name}</span>
                  <p className="text-secondary">
                    <span className="block">
                      Teléfono: <span>{phone}</span>
                    </span>
                    <span className="block">
                      Whatsapp: <span>{whatsapp}</span>
                    </span>
                  </p>
                </div>
              </div>
              {product?.saleOnline ? (
                <div className="flex items-center gap-4 py-4">
                  <span className="text-white text-xl bg-brand rounded-full min-w-[48px] min-h-[48px] sm:min-w-[72px] sm:min-h-[72px] border-accent border-4 flex justify-center items-center">
                    <Truck />
                  </span>
                  <div>
                    <span className="block font-bold">Producto con entrega en tu domicilio</span>
                    <span className="text-secondary">
                      Este producto puede ser comprado en sucursal y en línea pagando con tu tarjeta
                      de crédito o débito
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 py-4">
                  <span className="text-white text-xl bg-brand rounded-full min-w-[72px] min-h-[72px] border-accent border-4 flex justify-center items-center">
                    <ShopFilled />
                  </span>
                  <div>
                    <span className="block font-bold">
                      Producto de venta exclusiva solo en sucursal.
                    </span>
                    <span className="text-secondary">
                      Este producto solo esta disponible en esta sucursal
                    </span>
                  </div>
                </div>
              )}
            </div>
          </main>
          <div className="contents md:block md:order-1 lg:col-span-3 xl:col-span-2">
            <aside className=" xl:col-span-2 order-1 md:order-none">
              {product?.image && <Gallery images={gallery} />}
            </aside>
            {!!branch && (
              <div className="aspect-w-16 aspect-h-8 bg-surface my-6 order-3 md:order-none rounded overflow-hidden border">
                <LazyMap branch={branch} />
              </div>
            )}
          </div>
        </div>
        {!!relatedProducts && (
          <div className="px-4 py-12">
            <h3 className="h4 mb-4">Productos similares</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item?.id} data={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withRouter(ProductView);
