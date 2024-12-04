import { EditorType } from "./EditorType.ts";
import { collectionOfSlides, TextElement } from '../types/types.ts';

export function addText(editor: EditorType, payload: {value: string, color?: string}): EditorType {
  if (!editor.selection) {
    return editor;
  }
  let activeSlide = editor.presentation.slides.find((slide) => slide.id === editor.selection.selectedSlideId);

  const newSlides: collectionOfSlides = [...editor.presentation.slides];
  if (activeSlide) {
    const newText: TextElement = {
      id: 0,
      text: payload.value,
      font: '',
      type: 'text',
      position: {
        x: 0,
        y: 0,
      },
      color: payload.color || 'black',
      size: {
        width: 10,
        height: 5
      }
    };

    if (activeSlide.info && activeSlide.info.length > 0)
      newText.id = activeSlide.info[activeSlide.info.length - 1].id + 1;

    activeSlide.info?.push(newText);
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
