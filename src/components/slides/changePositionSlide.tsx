import { FC } from 'react';

import styles from './slides.module.scss';

interface IChangePositionSlideProps {
  id: number;
}

const ChangePositionSlide: FC<IChangePositionSlideProps> = ({ id }) => {
  return <span className={styles.dropEl} onMouseDown={(e) => console.log(id)}></span>;
};

export default ChangePositionSlide;
