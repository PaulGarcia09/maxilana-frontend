import cn from 'classnames';
import { useRouter } from 'next/router';
import { FC, FormEventHandler, useState, useEffect } from 'react';
import Image from 'next/image';
import omit from 'lodash.omit';
import { EnvironmentOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import useEffectOnUpdate from '~/hooks/useEffectOnUpdate';
import { City } from '~/types/Models';
import parseQuery from '~/utils/parseQuery';

import Dropdown from '../Dropdown';
import MexicoMap from '../../../public/svg/mexico.svg';
import styles from './Searcher.module.css';

const locations = [
  { name: 'Culiacán y Navolato', id: 1 },
  { name: 'Mazatlán', id: 3 },
  { name: 'Guadalajara', id: 5 },
  { name: 'Hermosillo', id: 4 },
  { name: 'Mexicali', id: 7 },
  { name: 'Tijuana', id: 6 },
];

const placeholders = [
  'Busca un celular',
  'Busca una computadora',
  'Busca un reloj',
  'Busca un anillo',
  'Busca un televisor',
  'Busca un iPhone',
  'Busca un iPad',
];

interface Props {
  cities?: City[];
}

const Searcher: FC<Props> = ({ cities }) => {
  const [placeHolder, setPlaceHolder] = useState(0);
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [visible, toggleDropdown] = useState(false);
  const [city, setCity] = useState<Partial<City> | null>();

  const {
    query: { q, ciudad },
  } = router;

  useEffect(() => {
    setTimeout(() => {
      if (placeHolder < placeholders.length - 1) {
        setPlaceHolder(placeHolder + 1);
      } else {
        setPlaceHolder(0);
      }
    }, 5000);
  }, [placeHolder]);

  useEffect(() => {
    if (q || ciudad) {
      setSearchText((q as string) || '');
      if (ciudad) {
        setCity(
          cities?.length ? cities.find((item) => item?.id === parseInt(ciudad as string)) : null,
        );
      }
    }
  }, [q, ciudad]);

  const goToSearch = () => {
    const { query = {} } = router;
    if (`${searchText || ''}` !== `${query?.q || ''}` || `${city?.id}` !== query?.ciudad) {
      if (searchText) {
        query.q = searchText;
      } else {
        delete query.q;
      }
      if (city) {
        if (`${city?.id}` !== query?.ciudad) {
          query.ciudad = `${city.id}`;
          delete query.sucursal;
        }
      } else {
        delete query.ciudad;
      }

      query.orden = 'desc';

      router.push(
        `/busqueda?${parseQuery(omit(query, ['page', 'categoria', 'slug']))}`,
        undefined,
        { shallow: true },
      );
    }
  };

  useEffectOnUpdate(goToSearch, [city]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    goToSearch();
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div className={styles.inputWrap}>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={cn(styles.inputControl, styles.searchInput)}
          placeholder={placeholders[placeHolder]}
        />
      </div>
      <div className={styles.selectorWrap}>
        <Dropdown
          position="right"
          visible={visible}
          onClose={() => {
            toggleDropdown(false);
          }}
          parent={
            <div
              className={cn(styles.inputControl, styles.locationDropdown)}
              aria-expanded={visible}
              onClick={() => {
                toggleDropdown(!visible);
              }}
            >
              {!city ? (
                <span className="flex items-center sm:space-x-2">
                  <div className="hidden md:inline-block">
                    <Image src={MexicoMap} alt="Mexico" />
                  </div>
                  <span className="line-clamp-1">Todo México</span>
                </span>
              ) : (
                <span className="block space-x-2 line-clamp-1">{city?.name}</span>
              )}
              <DownOutlined
                style={{ fontSize: 14 }}
                className={cn(styles.arrowIndicator, { [styles.arrowUp]: visible })}
              />
            </div>
          }
        >
          <div role="menu" className="w-64">
            {city && (
              <span
                role="menuitem"
                className={styles.categoryItem}
                onClick={() => {
                  toggleDropdown(false);
                  setCity(null);
                }}
              >
                <EnvironmentOutlined style={{ fontSize: 18, color: '#0B477D' }} />
                <span>Todo México</span>
              </span>
            )}
            {(cities?.length ? cities : locations)
              .filter((item) => item.id !== city?.id)
              .map((item) => (
                <span
                  key={item.id}
                  role="menuitem"
                  className={styles.categoryItem}
                  onClick={() => {
                    toggleDropdown(false);
                    setCity(item);
                  }}
                >
                  <EnvironmentOutlined style={{ fontSize: 18, color: '#0B477D' }} />
                  <span>{item.name}</span>
                </span>
              ))}
          </div>
        </Dropdown>
      </div>
      <button className={styles.button} type="submit">
        <SearchOutlined />
      </button>
    </form>
  );
};

export default Searcher;
