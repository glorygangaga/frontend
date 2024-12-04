import { EditorType } from "./EditorType.ts";
import { collectionOfSlides } from '../types/types.ts';

export function deleteSlideElement(editor: EditorType, payload: {id: number}): EditorType {
  if (!editor.selection) {
    return editor;
  }

  let activeSlide = editor.presentation.slides.find((slide) => slide.id === editor.selection.selectedSlideId);
  const newSlides: collectionOfSlides = [...editor.presentation.slides];

  if (activeSlide && activeSlide.info) {
    const slideFilter = activeSlide.info.filter(element => element.id !== payload.id);
    activeSlide.info = slideFilter;
    newSlides.filter((slide) => slide.id !== activeSlide.id).push(activeSlide);
  }

  return {
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
    selection: {
      selectedSlideId: editor.selection.selectedSlideId,
    },
  }
}
