import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './buttons.module.scss';
import {
  addImageEl,
  addText,
  changeBackgoundImages,
  changeBackground,
  isActiveType,
  valueType,
} from './functions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actions } from '../../store/slices/presentation.slice';
import FindImage from './findImage/findImage';

const Buttons: FC = () => {
  const dispatch = useAppDispatch();
  const {
    selectedSlideId: activeId,
    undo,
    redo,
  } = useAppSelector((state) => state.presentation.selection);

  const [findImage, setFindImage] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<isActiveType>({
    text: false,
    background: false,
    image: false,
  });

  const [value, setValue] = useState<valueType>({
    value: '',
    color: '',
  });

  useEffect(() => {
    const body = document.body.style;
    body.overflowY = findImage ? 'hidden' : 'auto';
  }, [findImage]);

  return (
    <>
      {findImage && <FindImage setFindImage={setFindImage} />}
      <section className={styles.buttons}>
        <div className='container'>
          <ul className={styles.buttons_boxes}>
            <li>
              <button
                disabled={activeId === null || undo.length === 0}
                onClick={() => dispatch(actions.undoPresentation())}
              >
                Undo
              </button>
            </li>
            <li>
              <button
                disabled={activeId === null || redo.length === 0}
                onClick={() => dispatch(actions.redoPresentation())}
              >
                Redo
              </button>
            </li>
            <li>
              <button
                disabled={activeId === null}
                onClick={() =>
                  activeId !== null && setIsActive((prev) => ({ ...prev, text: !prev.text }))
                }
              >
                Add text
              </button>
              {isActive.text && (
                <form className={styles.buttons_boxes_info}>
                  <div>
                    <input
                      autoFocus={isActive.text}
                      type='text'
                      placeholder='Text...'
                      autoComplete='off'
                      name='textEl'
                      value={value.value}
                      onChange={(e) => setValue((prev) => ({ ...prev, value: e.target.value }))}
                    />
                  </div>
                  <div className={styles.buttons_boxes_info_btn}>
                    <button
                      type='submit'
                      onClick={(e) => addText(e, value, setIsActive, setValue, dispatch)}
                    >
                      Create
                    </button>
                  </div>
                </form>
              )}
            </li>
            <li>
              <button
                disabled={activeId === null}
                onClick={() =>
                  activeId !== null && setIsActive((prev) => ({ ...prev, image: !prev.image }))
                }
              >
                Add image
              </button>
              {isActive.image && (
                <form className={styles.buttons_boxes_info}>
                  <ul className={styles.buttons_boxes_info_lists}>
                    <li className={styles.buttons_boxes_info_list}>
                      <label htmlFor='imageEl' className={styles.image_btn_label}>
                        Import Image
                      </label>
                      <input
                        className={styles.image_btn}
                        autoFocus={isActive.text}
                        type='file'
                        accept='.jpeg, .jpg, .png, .svg'
                        autoComplete='off'
                        name='imageEl'
                        id='imageEl'
                        onChange={(e) => addImageEl(e, setIsActive, dispatch)}
                      />
                    </li>
                    <li
                      className={styles.buttons_boxes_info_list}
                      onClick={() => setFindImage((prev) => !prev)}
                    >
                      <p>Find Image</p>
                    </li>
                  </ul>
                </form>
              )}
            </li>
            <li>
              <button
                disabled={activeId === null}
                onClick={() =>
                  activeId !== null &&
                  setIsActive((prev) => ({ ...prev, background: !prev.background }))
                }
              >
                Change background
              </button>
              {isActive.background && (
                <form
                  className={styles.buttons_boxes_info}
                  onSubmit={(e) => changeBackground(e, value, setIsActive, dispatch)}
                >
                  <ul className={styles.buttons_boxes_bg}>
                    <li>
                      <p>Color</p>
                      <div
                        className={classNames(
                          styles.buttons_boxes_bg_color,
                          value.color && styles.active,
                        )}
                      >
                        <input
                          type='text'
                          autoComplete='off'
                          placeholder='color'
                          name='backgroundColor'
                          value={value.color}
                          onChange={(e) => setValue((prev) => ({ ...prev, color: e.target.value }))}
                        />
                      </div>
                    </li>
                    <li>
                      <p>Gradient</p>
                      <div className={styles.buttons_boxes_bg_color}></div>
                    </li>
                    <li>
                      <p>Image</p>
                      <div className={styles.buttons_boxes_bg_color}>
                        <label htmlFor='backgroundColorImage' className={styles.image_input_label}>
                          Find Image
                        </label>
                        <input
                          className={styles.image_input}
                          type='file'
                          autoComplete='off'
                          placeholder='color'
                          id='backgroundColorImage'
                          name='backgroundColorImage'
                          onChange={(e) => changeBackgoundImages(e, setIsActive, dispatch)}
                        />
                      </div>
                    </li>
                  </ul>
                </form>
              )}
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Buttons;
