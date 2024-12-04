import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from '../slideShow.module.scss';
import { Image } from '../../../types/types';
import DelEl from './delEl';
import { ChangePosition, changeShiftPosition } from '../functions';
import { elementRectType, shiftPositionType } from '../hooks';

type ImageSlideProps = {
  element: Image;
  elementRect: elementRectType;
  isSlidesElement?: boolean;
};

const ImageSlide: FC<ImageSlideProps> = ({ element, isSlidesElement, elementRect }) => {
  const [shiftPosition, setShiftPosition] = useState<shiftPositionType>({ x: 0, y: 0 });

  return (
    <>
      <img
        draggable={!isSlidesElement}
        onDragStart={(e) => changeShiftPosition(e, setShiftPosition)}
        onDragEnd={(e) =>
          !isSlidesElement && ChangePosition(elementRect, element.id, e, shiftPosition)
        }
        src={element.src}
        alt='image'
        className={classNames(styles.image__inner, !isSlidesElement && styles.change)}
      />
      <div className={styles.changeElement}>
        <DelEl id={element.id} />
      </div>
    </>
  );
};

export default ImageSlide;
