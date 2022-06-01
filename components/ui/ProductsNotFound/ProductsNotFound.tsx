import { LeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { NoResults } from '~/components/svg';
import { Button } from '../Button';

import styles from './ProductsNotFount.module.css';

const ProductsNotFound: FC = () => {
  const { back } = useRouter();

  return (
    <div className={styles.root}>
      <NoResults />
      <span className={styles.mainText}>No se encontraron productos</span>
      <span className={styles.secondaryText}>
        No hay productos que coincida con sus criterios. Intenta buscar algo más.
      </span>
      <Button
        onClick={() => back()}
        text="Regresar"
        icon={<LeftOutlined style={{ fontSize: 20 }} />}
        theme="primary"
      />
    </div>
  );
};

export default ProductsNotFound;
