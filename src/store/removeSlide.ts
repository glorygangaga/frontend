import {EditorType} from "./EditorType.ts";

export function removeSlide(editor: EditorType): EditorType {
  if (!editor.selection) {
    return editor
  }

  const removeSlideId = editor.selection.selectedSlideId
  const removeSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == removeSlideId)

  const newSlides = editor.presentation.slides.filter(slide => slide.id != removeSlideId)

  let newSelectedSlideId = null
  if (newSlides.length > 0) {
    const index = Math.min(removeSlideIndex, newSlides.length - 1)
    newSelectedSlideId = newSlides[index].id
  }

  return {
    presentation: {
      ...editor.presentation,
      slides: newSlides,
    },
    selection: {
      selectedSlideId: newSelectedSlideId,
    },
  }
}
