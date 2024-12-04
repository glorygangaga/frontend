import { useEffect, useState } from "react";

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
