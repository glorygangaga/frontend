import { FC } from 'react';

import styles from './slideShow.module.scss';
import { elementRectType, useResizeElement } from './hooks';
import { resizeType } from './functions';

type ResizebleButtonsProps = {
  refMain: React.RefObject<HTMLDivElement>;
  elementRect: elementRectType;
  id: number;
};

const elems: { type: resizeType; pos: number[] }[] = [
  { type: 'topLeft', pos: [0, 0] },
  { type: 'top', pos: [0, 50] },
  { type: 'topRight', pos: [0, 100] },
  { type: 'left', pos: [50, 0] },
  { type: 'right', pos: [50, 100] },
  { type: 'bottomLeft', pos: [100, 0] },
  { type: 'bottom', pos: [100, 50] },
  { type: 'bottomRight', pos: [100, 100] },
];

const ResizebleButtons: FC<ResizebleButtonsProps> = ({ refMain, elementRect, id }) => {
  const resize = useResizeElement(refMain, elementRect, id);

  return (
    <div className={styles.changeble_elem}>
      {elems.map((el) => (
        <span
          key={el.type}
          style={{ top: `${el.pos[0]}%`, left: `${el.pos[1]}%` }}
          onMouseDown={(e) => resize(el.type, e)}
        />
      ))}
    </div>
  );
};

export default ResizebleButtons;
