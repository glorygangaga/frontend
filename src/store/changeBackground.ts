import { EditorType } from './EditorType.ts';
import { Background, collectionOfSlides } from '../types/types.ts';

export function changeBackground(editor: EditorType, payload: { color: string }): EditorType {
  if (!editor.selection) {
    return editor;
  }

  let activeSlide = editor.presentation.slides.find(
    (slide) => slide.id === editor.selection.selectedSlideId,
  );

  const newBackground: Background = {
    type: 'solid',
    color: payload.color,
  };

  let newSlides: collectionOfSlides = [...editor.presentation.slides];
  if (activeSlide) {
    activeSlide.background = newBackground;
    newSlides = newSlides.filter((slide) => slide.id !== activeSlide.id);
    newSlides.push(activeSlide);
  }

  return {
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
    selection: {
      selectedSlideId: editor.selection.selectedSlideId,
    },
  };
}
