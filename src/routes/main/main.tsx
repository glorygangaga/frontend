import { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './App.module.scss';
import Header from '../../template/header/Header';
import Buttons from '../../components/buttons/buttons';
import Slides from '../../components/slides/slides';
import SlideShow from '../../components/slideShow/slideShow';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actions } from '../../store/slices/presentation.slice';

const Main: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean>(window.innerWidth < 800);
  const [isNotUpdate, setIsNotUpdate] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const elem = useAppSelector((state) => state.presentation);

  const savePresentationInLS = () => {
    try {
      localStorage.clear();
      localStorage.setItem('presentation', JSON.stringify(elem));
      setIsNotUpdate(false);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') dispatch(actions.undoPresentation());
      else if ((e.ctrlKey || e.metaKey) && e.key === 'y') dispatch(actions.redoPresentation());
      else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        savePresentationInLS();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, elem]);

  useEffect(() => {
    if (!isNotUpdate) setIsNotUpdate(true);

    // const intervalId = setInterval(() => savePresentationInLS(), 10000);
    // return () => clearInterval(intervalId);
  }, [elem]);

  return (
    <>
      <Header containerRef={containerRef} isNotUpdate={isNotUpdate} />
      <Buttons />
      <main className={classNames(styles.slides, active && styles.active)}>
        <Slides active={active} setActive={setActive} />
        <SlideShow containerRef={containerRef} />
      </main>
    </>
  );
};

export default Main;
