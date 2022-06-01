import cn from 'classnames';
import React, { Ref, SelectHTMLAttributes } from 'react';

import styles from './InputField.module.css';

type Option = {
  value: any;
  label: string;
};

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  inline?: boolean;
  options: Option[];
  errors?: { [key: string]: any };
}

const SelectField = React.forwardRef((props: Props, ref: Ref<HTMLSelectElement>) => {
  const { name, options, inline, label = null, errors = null, ...rest } = props;
  const { id, placeholder } = rest;
  let isInline = false;

  return (
    <div className={cn(styles.root, { [styles.inline]: isInline })}>
      {label !== null && (
        <label htmlFor={id ?? name} className={styles.label}>
          {label}
        </label>
      )}
      <select {...rest} ref={ref} name={name} id={id ?? name} className={styles.input}>
        <option value="default" disabled hidden>
          {placeholder || 'Elige una opción'}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errors && <span className={styles.errorMessage}>{errors.message}</span>}
    </div>
  );
});

SelectField.displayName = 'SelectField';

export default SelectField;
