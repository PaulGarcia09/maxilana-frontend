import React, { FC } from 'react';
import Image, { ImageLoaderProps, ImageProps } from 'next/image';

interface ShimmerOptions {
  w: number;
  h: number;
  baseColor?: string;
  accentColor?: string;
}

const shimmer = ({ w, h, baseColor = '#E2E3E4', accentColor = '#fff' }: ShimmerOptions) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="imgPlaceholder">
      <stop stopColor={baseColor} offset="20%" />
      <stop stopColor={accentColor} offset="50%" />
      <stop stopColor={baseColor} offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill={baseColor} />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const getBase64Placeholder = (options: ShimmerOptions): string =>
  `data:image/svg+xml;base64,${toBase64(shimmer(options))}`;

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

const loaders = {
  cloudinary:
    (options?: string[]) =>
    ({ src, width, quality = 75 }: ImageLoaderProps & { cloudinaryOptions?: string[] }) => {
      if (!process.env.NEXT_PUBLIC_CLOUDINARY_BASEURL) {
        throw Error('Environment variable NEXT_PUBLIC_CLOUDINARY_BASEURL is missing');
      }
      const baseURL = process.env.NEXT_PUBLIC_CLOUDINARY_BASEURL;
      const cloudinaryOptions = ['f_auto', `w_${width}`, `q_${quality}`];
      return `${baseURL}/image/fetch/${[...cloudinaryOptions, ...(options || [])].join(
        ',',
      )}/${src}`;
    },
  maxilana:
    () =>
    ({ src, width, quality = 75 }: ImageLoaderProps) =>
      `${process.env.NEXT_PUBLIC_API_BASEURL}/image?url=${encodeURIComponent(
        src,
      )}&w=${width}&q=${quality}`,
};

const placeholderColors = {
  default: {
    baseColor: '#E2E3E4',
    accentColor: '#FFF',
  },
  brand: {
    baseColor: '#005198',
    accentColor: '#1E83E1',
  },
};

type Props = ImageProps & {
  placeholderType?: 'default' | 'brand';
  customLoader?: 'maxilana' | 'cloudinary' | undefined;
  cloudinaryOptions?: string[];
};

const Img: FC<Props> = ({
  placeholderType = 'default',
  customLoader,
  cloudinaryOptions,
  ...props
}) => {
  const loader =
    loaders[customLoader || (process.env.NEXT_PUBLIC_CUSTOM_IMAGES_LOADER as keyof typeof loaders)];
  return (
    <>
      <Image
        alt=""
        placeholder="blur"
        blurDataURL={getBase64Placeholder({
          w: parseFloat(`${props?.width}`) || 700,
          h: parseFloat(`${props?.height}`) || 450,
          ...placeholderColors[placeholderType],
        })}
        loader={loader?.(cloudinaryOptions)}
        {...props}
      />
    </>
  );
};

export default Img;
