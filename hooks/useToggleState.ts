import { useState } from 'react';

const useToggleState = (value = false): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(value);

  const toggle = () => {
    setState(!state);
  };

  return [state, toggle];
};

export default useToggleState;
