import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './header.module.scss';
import {
  changeTitle,
  exportPDRPres,
  exportPres,
  importPres,
  isActiveType,
  valueType,
} from './functions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

type headerProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  isNotUpdate: boolean;
};

const Header: FC<headerProps> = ({ containerRef, isNotUpdate }) => {
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.presentation.presentation.title);
  const activeId = useAppSelector((state) => state.presentation.selection.selectedSlideId);

  const [isActive, setIsActive] = useState<isActiveType>({ file: false });
  const [value, setValue] = useState<valueType>({
    title,
    importPresentation: null,
    presentationFileName: '',
    PDFPresentationFileName: '',
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
    if (value.title.length > 100) return;
    document.title = `Presentation - ${value.title || 'presentation'}`;
  }, [value.title]);

  return (
    <header className={styles.header} ref={containerRef}>
      <div className='container'>
        <div className={styles.header_info}>
          {isNotUpdate && <span className={styles.header_isOpen}>*</span>}
          <div className={styles.header_main}>
            <input
              type='text'
              name='title'
              placeholder='Title...'
              onDrop={(e) => e.preventDefault()}
              onChange={(e) => changeTitle(e, setValue, dispatch)}
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
                          onDrop={(e) => e.preventDefault()}
                          onChange={(e) => importPres(e, setIsActive, dispatch)}
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
                          onDrop={(e) => e.preventDefault()}
                          onChange={(e) =>
                            setValue((prev) => ({ ...prev, presentationFileName: e.target.value }))
                          }
                        />
                        <button
                          className={styles.file_element_inner_btn}
                          type='submit'
                          onClick={(e) => exportPres(e, value, setValue, dispatch)}
                        >
                          Submit
                        </button>
                      </form>
                    </li>
                    <li>
                      <p>Export as PDF</p>
                      <form className={styles.file_element_inner}>
                        <input
                          type='text'
                          id='exportPDFPres'
                          name='exportPDFPres'
                          placeholder='Filename...'
                          value={value.PDFPresentationFileName}
                          onDrop={(e) => e.preventDefault()}
                          onChange={(e) =>
                            setValue((prev) => ({
                              ...prev,
                              PDFPresentationFileName: e.target.value,
                            }))
                          }
                        />
                        <button
                          className={styles.file_element_inner_btn}
                          type='submit'
                          onClick={(e) => exportPDRPres(e, value, setValue)}
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
