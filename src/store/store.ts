import { configureStore, combineReducers, createListenerMiddleware } from '@reduxjs/toolkit'
import { reducer as PresentationReducer } from './slices/presentation.slice';
import { ImageApi } from './api/image.api';

const reducer = combineReducers({
  presentation: PresentationReducer,
  [ImageApi.reducerPath] : ImageApi.reducer,
});

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({serializableCheck: false})
      .prepend(listenerMiddleware.middleware)
      .concat(ImageApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch