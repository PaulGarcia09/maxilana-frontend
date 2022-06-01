import React, { FC, ReactElement } from 'react';

import styles from './Stack.module.css';

interface Props {
  children: ReactElement[];
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingClasses = {
  sm: styles.spacingSmall,
  md: '',
  lg: styles.spacingLarge,
};

const VStack: FC<Props> = ({ children, spacing = 'md' }) => {
  const spacingStyle = spacingClasses[spacing];
  const className = [styles.root, styles.vertical, spacingStyle].join(' ');

  return (
    <div className={className}>
      {React.Children.map(children, (child) => (
        <div>{child}</div>
      ))}
    </div>
  );
};

export default VStack;
