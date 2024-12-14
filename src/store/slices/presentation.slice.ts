import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Background, collectionOfSlides, EditorType, Pos, Size, Slide, TextElement } from "../../types/types";
import { Image } from '../../types/types';
import { craeteNewText, createNewBackGround, createNewImage, createNewSlide, downloadAsFile, getPresentationFromLocalStorage, isJSON } from "../functions";
import checkFileIsPresentation from "../schema";

const initialState: EditorType = getPresentationFromLocalStorage();

export const presentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {
    addImage: (state, actions: PayloadAction<{image: string}>) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      const value = actions.payload;
      const activeSlide = state.presentation.slides.find((slide) => slide.id === state.selection.selectedSlideId);
      
      if (activeSlide) {
        const newSlides: collectionOfSlides = [...state.presentation.slides];
        const newImage: Image = createNewImage(value.image)
        if (activeSlide.info && activeSlide.info.length > 0)
          newImage.id = activeSlide.info[activeSlide.info.length - 1].id + 1;
        activeSlide.info?.push(newImage);
        newSlides.filter((slide) => slide.id !== activeSlide.id).push(activeSlide);

        state.presentation.slides = newSlides;
      }
    },

    addSlide: (state) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      const newSlideId = state.presentation.slides.reduce((accumulator, currentValue) => {
        return Math.max(accumulator, currentValue.id);
      }, state.presentation.slides[0]?.id || 0);
      const newSlide: Slide = createNewSlide(newSlideId);
      state.presentation.slides = [...state.presentation.slides, newSlide];
    },

    addText: (state, actions: PayloadAction<{value: string, color?: string}>) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      const value = actions.payload;
      let activeSlide = state.presentation.slides.find((slide) => slide.id === state.selection.selectedSlideId);

      if (activeSlide) {
        const newSlides: collectionOfSlides = [...state.presentation.slides];
        const newText: TextElement = craeteNewText(value.value, value.color);
    
        if (activeSlide.info && activeSlide.info.length > 0)
          newText.id = activeSlide.info[activeSlide.info.length - 1].id + 1;
    
        activeSlide.info?.push(newText);
        newSlides.filter((slide) => slide.id !== activeSlide.id).push(activeSlide);

        state.presentation.slides = newSlides;
      }
    },

    renamePresentationTitle: (state, actions: PayloadAction<string>) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      const title = actions.payload;
      state.presentation.title = title;
    },
    
    changeBackground: (state, actions: PayloadAction<{ color?: string, type: 'image' | 'solid' | 'gradient', image?: string | ArrayBuffer }>) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      const {type, image, color} = actions.payload;
      let activeSlide = state.presentation.slides.find(
        (slide) => slide.id === state.selection.selectedSlideId,
      );
      if (activeSlide) {
        let newSlides: collectionOfSlides = [...state.presentation.slides];
        const newBackground: Background = createNewBackGround(type, color, image);
        activeSlide.background = newBackground;
        newSlides = newSlides.filter((slide) => slide.id !== activeSlide.id);
        newSlides.push(activeSlide);

        state.presentation.slides = newSlides;
      }
    },

    changeSlidePosition: (state, actions: PayloadAction<number>) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      const id = actions.payload;
      let activeSlideIndex = state.presentation.slides.findIndex((slide) => slide.id === id);
      let slideChangeIndex = state.presentation.slides.findIndex((slide) => slide.id === state.selection.selectedSlideId)
      let newSlides: collectionOfSlides = [...state.presentation.slides];

      if (activeSlideIndex !== -1 && slideChangeIndex !== -1) {
        let temp = newSlides[activeSlideIndex];
        newSlides[activeSlideIndex] = newSlides[slideChangeIndex];
        newSlides[slideChangeIndex] = temp;

        state.presentation.slides = newSlides;
      }
    },

    setSelection: (state, actions: PayloadAction<number>) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      state.selection.selectedSlideId = actions.payload;
    },

    removeSlide: (state) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      const removeSlideId = state.selection.selectedSlideId;
      const removeSlideIndex = state.presentation.slides.findIndex(slide => slide.id == removeSlideId);
    
      const newSlides = state.presentation.slides.filter(slide => slide.id != removeSlideId);
    
      let newSelectedSlideId = null;
      if (newSlides.length > 0) {
        const index = Math.min(removeSlideIndex, newSlides.length - 1);
        newSelectedSlideId = newSlides[index].id;
      }

      state.selection.selectedSlideId = newSelectedSlideId;
      state.presentation.slides = newSlides;
    },

    removeSlideElement: (state, actions: PayloadAction<number>) => {
      const id = actions.payload;
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      let activeSlide = state.presentation.slides.find((slide) => slide.id === state.selection.selectedSlideId);
      const newSlides: collectionOfSlides = [...state.presentation.slides];

      if (activeSlide && activeSlide.info) {
        const slideFilter = activeSlide.info.filter(element => element.id !== id);
        activeSlide.info = slideFilter;
        newSlides.filter((slide) => slide.id !== activeSlide.id).push(activeSlide);

        state.presentation.slides = newSlides;
      }
    },

    changePositionElement: (state, actions: PayloadAction<{id: number, position: Pos}>) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      const {id, position} = actions.payload;
      const activeSlide = state.presentation.slides.find((slide) => slide.id === state.selection.selectedSlideId);
      let activeElement = activeSlide?.info?.find(info => info.id === id);
      const newSlides: collectionOfSlides = [...state.presentation.slides];
    
      if (activeElement && activeSlide) {
        const newPos: Pos = {x: position.x, y: position.y};

        activeElement.position = newPos;
        newSlides.filter((slide) => slide.id !== activeSlide.id).push(activeSlide);

        state.presentation.slides = newSlides;
      }
    },

    changeSizeElement: (state, actions: PayloadAction<{size: Size, id: number}>) => {
      const {id, size} = actions.payload;
      
      const activeSlide = state.presentation.slides.find((slide) => slide.id === state.selection.selectedSlideId);
      let activeElement = activeSlide?.info?.find(info => info.id === id);
      const newSlides: collectionOfSlides = [...state.presentation.slides];

      if (activeElement && activeSlide) {
        activeElement.size = size;
        newSlides.filter((slide) => slide.id !== activeSlide.id).push(activeSlide);
        state.presentation.slides = newSlides;
      }
    },

    changeSizeAndPositionElement: (state, actions: PayloadAction<{id: number, position: Pos, size: Size}>) => {
      const { id, position, size } = actions.payload;
      const activeSlide = state.presentation.slides.find((slide) => slide.id === state.selection.selectedSlideId);
      let activeElement = activeSlide?.info?.find(info => info.id === id);
      const newSlides: collectionOfSlides = [...state.presentation.slides];

      if (activeElement && activeSlide && (activeElement.size !== size || activeElement.position !== position)) {
        activeElement.position = position;
        activeElement.size = size;

        newSlides.filter((slide) => slide.id !== activeSlide.id).push(activeSlide);
        state.presentation.slides = newSlides;
      }
    },

    changeIndexElement: (state, actions: PayloadAction<{id: number, isChangeIndex: boolean}>) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      const { id, isChangeIndex } = actions.payload;

      const activeSlide = state.presentation.slides.find((slide) => slide.id === state.selection.selectedSlideId);
      let activeElement = activeSlide?.info?.find(info => info.id === id);
      const maxIndex = activeSlide?.info?.reduce((accumulator, currentValue) => Math.max(accumulator, currentValue.index), 0);
      const newSlides: collectionOfSlides = [...state.presentation.slides];

      if (activeElement && activeSlide && maxIndex) {
        console.log(maxIndex);
        
        activeElement.index = isChangeIndex ? maxIndex : 0;

        newSlides.filter((slide) => slide.id !== activeSlide.id).push(activeSlide);
        state.presentation.slides = newSlides;
      }
    },

    changeTextSlide: (state, actions: PayloadAction<{value: string, color: string, id: number}>) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      const {color, value, id} = actions.payload;

      let activeSlide = state.presentation.slides.find((slide) => slide.id === state.selection.selectedSlideId);
      let activeText = activeSlide?.info?.find(info => info.id === id);
      const newSlides: collectionOfSlides = [...state.presentation.slides];
      if (activeSlide && activeText?.type === 'text') {
        activeText.color = color;
        activeText.text = value;
        activeSlide.info?.filter(info => info.id !== id).push(activeText);
        newSlides.filter((slide) => slide.id !== activeSlide.id).push(activeSlide);

        state.presentation.slides = newSlides;
      }
    },

    changeTextFontSize: (state, actions: PayloadAction<{select: number, id: number}>) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      const {select, id} = actions.payload;

      let activeSlide = state.presentation.slides.find((slide) => slide.id === state.selection.selectedSlideId);
      let activeText = activeSlide?.info?.find(info => info.id === id);
      const newSlides: collectionOfSlides = [...state.presentation.slides];
      if (activeSlide && activeText?.type === 'text') {
        activeText.textSize = select / 14;
        activeSlide.info?.filter(info => info.id !== id).push(activeText);
        newSlides.filter((slide) => slide.id !== activeSlide.id).push(activeSlide);

        state.presentation.slides = newSlides;
      }
    },

    changeTextType: (state, actions: PayloadAction<{id: number, isBold: boolean}>) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      const {isBold, id} = actions.payload;

      let activeSlide = state.presentation.slides.find((slide) => slide.id === state.selection.selectedSlideId);
      let activeText = activeSlide?.info?.find(info => info.id === id);
      const newSlides: collectionOfSlides = [...state.presentation.slides];
      if (activeSlide && activeText?.type === 'text') {
        activeText.isBold = isBold;
        activeSlide.info?.filter(info => info.id !== id).push(activeText);
        newSlides.filter((slide) => slide.id !== activeSlide.id).push(activeSlide);

        state.presentation.slides = newSlides;
      }
    },

    changeTextFontFamily: (state, actions: PayloadAction<{id: number, font: string}>) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
      const {font, id} = actions.payload;

      let activeSlide = state.presentation.slides.find((slide) => slide.id === state.selection.selectedSlideId);
      let activeText = activeSlide?.info?.find(info => info.id === id);
      const newSlides: collectionOfSlides = [...state.presentation.slides];
      if (activeSlide && activeText?.type === 'text') {
        activeText.font = font;

        activeSlide.info?.filter(info => info.id !== id).push(activeText);
        newSlides.filter((slide) => slide.id !== activeSlide.id).push(activeSlide);

        state.presentation.slides = newSlides;
      }
    },

    importPresentation: (state, actions: PayloadAction<string | ArrayBuffer | null>) => {
      const file = actions.payload;
      
      if (file && typeof file === 'string') {
        if (!isJSON(file)) return;
        const importPresentationEl:EditorType = JSON.parse(file);
        if(checkFileIsPresentation(importPresentationEl)) {
          state.presentation = importPresentationEl.presentation;
          state.selection = importPresentationEl.selection;
        }
      }
    },

    exportPresentation: (state, actions: PayloadAction<string>) => {
      const filename = actions.payload;
      const text = JSON.stringify(state);
      downloadAsFile(text, filename);
    },

    undoPresentation: (state) => {
      const undoList = current(state.selection.undo);
      if (undoList && undoList.length > 0) {
        state.selection.redo && state.selection.redo.push(current(state.presentation));

        const lastUndo = undoList[undoList.length - 1];
        state.selection.undo = state.selection.undo.slice(0, -1);

        if (lastUndo) {
          state.presentation = lastUndo;
        }
      }
    },

    addInUndoPresentation: (state) => {
      state.selection.undo && state.selection.undo.push(current(state.presentation));
    },

    redoPresentation: (state) => {
      const redoList = current(state.selection.redo);
      if (redoList && redoList.length > 0) {
        state.selection.undo && state.selection.undo.push(current(state.presentation));

        const lastRedo = redoList[redoList.length - 1];
        state.selection.redo = state.selection.redo.slice(0, -1);

        if (lastRedo) {
          state.presentation = lastRedo;
        }
      }
    }
  },
});

export const {actions, reducer} = presentationSlice;