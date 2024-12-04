import { EditorType } from "./EditorType.ts";

export function importPresentation(editor: EditorType, payload: {jsonFile: string | ArrayBuffer | null}): EditorType {

  let newPresentation = editor.presentation;

  if (payload.jsonFile && typeof payload.jsonFile === 'string') {
    const importPresentationEl = JSON.parse(payload.jsonFile);
    if ('id' in importPresentationEl && 'title' in importPresentationEl && 'slides' in importPresentationEl && Array.isArray(importPresentationEl.slides))
      newPresentation = importPresentationEl;
  }

  return {
    ...editor,
    presentation: newPresentation
  }
}
