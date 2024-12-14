import { FC } from 'react';
import classNames from 'classnames';

import styles from './slides.module.scss';
import { Slide as SlideType } from '../../types/types';
import DeliteBtn from './deleteBtn';
import SlideShowElems from '../slideShow/slideShowElems';
import { isDraggingType } from './slides';
import { useAppDispatch } from '../../hooks/redux';
import { actions } from '../../store/slices/presentation.slice';

type slideProps = {
  slide: SlideType;
  index: number;
  activeId: number | null;
  setIsDragging: React.Dispatch<React.SetStateAction<isDraggingType>>;
};

const Slide: FC<slideProps> = ({ slide, activeId, index, setIsDragging }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={classNames(styles.slide_box, activeId === slide.id && styles.active)}
      onClick={() => dispatch(actions.setSelection(slide.id))}
    >
      <p className={styles.slide_index}>{index}</p>
      {activeId === slide.id && <DeliteBtn />}
      <div
        draggable={activeId === slide.id}
        onDragStart={() => activeId === slide.id && setIsDragging({ id: null, isDrag: true })}
        onDragEnd={() => activeId === slide.id && setIsDragging({ id: null, isDrag: false })}
        onDragOver={() =>
          activeId !== slide.id && setIsDragging((prev) => ({ ...prev, id: slide.id }))
        }
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
    </div>
  );
};

export default Slide;
