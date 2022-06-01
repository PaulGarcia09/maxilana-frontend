import { FC } from 'react';
import { EmptyPawns } from '~/components/svg';
import { Button } from '~/components/ui';
import { EmptyOrders } from '~/components/svg';
interface Props {
  onAddAccount: () => void;
}
const ResumeEmptyList: FC<Props> = ({ onAddAccount }) => (
  <div className="px-4 py-6">
    <div className="flex flex-col items-center justify-center gap-3">
      <EmptyPawns />
      <h5 className="h6 text-center">Aún no tienes ninguna boleta de empeño</h5>
      <p className="text-secondary">Por favor agrega una boleta</p>
      <Button size="small" theme="primary" text="Agregar boleta" onClick={onAddAccount} />
    </div>
  </div>
);

export default ResumeEmptyList;
