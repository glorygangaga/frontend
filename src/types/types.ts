// const changePresentationTitle = (presentation: presentation, title: string): presentation => presentation = {...presentation, title};

// const handleSlide = (slides: collectionOfSlides, slide: slide): collectionOfSlides => {
//   const index = slides.slides.findIndex(slideEl => slideEl.id === slide.id);
//   if(index !== -1) slides.slides.splice(index, 1);
//   else slides.slides.push(slide);
//   return slides;
// }

// const changePositionOfSlide = (slides: collectionOfSlides, slide: slide, pos: number): collectionOfSlides => {
//   const index = slides.slides.findIndex(slideEl => slideEl.id === slide.id);
//   slides.slides.splice(index, 1);
//   slides.slides.splice(pos, 0, slide);
//   return slides;
// }

// const handleInfo = (slide: slide, info: text | image): slide => {
//   if (typeof slide.info === 'undefined') {
//     slide.info = [info]
//   } else {
//     const index = slide.info.findIndex(infoEl => infoEl.id === info.id);
//     if(index !== -1) slide.info.splice(index, 1);
//     else slide.info.push(info);
//   }
//   return slide;
// }

// const changePositionOfInfo = (info: text | image, pos: pos): text | image => ({...info, position: pos});

// const changeSizeOfinfo = (info: text | image, newSize: size): text | image => ({...info, size: newSize});

// const changeTextOfSlide = (info: text, newText: string): text => ({...info, text: newText});

// const changeSizeOfText = (info: text, newSize: size): text => ({...info, size: newSize});

// const changeFontOfText = (slide: slide, font: string): slide => ({...slide, font});

// const changeBackgroundOfSlide = (slide: slide, background: background): slide => ({...slide, background});


// // LAB 2

// const presentation1: presentation = {
//   id: 0,
//   title: 'text',
//   collections: {
//     id: 0,
//     slides: [
//       {id: 0, title: 'slide 1', font: 'Times New Roman', background: {type: 'solid'}},
//     ],
//   },
// };

// const presentation2: presentation = {
//   id: 1,
//   title: 'text 2',
//   collections: {
//     id: 0,
//     slides: [
//       {id: 0, title: 'slide 1', font: 'Ubuntu', background: {type: 'solid'}},
//       {id: 2, title: 'slide 2', font: 'Ubuntu', background: {type: 'solid'}},
//       {id: 3, title: 'slide 3', font: 'Ubuntu', background: {type: 'solid'}},
//       {id: 4, title: 'slide 4', font: 'Ubuntu', background: {type: 'solid'}},
//     ],
//   },
// };

// changePresentationTitle(presentation1, 'Title change');

// handleSlide(presentation1.collections, {id: 1, title: 'slide 2', font: 'Ubuntu', background: {type: 'solid'}});
// handleSlide(presentation1.collections, {id: 2, title: 'slide 3', font: 'Ubuntu2', background: {type: 'solid'}});

// changePositionOfSlide(presentation1.collections, presentation1.collections.slides[0], 1);

// handleInfo(presentation1.collections.slides[0], {id: 0, type: 'text', text: 'someText', position: {ox: 0, oy: 15}, size: {width: 100, height: 100}});
// handleInfo(presentation1.collections.slides[0], {id: 1, type: 'text', text: 'someText 2', position: {ox: 10, oy: 0}, size: {width: 150, height: 100}});
// // handleInfo(presentation1.collections.slides[0], {id: 0, type: 'text', text: 'someText', position: {ox: 0, oy: 0}, size: {width: 100, height: 100}});
  
// changeBackgroundOfSlide(presentation1.collections.slides[0], {type: 'image', src: '/some/path.png'});


export type Presentation = {
  id: number;
  title: string;
  slides: collectionOfSlides;
}

export type collectionOfSlides = Slide[];

export type Slide = {
  id: number;
  background: Background;
  info?: (Image | TextElement)[];
}

export type InfoObject = {
  id: number;
  type: 'image' | 'text';
  position: Pos;
  size: Size;
}

export type Size = {
  width: number;
  height: number;
}

export type Pos = {
  x: number;
  y: number;
}

