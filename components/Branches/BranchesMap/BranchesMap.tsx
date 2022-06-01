import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import cn from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { EnvironmentOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';
import useEffectOnUpdate from '~/hooks/useEffectOnUpdate';
import useToggleState from '~/hooks/useToggleState';
import { Branch, City } from '~/types/Models';
import { Button, CheckableTag, Map } from '~/components/ui';
import BranchCard from '../BranchCard';

import styles from './BranchesMap.module.css';

interface Props {
  cities: City[];
  branches: Branch[];
  currentCity?: City;
  zoom?: number;
}

const BranchesMap: FC<Props> = ({ cities, branches, currentCity, zoom }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [selectedBranch, setSelectedBranch] = useState<Branch>();
  const [mapVisible, toggleMap] = useToggleState();
  const [map, setMap] = useState<google.maps.Map>();

  useEffectOnUpdate(() => {
    if (selectedBranch && map) {
      map.setZoom(18);
      map.setCenter({ lat: selectedBranch.latitud, lng: selectedBranch.longitud });
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (ref.current) {
      if (mapVisible) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [mapVisible]);

  return (
    <main className={cn(styles.root, { [styles.visible]: mapVisible })}>
      <aside className={styles.container}>
        <h1 className={styles.title}>Ubica tu sucursal</h1>
        <p>Elige tu ciudad para ver las sucursales más cercanas</p>
        <div key={currentCity?.name || 'all'}>
          <Link href="/sucursales">
            <a>
              <CheckableTag className={styles.city} checked={!Boolean(currentCity)}>
                Todas
              </CheckableTag>
            </a>
          </Link>
          {!!cities?.length &&
            cities.map((city) => (
              <Link href={`/sucursales/ciudad/${city?.slug}`} key={city.id}>
                <a>
                  <CheckableTag className={styles.city} checked={city?.id === currentCity?.id}>
                    {city.name}
                  </CheckableTag>
                </a>
              </Link>
            ))}
        </div>
        <span className={styles.count}>{branches?.length} sucursales</span>
        {!!branches?.length &&
          branches.map((branch) => (
            <BranchCard
              data={branch}
              key={branch?.id}
              onClick={() => setSelectedBranch(branch)}
              expanded={branch?.id === selectedBranch?.id}
            />
          ))}
      </aside>
      <div className={styles.map} ref={ref}>
        {(mapVisible || !isMobile) && !!branches?.length && (
          <Map branches={branches} zoom={zoom} onLoad={setMap} key={currentCity?.id || 'all'} />
        )}
      </div>
      <Button
        text={mapVisible ? 'Ver lista' : 'Ver mapa'}
        theme="secondary"
        icon={
          mapVisible ? (
            <UnorderedListOutlined style={{ fontSize: 20 }} />
          ) : (
            <EnvironmentOutlined style={{ fontSize: 20 }} />
          )
        }
        className={styles.mapOpener}
        onClick={() => toggleMap()}
      />
    </main>
  );
};

export default BranchesMap;
