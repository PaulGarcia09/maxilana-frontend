import { FC } from 'react';
import { Button } from '~/components/ui';
import { CheckCircleTwoTone } from '@ant-design/icons';

import styles from '../LoanCalculator/LoanCalculator.module.css';

interface Props {
  onReturn: () => void;
}

const LoanResponse: FC<Props> = ({ onReturn }) => {
  return (
    <div className={styles.root}>
      <div className="absolute w-full p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-4 items-center justify-center">
          <div>
            <CheckCircleTwoTone twoToneColor="#0BBF69" style={{ fontSize: 60 }} />
          </div>
          <h5 className="text-4xl text-center">Gracias</h5>
          <p className="text-lg text-center">
            Un miembro de nuestro equipo se comunicará contigo a la brevedad.
          </p>
          <div>
            <Button fullWidth theme="primary" text="Calcular otro préstamo" onClick={onReturn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanResponse;
