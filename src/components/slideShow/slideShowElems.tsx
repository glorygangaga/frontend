import { FC, useRef } from 'react';
import classNames from 'classnames';

import styles from './slideShow.module.scss';
import { TextElement, Image } from '../../types/types';
import TextSlide from './slideTypes/textSlide';
import ImageSlide from './slideTypes/imageSlide';
import ResizebleButtons from './resizebleButtons';
import { elementRectType } from './hooks';

type SlideShowElemsTypes = {
  element: Image | TextElement;
  elementRect: elementRectType;
  isSlidesElement?: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
};

const SlideShowElems: FC<SlideShowElemsTypes> = ({
  element,
  elementRect,
  isSlidesElement,
  containerRef,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={ref}
        className={classNames(styles.element, !isSlidesElement && styles.change)}
        style={{
          left: `${element.position.x}%`,
          top: `${element.position.y}%`,
          width: `${element.size.width}%`,
          height: `${element.size.height}%`,
        }}
      >
        {element.type === 'image' ? (
          <ImageSlide
            element={element}
            elementRect={elementRect}
            isSlidesElement={isSlidesElement}
          />
        ) : (
          element.type === 'text' && (
            <TextSlide
              element={element}
              elementRect={elementRect}
              isSlidesElement={isSlidesElement}
              containerRef={containerRef}
            />
          )
        )}
        <ResizebleButtons refMain={ref} elementRect={elementRect} id={element.id} />
      </div>
    </>
  );
};

export default SlideShowElems;
