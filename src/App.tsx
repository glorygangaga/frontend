import { FC, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './App.module.scss';
import Slides from './components/slides/slides';
import Header from './template/header/Header';
import SlideShow from './components/slideShow/slideShow';
import Buttons from './components/buttons/buttons';
import { EditorType } from './store/EditorType';

type AppProps = {
  editor: EditorType;
};

const App: FC<AppProps> = ({ editor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActvie] = useState<boolean>(window.innerWidth < 800);

  return (
    <>
      <Header
        titleEl={editor.presentation.title}
        activeId={editor.selection.selectedSlideId}
        containerRef={containerRef}
      />
      <Buttons activeId={editor.selection.selectedSlideId} />
      <main className={classNames(styles.slides, active && styles.active)}>
        <Slides
          presentation={editor.presentation}
          activeId={editor.selection.selectedSlideId}
          active={active}
          setActvie={setActvie}
        />
        <SlideShow
          containerRef={containerRef}
          activeId={editor.selection.selectedSlideId}
          presentation={editor.presentation}
        />
      </main>
    </>
  );
};

export default App;
