import { FC } from 'react';

import styles from '../slideShow.module.scss';

type ChangeIndexType = {
  id: number;
};

const ChangeIndex: FC<ChangeIndexType> = ({}) => {
  return (
    <div className={styles.changeIndex}>
      <button onClick={() => {}}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path d='M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z' />
        </svg>
      </button>
      <button onClick={() => {}}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path d='M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z' />
        </svg>
      </button>
    </div>
  );
};

export default ChangeIndex;
