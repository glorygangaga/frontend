import { EditorType } from "./EditorType.ts";
import { collectionOfSlides } from '../types/types.ts';

export function changeTextToSlide(editor: EditorType, payload: {value: string, color: string, id: number}): EditorType {
  if (!editor.selection) {
    return editor;
  }

  let activeSlide = editor.presentation.slides.find((slide) => slide.id === editor.selection.selectedSlideId);
  let activeText = activeSlide?.info?.find(info => info.id === payload.id);
  const newSlides: collectionOfSlides = [...editor.presentation.slides];
  if (activeSlide && activeText?.type === 'text') {
    activeText.color = payload.color;
    activeText.text = payload.value;
    activeSlide.info?.filter(info => info.id !== payload.id).push(activeText);
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
