import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { checkIsPositionNormal, checkIsResizeNormal, getNewPosition, getNewSize, getNewSizeForNewPosition, getNewSizeForNewPositionNormal, resizeType } from "./functions";
import { actions } from "../../store/slices/presentation.slice";

export type elementRectType = {
  width: number;
  hieght: number;
  leftPos: number;
  topPos: number;
} | null

export type shiftPositionType = {
  x: number;
  y: number;
}

export function useChangeElementRect(containerRef: React.RefObject<HTMLDivElement>, activeId: number | null) {
  const [elementRect, setElementRect] = useState<elementRectType>(null);

  const changeElementRect = () => {
    if (!containerRef || !containerRef.current) return;
    setElementRect({
      width: containerRef.current.offsetWidth,
      hieght: containerRef.current.offsetHeight,
      leftPos: containerRef.current.getBoundingClientRect().x,
      topPos: containerRef.current.getBoundingClientRect().y,
    });
  };

  useEffect(() => {
    activeId !== null && elementRect === null && changeElementRect();
  }, [elementRect, activeId]);

  useEffect(() => {
    window.addEventListener('resize', changeElementRect);
    return () => {
      window.removeEventListener('resize', changeElementRect);
    };
  }, []);

  return elementRect;
}

export function useResizeElement(refMain: React.RefObject<HTMLDivElement>, elementRect: elementRectType, id: number) {
  const dispatch = useAppDispatch();
  const activeId = useAppSelector((state) => state.presentation.selection.selectedSlideId);
  const activeElement = useAppSelector((state) => state.presentation.presentation.slides.find((slide) => slide.id === activeId)
    ?.info?.find((info) => info.id === id));

  const [_, setType] = useState<resizeType>(null);

  const mouseChange = (type: resizeType, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    handleMouseDown(e ,type);
    dispatch(actions.addInUndoPresentation());
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, type: resizeType) => {
    e.preventDefault();
    setType(type);

    const handleMouseMove = (e: MouseEvent) => {
      const main = refMain.current;
      if (!main || !type || !elementRect || !activeElement) return;

      const activeElementSize = activeElement.size;
      const activeElementPosition = activeElement.position;

      let delta = getNewSize(type, e, main, elementRect, activeElementSize);
      let deltaNormal = checkIsResizeNormal(delta, activeElementPosition);

      if (!deltaNormal) return;
      if (type === 'left' || type === 'topLeft' || type === 'top' || type === 'topRight' || type === 'bottomLeft') {
        const pos = getNewPosition(e, elementRect, type, activeElementPosition);
        const posNormal = checkIsPositionNormal(pos, main, elementRect);

        if (!posNormal) return;
        delta = getNewSizeForNewPosition(type, activeElementPosition, activeElementSize, e, elementRect, deltaNormal);
        deltaNormal = getNewSizeForNewPositionNormal(delta);
        if (!deltaNormal) return;

        dispatch(actions.changeSizeAndPositionElement({size: deltaNormal, id, position: posNormal}));
      }
      else
        dispatch(actions.changeSizeElement({ size: deltaNormal, id }));

      setType(null);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
  };

  return mouseChange;
}
