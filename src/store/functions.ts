import { Background, EditorType, Image, Slide, TextElement} from '../types/types';
import checkFileIsPresentation from './schema';

export function isJSON(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const getPresentationFromLocalStorage = (): EditorType => {
  const presentationLS = localStorage.getItem('presentation') || '';
  if (!isJSON(presentationLS)) return createNewPresentation();

  const presentation: EditorType = JSON.parse(presentationLS);
  if (!presentation) return createNewPresentation();
  checkFileIsPresentation(presentation);

  if (checkFileIsPresentation(presentation)) {
    presentation.selection.undo = [];
    presentation.selection.redo = [];
    return presentation;
  }
  return createNewPresentation();
}

export function downloadAsFile(data: string, filename: string) {
  let a = document.createElement("a");
  let file = new Blob([data], {type: 'application/json'});
  a.href = URL.createObjectURL(file);
  a.download = `${filename}.json`;
  a.click();
}

export function createNewImage(src: string): Image {
  return {
    id: 0,
    type: 'image',
    src: src,
    size: {
      width: 15,
      height: 15,
    },
    position: {
      x: 0,
      y: 0,
    },
    index: 1,
  }
}

export function createNewSlide(newSlideId: number): Slide {
  return {
    id: newSlideId + 1 || 0,
    background: { type: 'solid' },
    info: [],
  }
}

export function craeteNewText(value: string, color: string | undefined): TextElement {
  return {
    id: 0,
    text: value,
    font: '',
    type: 'text',
    position: {
      x: 0,
      y: 0,
    },
    color: color || 'black',
    size: {
      width: 10,
      height: 5
    },
    textSize: 1,
    isBold: false,
    index: 1,
  }
}

export function createNewPresentation(): EditorType {
  return {
    presentation: {
      id: 0,
      title: 'Presentation',
      slides: [{ id: 0, background: { type: 'solid' }, info: [] }],
    },
    selection: {
      selectedSlideId: 0 || null,
      redo: [],
      undo: []
    }
  }
}

export function createNewBackGround(type: "image" | "solid" | "gradient", color: string | undefined, src: string | ArrayBuffer | undefined): Background {
  return { type, color, src };
}