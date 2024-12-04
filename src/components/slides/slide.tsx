import { FC } from 'react';
import classNames from 'classnames';

import { dispatch } from '../../store/editor';
import styles from './slides.module.scss';
import { Slide as SlideType } from '../../types/types';
import DeliteBtn from './deleteBtn';
import SlideShowElems from '../slideShow/slideShowElems';
import { setSelection } from '../../store/setSelection';

type slideProps = {
  slide: SlideType;
  index: number;
  activeId: number | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Slide: FC<slideProps> = ({ slide, activeId, index, setIsOpen }) => {
  return (
    <li
      className={classNames(styles.slide_box, activeId === slide.id && styles.active)}
      onClick={() => dispatch(setSelection, { selectedSlideId: slide.id })}
    >
      <p className={styles.slide_index}>{index}</p>
      {activeId === slide.id && <DeliteBtn slideId={slide.id} />}
      <div
        draggable={activeId === slide.id}
        onDragStart={() => activeId === slide.id && setIsOpen(true)}
        onDragEnd={() => activeId === slide.id && setIsOpen(false)}
        className={styles.slide_main}
        style={{
          backgroundImage: `url('${slide.background.src}')`,
          backgroundColor: slide.background.color,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {slide.info?.map((info) => (
          <SlideShowElems key={info.id} element={info} elementRect={null} isSlidesElement={true} />
        ))}
      </div>
    </li>
  );
};

export default Slide;
