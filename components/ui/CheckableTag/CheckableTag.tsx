import cn from 'classnames';
import { FC, PropsWithChildren } from 'react';
import useToggleState from '~/hooks/useToggleState';

import styles from './ChekableTag.module.css';

interface Props {
  label?: string;
  className?: string;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
}

const CheckableTag: FC<PropsWithChildren<Props>> = ({
  label,
  children,
  className,
  checked,
  onCheckChange,
}) => {
  const [status, toggle] = useToggleState(checked);
  return (
    <span
      className={cn(styles.root, { [styles.checked]: status }, className)}
      role="checkbox"
      aria-checked={status}
      onClick={() => toggle()}
    >
      {label || children}
    </span>
  );
};

export default CheckableTag;
