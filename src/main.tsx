import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
// import { store } from './storeR/store.ts';
// import { Provider } from 'react-redux';
import { addEditorChangeHandler, getEditor } from './store/editor.ts';

const root = createRoot(document.getElementById('root')!);
function render() {
  root.render(
    <StrictMode>
      <App editor={getEditor()} />
    </StrictMode>,
  );
}

addEditorChangeHandler(render);
render();

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </StrictMode>,
// );
