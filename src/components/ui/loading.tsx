import { FC, memo } from 'react';

import styles from './loading.module.scss';

interface Iloading {
  fill?: string;
  width?: string;
  height?: string;
}

const Loading: FC<Iloading> = ({ fill = '#eee', width = '40px', height = '40px' }) => {
  return (
    <svg className={styles.spinner} viewBox='0 0 50 50' height={height} width={width} fill='none'>
      <circle className={styles.path} stroke={fill} cx='25' cy='25' r='20' strokeWidth='5'></circle>
    </svg>
  );
};

export default memo(Loading);
