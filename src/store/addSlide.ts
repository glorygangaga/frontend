import { EditorType } from "./EditorType.ts";
import { Slide } from '../types/types.ts';

export function addSlide(editor: EditorType): EditorType {
  if (!editor.selection) {
    return editor;
  }

  const newSlide: Slide = {
    id: editor.presentation.slides[editor.presentation.slides.length - 1]?.id + 1 || 0,
    background: { type: 'solid' },
    info: [],
  };

  return {
    presentation: {
      ...editor.presentation,
      slides: [...editor.presentation.slides, newSlide] ,
    },
    selection: {
      selectedSlideId: editor.selection.selectedSlideId,
    },
  }
}
