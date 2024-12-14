import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from './slides.module.scss';
import Slide from './slide';
import NavbarIcon from '../ui/navbarIcon';
import ChangePositionSlide from './changePositionSlide';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actions } from '../../store/slices/presentation.slice';

type slidesProps = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export type isDraggingType = {
  isDrag: boolean;
  id: null | number;
};

const Slides: FC<slidesProps> = ({ active, setActive }) => {
  const dispatch = useAppDispatch();
  const activeId = useAppSelector((state) => state.presentation.selection.selectedSlideId);
  const presentation = useAppSelector((state) => state.presentation.presentation);

  const [isDragging, setIsDragging] = useState<isDraggingType>({ isDrag: false, id: null });

  const addIntoSlide = () => dispatch(actions.addSlide());

  return (
    <article className={classNames(styles.slides, active && styles.active)}>
      <button
        className={classNames(styles.slides_navbar_btn, active && styles.active)}
        onClick={() => setActive((prev) => !prev)}
      >
        <NavbarIcon />
      </button>
      <div className={classNames(styles.slide_show, active && styles.active)}>
        <ul className={styles.slide_boxes}>
          {isDragging.isDrag &&
            isDragging.id !== null &&
            activeId !== 0 &&
            activeId !== isDragging.id && (
              <ChangePositionSlide id={presentation.slides[0].id} activeId={isDragging.id} />
            )}
          {!!presentation.slides.length &&
            presentation.slides.map((slide, i) => (
              <li key={slide.id}>
                <Slide
                  index={i + 1}
                  slide={slide}
                  activeId={activeId}
                  setIsDragging={setIsDragging}
                />
                {isDragging.isDrag &&
                  isDragging.id !== null &&
                  activeId !== null &&
                  activeId !== isDragging.id && (
                    <ChangePositionSlide id={slide.id} activeId={isDragging.id} />
                  )}
              </li>
            ))}
        </ul>
        {!isDragging.isDrag && (
          <div className={styles.slide_new}>
            <div className={styles.slide_main_new}>
              <button onClick={addIntoSlide}>Add new Slide</button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default Slides;
