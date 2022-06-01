import { FC, useState } from 'react';
import { UpOutlined, DownOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { CMSWhatsApp } from '~/types/Models/CMSWhatsApp';

import Button, { Props as ButtonProps } from './Button';
import Dropdown from '../Dropdown';

interface Props {
  size?: ButtonProps['size'];
  theme?: ButtonProps['theme'];
  items: CMSWhatsApp[];
  label: string;
}

const ButtonDropdown: FC<Props> = ({ size = 'default', theme = 'default', items, label }) => {
  const [visible, toggleDropdown] = useState(false);

  return (
    <Dropdown
      visible={visible}
      onClose={() => {
        toggleDropdown(false);
      }}
      parent={
        <Button
          size={size}
          text={label}
          theme={theme}
          onClick={() => {
            toggleDropdown(!visible);
          }}
          icon={<WhatsAppOutlined style={{ fontSize: 16 }} />}
          rightIcon={
            visible ? (
              <UpOutlined style={{ fontSize: 16 }} />
            ) : (
              <DownOutlined style={{ fontSize: 16 }} />
            )
          }
        />
      }
    >
      <div role="list">
        {items.map((item) => {
          const link = `https://api.whatsapp.com/send?phone=521${item.number}`;

          return (
            <a
              target="_blank"
              role="listitem"
              href={link}
              key={item.id}
              rel="noopener noreferrer"
              className="block p-1 text-xs text-primary rounded-sm hover:bg-brand/10"
            >
              {item.name}
            </a>
          );
        })}
      </div>
    </Dropdown>
  );
};

export default ButtonDropdown;
