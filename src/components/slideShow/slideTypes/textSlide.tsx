import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from '../slideShow.module.scss';
import { TextElement } from '../../../types/types';
import DelEl from './delEl';
import { ChangePosition, changeShiftPosition } from '../functions';
import { elementRectType, shiftPositionType } from '../hooks';
import { useAppDispatch } from '../../../hooks/redux';
import { actions } from '../../../store/slices/presentation.slice';
import ChangeIndex from './changeIndex';
import { fontOptions, options } from './functions';

type TextSlideProps = {
  element: TextElement;
  elementRect: elementRectType;
  isSlidesElement?: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
};

const TextSlide: FC<TextSlideProps> = ({ element, isSlidesElement, elementRect, containerRef }) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState({
    text: element.text,
    color: element.color,
    select: element.textSize * 14,
    fontSelect: element.font,
    isBold: element.isBold,
  });
  const [shiftPosition, setShiftPosition] = useState<shiftPositionType>({ x: 0, y: 0 });

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (isSlidesElement) e.preventDefault();
    if (containerRef && e && e.target && e.target.innerText)
      setValue((prev) => ({ ...prev, text: e.target.innerText }));
  };

  useEffect(() => {
    (value.text !== element.text || element.color !== value.color) &&
      dispatch(actions.changeTextSlide({ value: value.text, color: value.color, id: element.id }));
  }, [value.text, value.color]);

  useEffect(() => {
    dispatch(actions.changeTextFontSize({ select: value.select, id: element.id }));
  }, [value.select]);

  useEffect(() => {
    dispatch(actions.changeTextType({ isBold: value.isBold, id: element.id }));
  }, [value.isBold]);

  useEffect(() => {
    dispatch(actions.changeTextFontFamily({ id: element.id, font: value.fontSelect }));
  }, [value.fontSelect]);

  return (
    <>
      <div
        draggable={!isSlidesElement}
        onDragStart={(e) => !isSlidesElement && changeShiftPosition(e, setShiftPosition)}
        onDragEnd={(e) =>
          !isSlidesElement && ChangePosition(elementRect, element.id, e, shiftPosition, dispatch)
        }
        className={classNames(styles.element__inner, !isSlidesElement && styles.change)}
        style={{
          color: element.color,
          fontSize: `${
            isSlidesElement ? `${0.3 * element.textSize}rem` : `${1.3 * element.textSize}vw`
          }`,
          fontFamily: element.font || 'sans-serif',
          fontWeight: element.isBold ? 'bold' : 'normal',
          zIndex: element.index,
        }}
        contentEditable={!isSlidesElement}
        suppressContentEditableWarning
        onBlur={handleBlur}
        onDrop={(e) => e.preventDefault()}
      >
        {element.text}
      </div>

      {!isSlidesElement && (
        <div className={styles.changeElement}>
          <input
            type='color'
            name='colorEl'
            id='colorEl'
            className={styles.textColor}
            onChange={(e) => setValue((prev) => ({ ...prev, color: e.target.value }))}
          />
          <select
            className={styles.select}
            value={value.select}
            onChange={(e) => setValue((prev) => ({ ...prev, select: +e.target.value }))}
            name='selectElement'
          >
            {options.map((elem) => (
              <option key={elem} value={elem}>
                {elem}
              </option>
            ))}
          </select>
          <select
            className={styles.select}
            name='selectFont'
            value={value.fontSelect}
            onChange={(e) => setValue((prev) => ({ ...prev, fontSelect: e.target.value }))}
          >
            {fontOptions.map((elem) => (
              <option key={elem.font} value={elem.font + ', ' + elem.type}>
                {elem.font}
              </option>
            ))}
          </select>
          <ChangeIndex id={element.id} />
          <button
            className={classNames(styles.isBold, value.isBold && styles.active)}
            onClick={() => setValue((prev) => ({ ...prev, isBold: !prev.isBold }))}
          >
            B
          </button>
          <DelEl id={element.id} />
        </div>
      )}
    </>
  );
};

export default TextSlide;
