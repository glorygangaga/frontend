import { actions } from "../../store/slices/presentation.slice";
import { dispatchType, Pos, Size } from "../../types/types";
import { elementRectType, shiftPositionType } from "./hooks";

export type changeShiftPositionType = (e: React.DragEvent<HTMLImageElement | HTMLDivElement>, setShiftPosition: React.Dispatch<React.SetStateAction<shiftPositionType>>) => void
export type changePositionType = (elementRect: elementRectType, id: number, e: React.DragEvent<HTMLImageElement | HTMLDivElement>, shiftPosition: shiftPositionType, dispatch: dispatchType) => void;
export type resizeType =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topRight'
  | 'topLeft'
  | null;

export const changeShiftPosition: changeShiftPositionType = (e, setShiftPosition) => {
  const element = e.currentTarget.getBoundingClientRect();
  const delta = { x: e.clientX - element.x, y: e.clientY - element.y };
  setShiftPosition(delta);
};

export const ChangePosition: changePositionType = (elementRect, id, e, shiftPosition, dispatch) => {
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

  dispatch(actions.changePositionElement({id, position}));
}

export function checkIsResizeNormal(delta: Size, position: Pos): Size | null {
  if (delta.width === 0 && delta.height === 0) return null;
  if (delta.height > 100) delta.height = 100;
  else if (delta.height < 5) delta.height = 5;
  if (delta.width > 100) delta.width = 100;
  else if (delta.width < 10) delta.width = 10;
  if (delta.width + position.x > 100)
    delta.width = 100 - position.x;
  if (delta.height + position.y > 100)
    delta.height = 100 - position.y;

  return delta;
}

function getDefaultWidth(e: MouseEvent, main: HTMLDivElement, width: number): number {
  return ((e.clientX - main.getBoundingClientRect().left) / width) * 100;
}

function getDefaultHeight(e: MouseEvent, main: HTMLDivElement, hieght: number): number {
  return ((e.clientY - main.getBoundingClientRect().top) / hieght) * 100;
}

export function getNewSize(type: NonNullable<resizeType>, e: MouseEvent, main: HTMLDivElement, elementRect: NonNullable<elementRectType>, activeElement: Size, width: number = 0, height: number = 0): Size {
  const clientHieght = elementRect.hieght;
  const clientWidth = elementRect.width;
  
  if (type === 'bottom') {
    width = activeElement.width;
    height = getDefaultHeight(e, main, clientHieght);
  } else if (type === 'right') {
    height = activeElement.height;
    width = getDefaultWidth(e, main, clientWidth);
  } else if (type === 'left') {
    width = -getDefaultWidth(e, main, clientWidth) + activeElement.width
    height = activeElement.height;
  } else if (type === 'top') {
    width = activeElement.width;
    height = -getDefaultHeight(e, main, clientHieght) + activeElement.height;
  } else if (type === 'bottomRight') {
    width = getDefaultWidth(e, main, clientWidth);
    height = getDefaultHeight(e, main, clientHieght);
  } else if (type === 'bottomLeft') {
    width = -getDefaultWidth(e, main, clientWidth) + activeElement.width;
    height = getDefaultHeight(e, main, clientHieght);
  } else if (type === 'topLeft') {
    width = -getDefaultWidth(e, main, clientWidth) + activeElement.width;
    height = -getDefaultHeight(e, main, clientHieght) + activeElement.height ;
  } else if (type === 'topRight') {
    width = getDefaultWidth(e, main, clientWidth);
    height = -getDefaultHeight(e, main, clientHieght) + activeElement.height
  };

  return { width, height };
}

export function checkIsPositionNormal(delta: Pos, main: HTMLDivElement, elementRect: NonNullable<elementRectType>): Pos | null {
  if (delta.x < 0 || delta.y < 0) return null;
  if (delta.x + main.getBoundingClientRect().width / elementRect.width * 100 >= 100) return null;
  if (delta.y + main.getBoundingClientRect().height / elementRect.hieght * 100 >= 100) return null;

  return delta;
}

function getDefaultPositionX(e: MouseEvent, elementRect: NonNullable<elementRectType>): number {
  return ((e.clientX - elementRect.leftPos) / elementRect.width) * 100;
}

function getDefaultPositionY(e: MouseEvent, elementRect: NonNullable<elementRectType>): number {
  return ((e.clientY - elementRect.topPos) / elementRect.hieght) * 100;
}

export function getNewPosition(e: MouseEvent,  elementRect: NonNullable<elementRectType>, type: NonNullable<resizeType>, position: Pos): Pos {
  let x: number = position.x;
  let y: number = position.y;

  if (type === 'left' || type === 'topLeft' || type === 'bottomLeft')
    x = getDefaultPositionX(e, elementRect);
  if (type === 'top' || type === 'topLeft' || type === 'topRight')
    y = getDefaultPositionY(e, elementRect);

  return { x, y };
}

export function getNewSizeForNewPositionNormal(delta: Size): Size | null {
  if (delta.height > 100 || delta.height < 5 || delta.width > 100 || delta.width < 10) return null;
  return delta;
}

export function getNewSizeForNewPosition(type: NonNullable<resizeType>, activeElementPosition: Pos, activeElementSize: Size, e: MouseEvent, elementRect: NonNullable<elementRectType>, deltaNormal: Size): Size {
  let height = activeElementSize.height;
  let width = activeElementSize.width;

  if (type === 'left' || type === 'topLeft')
    width = (activeElementPosition.x - ((e.clientX - elementRect.leftPos) / elementRect.width) * 100) + activeElementSize.width;
  if (type === 'top' || type === 'topRight' || type === 'topLeft')
    height = (activeElementPosition.y - ((e.clientY - elementRect.topPos) / elementRect.hieght) * 100) + activeElementSize.height;
  if (type === 'topRight')
    width = deltaNormal.width;
  if (type === 'bottomLeft') {
    width = activeElementPosition.x - getDefaultPositionX(e, elementRect) + activeElementSize.width;
    height = deltaNormal.height;
  }

  return { width, height };
}