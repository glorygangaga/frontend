import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from './slides.module.scss';
import { Presentation } from '../../types/types';
import Slide from './slide';
import { dispatch } from '../../store/editor';
import { addSlide } from '../../store/addSlide';
import NavbarIcon from '../ui/navbarIcon';
import ChangePositionSlide from './changePositionSlide';

type slidesProps = {
  presentation: Presentation;
  activeId: number | null;
  active: boolean;
  setActvie: React.Dispatch<React.SetStateAction<boolean>>;
};

const Slides: FC<slidesProps> = ({ presentation, activeId, active, setActvie }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addIntoSlide = () => {
    dispatch(addSlide, {
      presentation,
    });
  };

  return (
    <div className={classNames(styles.slides, active && styles.active)}>
      <button
        className={classNames(styles.slides_navbar_btn, active && styles.active)}
        onClick={() => setActvie((prev) => !prev)}
      >
        <NavbarIcon />
      </button>
      <div className={classNames(styles.slide_show, active && styles.active)}>
        <ul className={styles.slide_boxes}>
          {isOpen && activeId !== 0 && <ChangePositionSlide id={0} />}
          {!!presentation.slides.length &&
            presentation.slides.map((slide, i) => (
              <div key={slide.id}>
                <Slide index={i + 1} slide={slide} activeId={activeId} setIsOpen={setIsOpen} />
                {isOpen && activeId !== slide.id && activeId !== slide.id + 1 && (
                  <ChangePositionSlide id={slide.id + 1} />
                )}
              </div>
            ))}
        </ul>
        <div className={styles.slide_new}>
          <div className={styles.slide_main_new}>
            <button onClick={addIntoSlide}>Add new Slide</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slides;
