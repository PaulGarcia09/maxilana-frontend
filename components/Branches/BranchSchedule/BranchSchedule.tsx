import React, { FC } from 'react';
import { Branch } from '~/types/Models';

import styles from './BranchSchedule.module.css';

interface Props {
  branch: Branch;
}

const BranchSchedule: FC<Props> = ({ branch }) => {
  return (
    <>
      <span className={styles.heading}>HORARIO:</span>
      <dl className={styles.content}>
        <dt>Lun - Vie:</dt>
        <dd>{branch?.mondayToFridaySchedule} hrs.</dd>
        <dt>Sáb:</dt>
        <dd>{branch?.saturdaySchedule} hrs.</dd>
        <dt>Dom:</dt>
        <dd>
          {branch?.sundaySchedule === 'Cerrado' ? 'Cerrado' : `${branch?.sundaySchedule} hrs.`}
        </dd>
      </dl>
    </>
  );
};

export default BranchSchedule;
