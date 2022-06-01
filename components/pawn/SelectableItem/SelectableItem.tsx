import { FC } from 'react';
import Image from 'next/image';

import styles from './SelectableItem.module.css';

interface Props {
  label: string;
  imageSrc?: string;
  onClick?: () => void;
}

const SelectableItem: FC<Props> = ({ label, imageSrc = null, onClick = () => {} }) => {
  return (
    <div id={label} className={styles.root} onClick={onClick}>
      <div className={styles.wrapBody}>
        {imageSrc !== null && (
          <div className="relative w-10 mr-4">
            <Image
              src={imageSrc}
              layout="responsive"
              objectFit="contain"
              width={98}
              height={74}
              alt="Imagen demostrativa de artículo"
            />
          </div>
        )}
        <label htmlFor={label} className={styles.label}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default SelectableItem;
