import { useRef, useEffect } from 'react';

function useEffectOnUpdate(callback: () => void, value: any[]): void {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      callback();
    }
  }, value);
}

export default useEffectOnUpdate;
