import { FC, PropsWithChildren } from 'react';
import { Button } from '~/components/ui';

import styles from './styles.module.css';

interface Props {
  visible: boolean;
  errorMessage?: string;
  onDismiss?: () => void;
}

const FormFeedback: FC<PropsWithChildren<Props>> = ({
  children,
  visible = false,
  errorMessage = 'Ha ocurrido un error',
  onDismiss = () => {},
}) => {
  return (
    <div className={styles.root}>
      {visible && (
        <div className={styles.overlay}>
          <div className={styles.body}>
            <span role="alert" className={styles.errorMessage}>
              {errorMessage}
            </span>
            <Button
              size="small"
              text="Cerrar"
              onClick={(evt) => {
                evt.preventDefault();
                onDismiss();
              }}
            />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default FormFeedback;
