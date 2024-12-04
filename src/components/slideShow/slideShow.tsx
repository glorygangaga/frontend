import { FC } from 'react';

import styles from './slideShow.module.scss';
import { Presentation } from '../../types/types';
import SlideShowElems from './slideShowElems';
import { useChangeElementRect } from './hooks';

type SlideShowProps = {
  activeId: number | null;
  containerRef: React.RefObject<HTMLDivElement>;
  presentation: Presentation;
};

const SlideShow: FC<SlideShowProps> = ({ presentation, activeId, containerRef }) => {
  const elementRect = useChangeElementRect(containerRef, activeId);

  return (
    <div className={styles.active_slide_show}>
      {activeId !== null && (
        <div
          ref={containerRef}
          className={styles.slide_active}
          style={{
            backgroundImage: `url('${
              presentation.slides.find((slide) => slide.id === activeId)?.background.src
            }')`,
            backgroundColor:
              presentation.slides.find((slide) => slide.id === activeId)?.background.color ||
              'white',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          {presentation.slides
            .find((slide) => slide.id === activeId)
            ?.info?.map((info) => (
              <SlideShowElems key={info.id} element={info} elementRect={elementRect} />
            ))}
        </div>
      )}
    </div>
  );
};

export default SlideShow;
