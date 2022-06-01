import React, { FC, useCallback, useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { Button } from '~/components/ui';
import { Branch } from '~/types/Models';
import slugify from '~/utils/slugify';
import { RightOutlined } from '@ant-design/icons';

interface Props {
  branches: Branch[];
  zoom?: number;
  onLoad?: (map: any) => void;
}

const Map: FC<Props> = ({ branches, zoom = 6, onLoad }) => {
  const [map, setMap] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [center, setCenter] = useState({
    lat: branches[0].latitud,
    lng: branches[0].longitud,
  });
  if (!process.env.NEXT_PUBLIC_GM_API) console.warn('NEXT_PUBLIC_GM_API variable does not exist');
  if (!process.env.NEXT_PUBLIC_MARKER_IMAGE_URL) {
    console.warn('NEXT_PUBLIC_MARKER_IMAGE_URL variable does not exist');
  }
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GM_API as string,
  });

  const setMapCenter = (_map: any): void => {
    /*if (typeof window !== 'undefined') {
      // @ts-ignore
      const { LatLngBounds } = window?.google?.maps || {};
      const bounds = new LatLngBounds();
      _map.fitBounds(bounds);
      console.log('center', bounds);
    }*/
  };

  useEffect(() => {
    if (map && isLoaded) {
      setTimeout(() => setMapCenter(map), 300);
    }
  }, [isLoaded, map]);

  const handleLoad = useCallback(function callback(_map) {
    setMapCenter(_map);
    setMap(_map);
    onLoad?.(_map);
  }, []);
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded) return null;
  return (
    <GoogleMap
      onLoad={handleLoad}
      onUnmount={onUnmount}
      center={center}
      zoom={zoom}
      options={{ streetViewControl: false, mapTypeControl: false }}
    >
      {branches
        .filter((branch) => branch?.latitud && branch?.longitud)
        .map((branch) => {
          return (
            <Marker
              icon={process.env.NEXT_PUBLIC_MARKER_IMAGE_URL}
              position={{
                lat: branch?.latitud,
                lng: branch?.longitud,
              }}
              key={branch?.id}
              clickable
              onClick={() => setSelectedBranch(branch)}
            >
              {selectedBranch?.id === branch.id && (
                <InfoWindow
                  onCloseClick={() => setSelectedBranch(null)}
                  position={{
                    lat: branch?.latitud,
                    lng: branch?.longitud,
                  }}
                >
                  <div className="w-[225px] sm:w-[300px] p-2">
                    <span className="font-bold">{branch?.name}</span>
                    <p className="text-gray-300 mb-4">{branch?.address}</p>
                    <Button
                      text="Más detalles"
                      size="small"
                      theme="primary"
                      href={`/sucursales/${branch?.slug || slugify(branch.name)}`}
                      rightIcon={<RightOutlined />}
                    />
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
    </GoogleMap>
  );
};

export default Map;
