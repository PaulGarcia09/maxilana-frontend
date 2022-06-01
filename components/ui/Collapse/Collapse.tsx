import { UpOutlined } from '@ant-design/icons';
import cn from 'classnames';
import React, { FC, PropsWithChildren, ReactElement } from 'react';
import useEffectOnUpdate from '~/hooks/useEffectOnUpdate';
import useToggleState from '~/hooks/useToggleState';

import styles from './Collapse.module.css';

interface Props {
  title: string | ReactElement;
  className?: string;
  indicatorStyle?: 'simple' | 'circle';
  collapsed?: boolean;
}

const Collapse: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  className,
  indicatorStyle,
  collapsed: collapsedValue,
}) => {
  const [collapsed, toggle] = useToggleState(collapsedValue);
  useEffectOnUpdate(() => {
    toggle();
  }, [collapsedValue]);
  return (
    <div className={cn(styles.root, { [styles.collapsed]: collapsed }, className)}>
      <div className={styles.header} role="button" onClick={() => toggle()}>
        {typeof title === 'string' ? <span className="heading">{title}</span> : title}
        <span className={cn({ circleRight: indicatorStyle === 'circle' })}>
          <UpOutlined className={styles.indicator} />
        </span>
      </div>
      {!collapsed && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Collapse;
