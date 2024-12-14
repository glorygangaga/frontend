import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from '../slideShow.module.scss';
import { Image } from '../../../types/types';
import DelEl from './delEl';
import { ChangePosition, changeShiftPosition } from '../functions';
import { elementRectType, shiftPositionType } from '../hooks';
import { useAppDispatch } from '../../../hooks/redux';
import ChangeIndex from './changeIndex';

type ImageSlideProps = {
  element: Image;
  elementRect: elementRectType;
  isSlidesElement?: boolean;
};

const ImageSlide: FC<ImageSlideProps> = ({ element, isSlidesElement, elementRect }) => {
  const dispatch = useAppDispatch();
  const [shiftPosition, setShiftPosition] = useState<shiftPositionType>({ x: 0, y: 0 });

  return (
    <>
      <img
        draggable={!isSlidesElement}
        style={{ zIndex: element.index }}
        onDragStart={(e) => !isSlidesElement && changeShiftPosition(e, setShiftPosition)}
        onDragEnd={(e) =>
          !isSlidesElement && ChangePosition(elementRect, element.id, e, shiftPosition, dispatch)
        }
        src={element.src}
        alt='image'
        className={classNames(styles.image__inner, !isSlidesElement && styles.change)}
      />
      {!isSlidesElement && (
        <div className={styles.changeElement}>
          <ChangeIndex id={element.id} />
          <DelEl id={element.id} />
        </div>
      )}
    </>
  );
};

export default ImageSlide;
