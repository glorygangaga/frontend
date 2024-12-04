import { FC } from 'react';

import styles from './slideShow.module.scss';

type ResizebleButtonsProps = {};

const elems = [0, 50, 100];

const ResizebleButtons: FC<ResizebleButtonsProps> = () => {
  return (
    <div className={styles.changeble_elem}>
      {elems.map((el) =>
        elems.map(
          (el2, i) =>
            (el === 50 && el2 === 50) || (
              <span key={i} style={{ top: `${el}%`, left: `${el2}%` }}></span>
            ),
        ),
      )}
    </div>
  );
};

export default ResizebleButtons;
