import { FC } from 'react';
import classNames from 'classnames';

import styles from './slides.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { actions } from '../../store/slices/presentation.slice';

interface IChangePositionSlideProps {
  id: number;
  activeId: number;
}

const ChangePositionSlide: FC<IChangePositionSlideProps> = ({ id, activeId }) => {
  const dispatch = useAppDispatch();
  const changeSlidePosition = () => dispatch(actions.changeSlidePosition(id));

  return (
    <span
      className={classNames(activeId === id && styles.dropEl)}
      onDragLeave={changeSlidePosition}
    ></span>
  );
};

export default ChangePositionSlide;
