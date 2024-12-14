import { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './routes/main/main';
const Player = lazy(() => import('./routes/player/player'));

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route
          path='player'
          element={
            <Suspense>
              <Player />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