export type TextElement = InfoObject & {
  text: string;
  font: string;
  type: 'text';
  color: string;
}

export type Image = InfoObject & {
  src: string;
  type: 'image';
}

export type Background = {
  type: 'image' | 'solid' | 'gradient';
  src?: string;
  color?: string;
  gradient?: Gradient;
}

export type Gradient = {
  type: 'linear' | 'radial';
  color: string[];
  position?: number;
}

export function renamePresentationTitle(newTitle: string, presentation: Presentation): Presentation {
  return {
    ...presentation,
    title: newTitle,
  };
}

export function addSlide(presentation: Presentation, slide: Slide): Presentation {
  return {
    ...presentation,
    slides: [...presentation.slides, slide],
  };
}

export function removeSlide(presentation: Presentation, slideId: number): Presentation {
  return {
    ...presentation,
    slides: presentation.slides.filter(slide => slide.id !== slideId),
  };
}

export function changeSlidePosition(presentation: Presentation, slideId: number, newIndex: number): Presentation {
  function findSlideIndex(slides: Slide[], slideId: number): number {
      for (let i = 0; i < slides.length; i++) 
        if (slides[i].id === slideId) return i;
      return -1;
    }
    
  const currentIndex = findSlideIndex(presentation.slides, slideId);

  if (currentIndex === -1 || newIndex < 0 || newIndex >= presentation.slides.length) 
    throw new Error("Неверный индекс или слайд не найден");

  const updatedSlides = [...presentation.slides];
  const [movedSlide] = updatedSlides.splice(currentIndex, 1);
  updatedSlides.splice(newIndex, 0, movedSlide);

  return {
    ...presentation,
    slides: updatedSlides,
  };
}

export function addElementToSlide(slide: Slide, SlideElement: (Image | TextElement)): Slide {
  if(slide.info) {
    return {
      ...slide,
      info: [...slide.info, SlideElement],
    };
  }
  return {
    ...slide,
    info: [SlideElement],
  };
}

export function removeElementFromSlide(slide: Slide, elementId: number): Slide | null {
  if (slide.info) {
    return {
      ...slide,
      info: slide.info.filter(SlideElement => SlideElement.id !== elementId),
    };
  } else {
    return null;
  };
}

export function changeElementPosition(slide: Slide, elementId: number, newPosition: { x: number, y: number }): Slide | null {
  if (slide.info) {
    return {
      ...slide,
      info: slide.info.map(item =>
        item.id === elementId ? { 
          ...item, 
          pos: newPosition 
        } : item
      ),
    };
  } else {
    return null;
  };
}

export function changeElementSize(slide: Slide, elementId: number, newSize: { width: number, height: number }): Slide | null {
  if (slide.info) {
    return {
      ...slide,
      info: slide.info.map(item =>
        item.id === elementId ? { 
          ...item,
          size: newSize
        } : item
      ),
    };
  } else {
    return null;
  };
}

export function changeTextContent(slide: Slide, elementId: number, newText: string): Slide | null {
  if (slide.info) {
    return {
      ...slide,
      info: slide.info.map(item =>
        item.id === elementId && item.type === "text" ? { 
          ...item, 
          text: newText 
        } : item
      ),
    };
  } else {
    return null;
  };
}

export function changeTextFontSize(slide: Slide, elementId: number, newSize: { width: number, height: number }): Slide | null {
  if (slide.info) {
    return {
      ...slide,
      info: slide.info.map(item =>
        item.id === elementId && item.type === "text" ? { 
          ...item,
          size: newSize
        } : item
      ),
    };
  } else {
    return null;
  };
}

export function changeTextFontFamily(slide: Slide, elementId: number, newFontFamily: string): Slide | null {
  if (slide.info) {
    return {
      ...slide,
      info: slide.info.map(item =>
        item.id === elementId && item.type === "text" ? { 
          ...item, 
          fontFamily: newFontFamily 
        } : item
      ),
    };
  } else {
    return null;
  };
}

export function changeSlideBackground(slide: Slide, newBackground: Background): Slide {
  return {
    ...slide,
    background: newBackground,
  };
}