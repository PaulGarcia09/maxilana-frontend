import omit from 'lodash.omit';
import { FC } from 'react';
import Link from 'next/link';
import { Img } from '~/components/ui';
import { CMSCategory } from '~/types/Models/CMSCategory';
import generateCategoryURL from '~/utils/generateCategoryURL';

import styles from './CategoryExplorer.module.css';
import getCMSImageURL from '~/utils/getCMSImageURL';

interface Props {
  categories: Array<Partial<CMSCategory>>;
}

const CategoryExplorer: FC<Props> = ({ categories }) => {
  return (
    <div className={styles.root}>
      <div className={styles.gridWrapper}>
        {categories.map((item) => (
          <div key={item.id} className={styles.gridElement}>
            <Link href={generateCategoryURL(item)}>
              <a className={styles.link}>
                <div className="w-[56px] h-[56px]">
                  {!!item?.image?.url && (
                    <Img
                      src={getCMSImageURL(item?.image)}
                      width={item?.image?.width}
                      height={item?.image?.height}
                      layout="fixed"
                      alt={item?.image?.alternativeText || item?.name}
                    />
                  )}
                </div>
                <span className={styles.linkLabel}>{item.name}</span>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryExplorer;
