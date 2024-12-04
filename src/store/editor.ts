import { EditorType } from "./EditorType";
import { editor } from "./store";

let _editor = editor;
let _handler: Function | null = null;

export function getEditor() {
  return _editor;
}

function setEditor(newEditor: EditorType) {
  _editor = newEditor;
}

export function dispatch(modifyFn: Function, payload?: Object): void {
  const newEditor = modifyFn(_editor, payload);
  setEditor(newEditor);

  if (_handler)
    _handler();

  localStorage.setItem('presentation', JSON.stringify(newEditor.presentation));
}

export function addEditorChangeHandler(handler: Function): void {
  _handler = handler;
}
