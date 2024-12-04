import { changePositionElement } from "../../store/changePositonElement";
import { dispatch } from "../../store/editor";
import { elementRectType, shiftPositionType } from "./hooks";

export type changeShiftPositionType = (e: React.DragEvent<HTMLImageElement | HTMLDivElement>, setShiftPosition: React.Dispatch<React.SetStateAction<shiftPositionType>>) => void
export type changePositionType = (elementRect: elementRectType, id: number, e: React.DragEvent<HTMLImageElement | HTMLDivElement>, shiftPosition: shiftPositionType) => void;

export const changeShiftPosition: changeShiftPositionType = (e, setShiftPosition) => {
  const element = e.currentTarget.getBoundingClientRect();
  const delta = { x: e.clientX - element.x, y: e.clientY - element.y };
  setShiftPosition(delta);
};

export const ChangePosition: changePositionType = (elementRect, id, e, shiftPosition) => {
  if (elementRect === null) return;
  const currentElement = e.currentTarget.getBoundingClientRect();

  const delta = {
    x: ((e.clientX - elementRect.leftPos - shiftPosition.x) / elementRect.width) * 100,
    y: ((e.clientY - elementRect.topPos - shiftPosition.y) / elementRect.hieght) * 100,
  };

  if ((e.clientY - elementRect.topPos + currentElement.height) / elementRect.hieght > 1)
    delta.y = ((elementRect.hieght - currentElement.height) / elementRect.hieght) * 100;
  if ((e.clientX - elementRect.leftPos + currentElement.width) / elementRect.width > 1)
    delta.x = ((elementRect.width - currentElement.width) / elementRect.width) * 100;
  if (delta.x < 0) delta.x = 0;
  if (delta.y < 0) delta.y = 0;

  const position = { x: delta.x, y: delta.y };

  dispatch(changePositionElement, { id, position });
}