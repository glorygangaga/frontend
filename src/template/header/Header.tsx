import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './header.module.scss';
import { changeTitle, exportPres, importPres, isActiveType, valueType } from './functions';

type headerProps = {
  titleEl: string;
  activeId: number | null;
  containerRef: React.RefObject<HTMLDivElement>;
};

const Header: FC<headerProps> = ({ titleEl, containerRef, activeId }) => {
  const [isActive, setIsActive] = useState<isActiveType>({ file: false });
  const [value, setValue] = useState<valueType>({
    title: titleEl,
    importPresentation: null,
    presentationFileName: '',
  });

  function isVideoInFullscreen() {
    if (!containerRef.current || activeId === null) return;
    if (document.fullscreenElement?.nodeName === 'VIDEO') {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  }

  useEffect(() => {
    document.title = `Presentation - ${value.title || 'presentation'}`;
  }, [value.title]);

  return (
    <header className={styles.header} ref={containerRef}>
      <div className='container'>
        <div className={styles.header_info}>
          <div className={styles.header_main}>
            <input
              type='text'
              name='title'
              placeholder='Title...'
              onChange={(e) => changeTitle(e, setValue)}
              value={value.title}
            />
            <ul className={styles.header_main_lists}>
              <li>
                <button onClick={() => setIsActive((prev) => ({ ...prev, file: !prev.file }))}>
                  File
                </button>
                {isActive.file && (
                  <ul className={styles.file_element}>
                    <li>
                      <p>Import presentation</p>
                      <form className={styles.file_element_inner}>
                        <label htmlFor='importPresentation' className={styles.file_input_label}>
                          Find file
                        </label>
                        <input
                          className={styles.file_input}
                          type='file'
                          accept='.json'
                          id='importPresentation'
                          name='importPresentation'
                          onChange={(e) => importPres(e, setIsActive)}
                        />
                      </form>
                    </li>
                    <li>
                      <p>Export presentation</p>
                      <form className={styles.file_element_inner}>
                        <input
                          type='text'
                          id='exportPres'
                          name='exportPres'
                          placeholder='Filename...'
                          value={value.presentationFileName}
                          onChange={(e) =>
                            setValue((prev) => ({ ...prev, presentationFileName: e.target.value }))
                          }
                        />
                        <button
                          className={styles.file_element_inner_btn}
                          type='submit'
                          onClick={(e) => exportPres(e, value, setValue, setIsActive)}
                        >
                          Submit
                        </button>
                      </form>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button>Edit</button>
              </li>
              <li>
                <button>View</button>
              </li>
            </ul>
          </div>
          <div className={styles.header_btns}>
            <button
              className={classNames(activeId === null && styles.disable)}
              onClick={isVideoInFullscreen}
            >
              Present
            </button>
            <button>Share</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;