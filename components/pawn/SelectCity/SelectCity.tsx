import cn from 'classnames';
import { FC } from 'react';
import { WhatsAppOutlined } from '@ant-design/icons';
import { CMSWhatsApp } from '~/types/Models/CMSWhatsApp';

import containerStyles from '../Pawn.module.css';
import { Button } from '~/components/ui';
import BackButton from '../BackButton';

interface Props {
  onBack: () => void;
  items: CMSWhatsApp[];
}

const PawnSelectableCity: FC<Props> = ({ onBack, items }) => {
  return (
    <div className={containerStyles.root}>
      <div className="bg-white p-4">
        <BackButton onBack={onBack} />
        <h3 className={containerStyles.title}>Selecciona tu ciudad</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <a
              key={item.id}
              rel="noreferrer"
              className={cn('border border-surface rounded p-4', 'hover:bg-surface-dark')}
              href={`https://api.whatsapp.com/send?phone=521${item.number}&text=Hola me gustaría solicitar un empeño`}
              target="_blank"
            >
              <WhatsAppOutlined style={{ fontSize: 32, color: '#0BBF69' }} />
              <span className="ml-4">
                <span className="font-semibold">{item.name}</span>
              </span>
            </a>
          ))}
        </div>
        <div className="mt-4">
          <Button fullWidth href="/sucursales" text="Contacta a tu sucursal más cercana" />
        </div>
      </div>
    </div>
  );
};

export default PawnSelectableCity;
