import { Presentation } from "../types/types";

export type SelectionType = {
  selectedSlideId: number | null,
}

export type EditorType = {
  presentation: Presentation;
  selection: SelectionType;
}