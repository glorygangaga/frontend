import { FC } from 'react';

import styles from '../slideShow.module.scss';
import { dispatch } from '../../../store/editor';
import { deleteSlideElement } from '../../../store/deleteSlideElement';

type DelElProps = {
  id: number;
};

const DelEl: FC<DelElProps> = ({ id }) => {
  const deleteElement = () => {
    dispatch(deleteSlideElement, { id });
  };

  return (
    <button className={styles.deleteBtn} onClick={deleteElement}>
      <svg
        role='img'
        width='16'
        height='16'
        viewBox='0 0 24 24'
        aria-hidden='false'
        aria-label='close'
      >
        <path
          fill='currentColor'
          fillRule='evenodd'
          d='M20.646 5.452a.5.5 0 000-.707l-1.391-1.391a.5.5 0 00-.707 0L12 9.9 5.452 3.354a.5.5 0 00-.707 0L3.354 4.745a.5.5 0 000 .707L9.9 12l-6.547 6.548a.5.5 0 000 .707l1.391 1.391a.5.5 0 00.707 0L12 14.1l6.548 6.547a.5.5 0 00.707 0l1.392-1.391a.5.5 0 000-.707L14.098 12l6.547-6.548z'
          clipRule='evenodd'
        ></path>
      </svg>
    </button>
  );
};

export default DelEl;
