import { EditorType } from './EditorType.ts';
import { Background, collectionOfSlides } from '../types/types.ts';

export function changeBackgroundImage(editor: EditorType, payload: { image: string }): EditorType {
  if (!editor.selection) {
    return editor;
  }

  let activeSlide = editor.presentation.slides.find(
    (slide) => slide.id === editor.selection.selectedSlideId,
  );

  const newBackGround: Background = {
    type: 'image',
    src: payload.image,
  };

  const newSlides: collectionOfSlides = [...editor.presentation.slides];
  if (activeSlide) {
    activeSlide.background = newBackGround;
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
  };
}
