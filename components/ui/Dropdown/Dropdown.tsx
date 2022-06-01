import cn from 'classnames';
import { FC, ReactElement, ReactNode } from 'react';
import ClickOutside from '~/modules/lib/click-outside';

import styles from './Dropdown.module.css';

interface Props {
  parent: ReactNode;
  children: ReactElement;
  visible: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
}

const Dropdown: FC<Props> = ({ parent, children, onClose, visible = false, position = 'left' }) => {
  return (
    <ClickOutside active={true} onClick={onClose}>
      <div className={styles.root}>
        {parent}
        <div
          className={cn(styles.wrapper, {
            [styles.wrapperVisible]: visible,
            [styles.wrapperRight]: position === 'right',
            [styles.wrapperLeft]: position === 'left',
          })}
        >
          {children}
        </div>
      </div>
    </ClickOutside>
  );
};

export default Dropdown;
