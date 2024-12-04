import { FC } from 'react';
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
};

const SlideShowElems: FC<SlideShowElemsTypes> = ({ element, elementRect, isSlidesElement }) => {
  return (
    <>
      <div
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
            />
          )
        )}
        <ResizebleButtons />
      </div>
    </>
  );
};

export default SlideShowElems;
