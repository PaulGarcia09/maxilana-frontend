import { FC } from 'react';
import { Button } from '~/components/ui';

interface Props {
  changeLoginFlow: (changeDirection: 'login') => void;
}

const SuccessRecoveryPassword: FC<Props> = ({ changeLoginFlow }) => {
  return (
    <div className="grid gap-y-4 formContainer max-w-lg">
      <header className="text-center">
        <p className="h5 mb-4">¡Hecho!</p>
        <span className="text-secondary">Cambiaste tu contraseña exitosamente</span>
      </header>
      <div className="my-4 space-y-4">
        <Button
          fullWidth
          size="small"
          theme="primary"
          text="Iniciar sesión"
          onClick={() => changeLoginFlow('login')}
        />
      </div>
    </div>
  );
};

export default SuccessRecoveryPassword;
