import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

export type EditorType = {
  presentation: Presentation;
  selection: SelectionType;
}

export type SelectionType = {
  selectedSlideId: number | null,
  undo: Presentation[];
  redo: Presentation[];
}

export type Presentation = {
  id: number;
  title: string;
  slides: collectionOfSlides;
}

export type collectionOfSlides = Slide[];

export type Slide = {
  id: number;
  background: Background;
  info?: (Image | TextElement)[];
}

export type InfoObject = {
  id: number;
  type: 'image' | 'text';
  position: Pos;
  size: Size;
  index: number;
}

export type Size = {
  width: number;
  height: number;
}

export type Pos = {
  x: number;
  y: number;
}

export type TextElement = InfoObject & {
  text: string;
  font: string;
  textSize: number;
  isBold: boolean;
  type: 'text';
  color: string;
}

export type Image = InfoObject & {
  src: string;
  type: 'image';
}

export type Background = {
  type: 'image' | 'solid' | 'gradient';
  src?: string | ArrayBuffer;
  color?: string;
  gradient?: Gradient;
}

export type Gradient = {
  type: 'linear' | 'radial';
  color: string[];
  position?: number;
}

export type dispatchType = ThunkDispatch<{
  presentation: EditorType;
}, undefined, UnknownAction> & Dispatch<UnknownAction>
