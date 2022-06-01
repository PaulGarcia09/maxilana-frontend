import cn from 'classnames';
import { FC } from 'react';
import { CMSCategory } from '~/types/Models/CMSCategory';
import getCMSImageURL from '~/utils/getCMSImageURL';
import BackButton from '../BackButton';

import commonStyles from '../Pawn.module.css';
import SelectableItem from '../SelectableItem';

type ArticleType = CMSCategory['formType'];

interface Props {
  category: CMSCategory | undefined;
  onBack: () => void;
  onSelectArticle: (id: string, articleType: ArticleType) => void;
}

const SelectArticle: FC<Props> = ({ category, onBack, onSelectArticle }) => {
  return (
    <div className={commonStyles.root}>
      <div className="bg-white p-4">
        <BackButton onBack={onBack} />
        <div className="mb-6">
          <h3 className={commonStyles.title}>{`Selecciona el tipo de ${category?.name}`}</h3>
        </div>
        <div
          className={cn('grid gap-4', {
            ['grid-cols-2']: category && category?.subcategories?.length > 6,
          })}
        >
          {category?.subcategories?.map?.((item) => (
            <SelectableItem
              key={item.id}
              label={item.name}
              imageSrc={getCMSImageURL(item?.image)}
              onClick={() => {
                const id = category?.code || item?.code;
                const articleType = category?.formType || 'default';
                onSelectArticle(id, articleType);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectArticle;
