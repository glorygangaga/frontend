import { FC } from 'react';

import styles from './slideShow.module.scss';
import SlideShowElems from './slideShowElems';
import { useChangeElementRect } from './hooks';
import { useAppSelector } from '../../hooks/redux';

type SlideShowProps = {
  containerRef: React.RefObject<HTMLDivElement>;
};

const SlideShow: FC<SlideShowProps> = ({ containerRef }) => {
  const presentation = useAppSelector((state) => state.presentation.presentation);
  const activeId = useAppSelector((state) => state.presentation.selection.selectedSlideId);

  const elementRect = useChangeElementRect(containerRef, activeId);

  return (
    <section className={styles.active_slide_show}>
      {activeId !== null && (
        <article
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
              <SlideShowElems
                key={info.id}
                element={info}
                elementRect={elementRect}
                containerRef={containerRef}
              />
            ))}
        </article>
      )}
    </section>
  );
};

export default SlideShow;
