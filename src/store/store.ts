import { Presentation } from "../types/types";
import {EditorType} from "./EditorType.ts";

const getPresentationFromLocalStorage = () => {
  const presentationLS = localStorage.getItem('presentation') || '{}';
  const presentation = JSON.parse(presentationLS);
  
  if ('id' in presentation && 'title' in presentation && 'slides' in presentation && Array.isArray(presentation.slides))
    return presentation;
  return null;
}

const presentation: Presentation = getPresentationFromLocalStorage() || {
  id: 0,
  title: 'Presentation',
  slides: [{ id: 0, background: { type: 'solid' }, info: [] }],
};

export const editor: EditorType = {
  presentation,
  selection: {
    selectedSlideId: presentation.slides[0]?.id || null,
  }
}