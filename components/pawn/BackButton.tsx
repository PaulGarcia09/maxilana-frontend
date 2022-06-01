import { FC } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface Props {
  restart?: boolean;
  onBack: () => void;
}

const BackButton: FC<Props> = ({ onBack, restart = false }) => {
  const text = restart ? 'Volver a inicio' : 'Regresar';

  return (
    <span
      role="button"
      onClick={onBack}
      className="uppercase text-price text-sm inline-flex items-center mb-6 space-x-2"
    >
      {!restart && <ArrowLeftOutlined />}
      <span>{text}</span>
    </span>
  );
};

export default BackButton;
