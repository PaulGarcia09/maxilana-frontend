import cn from 'classnames';
import { FC } from 'react';
import BackButton from '~/components/pawn/BackButton';

import useCitiesForPawns from '~/hooks/useCitiesForPawns';

import styles from './Form.module.css';
import commonStyles from '../Pawn.module.css';
import JewelryForm, { FormValues as JewelryFormValues } from './JewelryForm';
import WatchesForm, { FormValues as WatchesFormValues } from './WatchesForm';
import CommonForm from './CommonForm';
import { CMSCategory } from '~/types/Models/CMSCategory';

type FormType = CMSCategory['formType'];
type FormRequest =
  | JewelryFormValues
  | WatchesFormValues
  | { plaza: number; monto: number; correo: string };

interface Props {
  formType: FormType;
  onBack: () => void;
  onSubmit: (data: FormRequest) => Promise<void>;
}

const RequestForm: FC<Props> = ({ onBack, onSubmit, formType = 'default' }) => {
  const { cities, isLoading, error } = useCitiesForPawns();
  let Form = null;

  if (formType === 'joyas') {
    Form = JewelryForm;
  } else if (formType === 'relojes') {
    Form = WatchesForm;
  } else {
    Form = CommonForm;
  }

  return (
    <div className={cn(commonStyles.root, styles.root)}>
      {(() => {
        if (error) {
          return (
            <div className="min-h-[512px]">
              <div className={commonStyles.loaderOverlay}>
                <span className={commonStyles.loader}>
                  Ocurrió un error vuelve en otra ocasión para poder usar la calculadora.
                </span>
              </div>
            </div>
          );
        }

        if (isLoading) {
          return (
            <div className="min-h-[512px]">
              <div className={commonStyles.loaderOverlay}>
                <span className={commonStyles.loader}>Cargando datos...</span>
              </div>
            </div>
          );
        }

        return (
          <div>
            <BackButton onBack={onBack} />
            <h3 className={commonStyles.title}>Contesta las siguientes preguntas</h3>
            <Form cities={cities} onSubmit={onSubmit} />
          </div>
        );
      })()}
    </div>
  );
};

export default RequestForm;
