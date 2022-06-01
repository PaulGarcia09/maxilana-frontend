import { ParsedUrlQuery } from 'querystring';
import React, { FC, useState } from 'react';
import { Img } from '~/components/ui';
import parseQuery from '~/utils/parseQuery';
import Map from '../Map';
import { Branch } from '~/types/Models';

interface Props {
  branch: Branch;
}

const LazyMap: FC<Props> = ({ branch }) => {
  if (!process.env.NEXT_PUBLIC_GM_API) console.warn('NEXT_PUBLIC_GM_API variable does not exist');
  if (!process.env.NEXT_PUBLIC_MARKER_IMAGE_URL) {
    console.warn('NEXT_PUBLIC_MARKER_IMAGE_URL variable does not exist');
  }
  const icon = encodeURIComponent(process.env.NEXT_PUBLIC_MARKER_IMAGE_URL as string);
  const [dynamicMap, setDynamicMap] = useState(false);
  const params: ParsedUrlQuery = {
    center: `${branch.latitud},${branch.longitud}`,
    zoom: '18',
    size: '600x300',
    scale: '1',
    key: process.env.NEXT_PUBLIC_GM_API,
    markers: `icon:${icon}|${branch.latitud},${branch.longitud}`,
  };
  const src = `https://maps.googleapis.com/maps/api/staticmap?${parseQuery(params)}`;
  const showDynamicMap = () => {
    if (!dynamicMap) setDynamicMap(true);
  };
  return (
    <>
      <div className="absolute inset-0 cursor-pointer" onClick={showDynamicMap} role="button">
        <Img
          src={src}
          layout="intrinsic"
          objectFit="cover"
          alt="map"
          quality={100}
          width={824}
          height={414}
          customLoader="maxilana"
        />
      </div>
      {dynamicMap && <Map branches={[branch]} zoom={18} />}
    </>
  );
};

export default LazyMap;
