import { useState, useRef, useEffect, LegacyRef, MutableRefObject } from 'react';

const useImageLoaded = (): [
  MutableRefObject<HTMLImageElement | undefined> | LegacyRef<HTMLImageElement | undefined>,
  boolean,
  () => void,
] => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>();

  const onLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (ref?.current?.complete) {
      onLoad();
    }
    if (ref?.current) {
      ref.current?.addEventListener('load', onLoad);
      return () => {
        ref?.current?.removeEventListener('load', onLoad);
      };
    }
  }, []);

  return [ref, loaded, onLoad];
};

export default useImageLoaded;
