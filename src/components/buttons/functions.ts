import { dispatch } from '../../store/editor';
import { addText as AddTextToSlide } from '../../store/addText';
import { changeBackground as changeBackgroundSlide } from '../../store/changeBackground';
import { addImage } from '../../store/addImage';
import { changeBackgroundImage } from '../../store/changebackgroundImage';

export type valueType = {
  value: string;
  color: string;
};

export type isActiveType = {
  text: boolean;
  background: boolean;
  image: boolean;
}

type setIsActiveType = React.Dispatch<React.SetStateAction<isActiveType>>
type setValueType = React.Dispatch<React.SetStateAction<valueType>>


export const addText = (e: React.FormEvent<HTMLButtonElement>, value: valueType, setIsActive: setIsActiveType, setValue: setValueType) => {
  e.preventDefault();
  if (!value.value) return;
  dispatch(AddTextToSlide, { value: value.value });
  setValue((prev) => ({ ...prev, value: '' }));
  setIsActive((prev) => ({ ...prev, text: false }));
};

export const addImageEl = (e: React.ChangeEvent<HTMLInputElement>, setIsActive: setIsActiveType) => {
  if (!e.target.files || !e.target.value[0]) return;
  const elem = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    dispatch(addImage, { image: reader.result });
    setIsActive((prev) => ({ ...prev, image: false }));
  };
  reader.readAsDataURL(elem);
};

export const changeBackground = (e: React.FormEvent<HTMLFormElement>, value: valueType, setIsActive: setIsActiveType) => {
  e.preventDefault();
  dispatch(changeBackgroundSlide, { color: value.color });
  setIsActive((prev) => ({ ...prev, background: false }));
};

export const changeBackgoundImages = (e: React.ChangeEvent<HTMLInputElement>, setIsActive: setIsActiveType) => {
  if (!e.target.files || !e.target.value[0]) return;
  const elem = e.target.files[0];

  const reader = new FileReader();
  reader.onloadend = () => {
    dispatch(changeBackgroundImage, { image: reader.result });
    setIsActive((prev) => ({ ...prev, background: false }));
  };

  reader.readAsDataURL(elem);
};