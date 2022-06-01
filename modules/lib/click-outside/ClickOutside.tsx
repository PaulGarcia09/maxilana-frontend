import React, { useRef, useEffect, MouseEvent, PropsWithChildren, FC, ReactElement } from 'react';

import hasParent from './hasParent';

interface ClickOutsideProps {
  active: boolean;
  onClick: (e?: MouseEvent) => void;
  children: ReactElement;
}

const ClickOutside: FC<ClickOutsideProps> = ({ active = true, onClick, children }) => {
  const innerRef = useRef();

  const handleClick = (event: any) => {
    if (!hasParent(event.target, innerRef?.current)) {
      if (typeof onClick === 'function') {
        onClick(event);
      }
    }
  };

  useEffect(() => {
    if (active) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleClick);
    }

    return () => {
      if (active) {
        document.removeEventListener('mousedown', handleClick);
        document.removeEventListener('touchstart', handleClick);
      }
    };
  });

  return React.cloneElement(children, { ref: innerRef });
};

export default ClickOutside;
