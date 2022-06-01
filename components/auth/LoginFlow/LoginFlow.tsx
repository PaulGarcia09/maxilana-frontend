import { FC, useState } from 'react';
import LoginForm from '../LoginForm';
import RecoveryPasswordForm from '../RecoveryPasswordForm';
import VerifyCodeForm from '../VerifyCodeForm';
import NewPasswordForm from '../NewPasswordForm';
import SuccessRecoveryPassword from '../SuccessRecoveryPassword';

type Status =
  | 'login'
  | 'recoveryPassword'
  | 'verifyCode'
  | 'newPassword'
  | 'successOnRecoveryPasswordProcess';

interface Props {
  onSuccess: () => void;
}
export interface RecoveryPasswordResponse {
  Usuario?: number;
  Celular?: number;
  mensaje?: string;
}

/**
 * Aquí se controla el flujo de login y el proceso de recuperar contraseña por medio de un estado.
 * Le puse que el mínimo de caracteres de la contraseña sea de 8.
 */
const LoginFlow: FC<Props> = ({ onSuccess }) => {
  const [status, setStatus] = useState<Status>('login');
  const [userData, setUserData] = useState<RecoveryPasswordResponse>();
  const changeLoginFlow = (newDirection: Status) => setStatus(newDirection);
  return (
    <>
      {status === 'login' && <LoginForm onSuccess={onSuccess} changeLoginFlow={changeLoginFlow} />}
      {status === 'recoveryPassword' && (
        <RecoveryPasswordForm changeLoginFlow={changeLoginFlow} setUserData={setUserData} />
      )}
      {status === 'verifyCode' && (
        <VerifyCodeForm changeLoginFlow={changeLoginFlow} userData={userData} />
      )}
      {status === 'newPassword' && (
        <NewPasswordForm changeLoginFlow={changeLoginFlow} userData={userData} />
      )}
      {status === 'successOnRecoveryPasswordProcess' && (
        <SuccessRecoveryPassword changeLoginFlow={changeLoginFlow} />
      )}
    </>
  );
};

export default LoginFlow;
