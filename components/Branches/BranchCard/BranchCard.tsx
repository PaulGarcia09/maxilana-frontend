import cn from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { DownOutlined, PhoneOutlined, WhatsAppOutlined, SelectOutlined } from '@ant-design/icons';
import { BranchSchedule, CircleLink } from '~/components/Branches';
import { Button, Card } from '~/components/ui';
import { Branch } from '~/types/Models/Branch';

import styles from './BranchCard.module.css';
import slugify from '~/utils/slugify';

interface Props {
  data: Branch;
  expanded?: boolean;
  onClick?: () => void;
}

const BranchCard: FC<Props> = ({ data, expanded, onClick }) => {
  const [showDetails, setShowDetails] = useState(false);

  const { phone = '', whatsapp = '' } = data || {};
  const phoneLink = `tel:52${phone.replace(/\s/g, '')}`;
  const whatsappLink = `https://api.whatsapp.com/send?phone=521${whatsapp.replace(/\s/g, '')}`;
  useEffect(() => {
    setShowDetails(!!expanded);
  }, [expanded]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div role="button" onClick={() => onClick?.()}>
      <Card className={showDetails ? styles.expanded : ''}>
        <div className={styles.heading}>
          <h3 className={styles.name}>{data.name}</h3>
          <button onClick={() => toggleDetails()} className={styles.toggle}>
            <DownOutlined />
          </button>
        </div>
        <div className="space-y-4">
          <p className={styles.address}>{data.address}</p>
          <div className={cn(styles.details)}>
            <div>
              <BranchSchedule branch={data} />
            </div>
            <div className="flex justify-between">
              <span className="block text-xs font-bold text-brand-darker">TELÉFONO:</span>
              <span className="text-secondary">{phone}</span>
            </div>
            <Button
              text="Ver remates de la tienda"
              fullWidth
              theme="primary"
              href={`/sucursales/${data?.slug || slugify(data.name)}`}
            />
            <div className={styles.contactOptions}>
              <CircleLink href={phoneLink} text="Llamar por teléfono" icon={<PhoneOutlined />} />
              <CircleLink
                whatsapp
                href={whatsappLink}
                text="Enviar WhatsApp"
                icon={<WhatsAppOutlined />}
              />
            </div>
            <div className="text-center">
              {data?.constancy && (
                <a
                  href={data?.constancy}
                  className="text-brand inline-flex items-center space-x-2 hover:underline"
                  rel="nofollow noreferrer"
                  target="_blank"
                >
                  <span>Constancia de inscripción</span>
                  <SelectOutlined />
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BranchCard;
