import { FC, useState } from 'react';
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

type buttonsTypes = {
  activeId: number | null;
};

const Buttons: FC<buttonsTypes> = ({ activeId }) => {
  const [isActive, setIsActive] = useState<isActiveType>({
    text: false,
    background: false,
    image: false,
  });
  const [value, setValue] = useState<valueType>({
    value: '',
    color: '',
  });

  return (
    <section className={styles.buttons}>
      <div className='container'>
        <ul className={styles.buttons_boxes}>
          <li>
            <button className={classNames(activeId === null && styles.disable)}>Undo</button>
          </li>
          <li>
            <button className={classNames(activeId === null && styles.disable)}>Back</button>
          </li>
          <li>
            <button
              className={classNames(activeId === null && styles.disable)}
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
                  <button type='submit' onClick={(e) => addText(e, value, setIsActive, setValue)}>
                    Create
                  </button>
                </div>
              </form>
            )}
          </li>
          <li>
            <button
              className={classNames(activeId === null && styles.disable)}
              onClick={() =>
                activeId !== null && setIsActive((prev) => ({ ...prev, image: !prev.image }))
              }
            >
              Add image
            </button>
            {isActive.image && (
              <form className={styles.buttons_boxes_info}>
                <label htmlFor='imageEl' className={styles.image_btn_label}>
                  Find Image
                </label>
                <input
                  className={styles.image_btn}
                  autoFocus={isActive.text}
                  type='file'
                  accept='.jpeg, .jpg, .png, .svg'
                  autoComplete='off'
                  name='imageEl'
                  id='imageEl'
                  onChange={(e) => addImageEl(e, setIsActive)}
                />
              </form>
            )}
          </li>
          <li>
            <button
              className={classNames(activeId === null && styles.disable)}
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
                onSubmit={(e) => changeBackground(e, value, setIsActive)}
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
                        onChange={(e) => changeBackgoundImages(e, setIsActive)}
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
  );
};

export default Buttons;
