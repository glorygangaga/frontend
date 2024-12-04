import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from '../slideShow.module.scss';
import { TextElement } from '../../../types/types';
import DelEl from './delEl';
import { dispatch } from '../../../store/editor';
import { changeTextToSlide } from '../../../store/changeTextSlide';
import { ChangePosition, changeShiftPosition } from '../functions';
import { elementRectType, shiftPositionType } from '../hooks';

type TextSlideProps = {
  element: TextElement;
  elementRect: elementRectType;
  isSlidesElement?: boolean;
};

const TextSlide: FC<TextSlideProps> = ({ element, isSlidesElement, elementRect }) => {
  const [value, setValue] = useState({ text: element.text, color: element.color });
  const [shiftPosition, setShiftPosition] = useState<shiftPositionType>({ x: 0, y: 0 });

  useEffect(() => {
    dispatch(changeTextToSlide, { value: value.text, color: value.color, id: element.id });
  }, [value]);

  return (
    <>
      <div
        draggable={!isSlidesElement}
        onDragStart={(e) => changeShiftPosition(e, setShiftPosition)}
        onDragEnd={(e) =>
          !isSlidesElement && ChangePosition(elementRect, element.id, e, shiftPosition)
        }
        className={classNames(styles.element__inner, !isSlidesElement && styles.change)}
        style={{
          color: element.color,
          fontSize: `${isSlidesElement ? '0.3rem' : '1.3vw'}`,
          fontFamily: element.font || 'sans-serif',
        }}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setValue((prev) => ({ ...prev, text: e.currentTarget.innerText }))}
      >
        {element.text}
      </div>

      <div className={styles.changeElement}>
        <input
          type='color'
          name='colorEl'
          id='colorEl'
          className={styles.textColor}
          onChange={(e) => setValue((prev) => ({ ...prev, color: e.target.value }))}
        />
        <DelEl id={element.id} />
      </div>
    </>
  );
};

export default TextSlide;
