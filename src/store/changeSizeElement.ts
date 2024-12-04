import { EditorType } from "./EditorType.ts";
import { collectionOfSlides, Size } from '../types/types.ts';

export function changeSizeElement(editor: EditorType, payload: {id: number, Size: {width: number, height: number}}): EditorType {
  if (!editor.selection) {
    return editor;
  }

  let activeSlide = editor.presentation.slides.find((slide) => slide.id === editor.selection.selectedSlideId);
  let activeElement = activeSlide?.info?.find(info => info.id === payload.id);
  const newSlides: collectionOfSlides = [...editor.presentation.slides];

  if (activeElement && activeSlide) {
    
    const newSize: Size = {
      ...payload.Size,
    };
    console.log(newSize);
    
    // activeElement.size = newSize;
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
