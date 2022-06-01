import { FC } from 'react';
import { WhatsAppOutlined } from '@ant-design/icons';

import { Button } from '~/components/ui';
import { CMSCategory } from '~/types/Models/CMSCategory';
import getCMSImageURL from '~/utils/getCMSImageURL';

import styles from '../Pawn.module.css';
import SelectableItem from '../SelectableItem';

interface Props {
  onSelect: (id: CMSCategory) => void;
  onWhatsappClick: () => void;
  categories: CMSCategory[];
}

const PawnRequest: FC<Props> = ({ onSelect, onWhatsappClick, categories }) => {
  return (
    <div className={styles.root}>
      <div className="p-4 bg-white">
        <div className="mb-4">
          <h2 className={styles.title}>Descubre hasta cuánto te podemos dar por tu prenda</h2>
          <p className="text-primary">Calcula tu préstamo con nuestro simulador:</p>
        </div>
        <div className="my-6 grid gap-2 sm:grid-cols-2">
          {categories.map((item) => {
            return (
              <SelectableItem
                key={item.id}
                imageSrc={getCMSImageURL(item?.image)}
                label={item.name}
                onClick={() => {
                  onSelect(item);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="border-surface-dark border-t p-4 bg-white md:bg-transparent">
        <p className="mb-4">O comunícate directamente con un valuador:</p>
        <Button
          fullWidth
          size="large"
          theme="whatsapp"
          text="Obtén una valuación de un experto"
          onClick={onWhatsappClick}
          icon={<WhatsAppOutlined style={{ color: 'white', fontSize: 20 }} />}
        />
      </div>
    </div>
  );
};

export default PawnRequest;
