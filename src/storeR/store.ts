import { configureStore } from '@reduxjs/toolkit'
import { Presentation } from '../types/types';

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

// const reducer = {
//   presentation,
//   selection: {
//     selectedSlideId: presentation.slides[0]?.id || null,
//   }
// }

export const store = configureStore({
  preloadedState: {
    presentation,
    selection: {
      selectedSlideId: presentation.slides[0]?.id || null,
    }
  },
  reducer: {},
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;