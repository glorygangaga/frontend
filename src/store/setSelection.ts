import {EditorType, SelectionType} from "./EditorType.ts";

export function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
  return {
    ...editor,
    selection: newSelection,
  }
}
