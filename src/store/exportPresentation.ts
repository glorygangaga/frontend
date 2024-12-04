import { EditorType } from "./EditorType.ts";

export function exportPresentation(editor: EditorType, payload: {filename: string}): EditorType {
  if (!editor.selection) {
    return editor;
  }

  function downloadAsFile(data: string) {
    let a = document.createElement("a");
    let file = new Blob([data], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = `${payload.filename}.json`;
    a.click();
  }

  const text = JSON.stringify(editor.presentation);
  downloadAsFile(text);

  return {
    ...editor
  }
}
