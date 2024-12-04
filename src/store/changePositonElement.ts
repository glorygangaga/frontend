import { EditorType } from "./EditorType.ts";
import { collectionOfSlides, Pos } from '../types/types.ts';

export function changePositionElement(editor: EditorType, payload: {id: number, position: {x: number, y: number}}): EditorType {
  if (!editor.selection) {
    return editor;
  }

  let activeSlide = editor.presentation.slides.find((slide) => slide.id === editor.selection.selectedSlideId);
  let activeElement = activeSlide?.info?.find(info => info.id === payload.id);
  const newSlides: collectionOfSlides = [...editor.presentation.slides];

  if (activeElement && activeSlide) {
    
    const newPos: Pos = {x: payload.position.x, y: payload.position.y};
    
    activeElement.position = newPos;
    newSlides.filter((slide) => slide.id !== activeSlide.id).push(activeSlide);
  }


  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
  }
}
