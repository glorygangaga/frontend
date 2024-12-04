import { EditorType } from "./EditorType.ts";
import { collectionOfSlides, Image } from '../types/types.ts';

export function addImage(editor: EditorType, payload: {image: string}): EditorType {
  if (!editor.selection) {
    return editor;
  }

  const activeSlide = editor.presentation.slides.find((slide) => slide.id === editor.selection.selectedSlideId);
  const newSlides: collectionOfSlides = [...editor.presentation.slides];
  
  if (activeSlide) {
    const newImage: Image = {
      id: 0,
      type: 'image',
      src: payload.image,
      size: {
        width: 15,
        height: 15,
      },
      position: {
        x: 0,
        y: 0,
      },
    };
    if (activeSlide.info && activeSlide.info.length > 0)
      newImage.id = activeSlide.info[activeSlide.info.length - 1].id + 1;

    activeSlide.info?.push(newImage);
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
