import { dispatchType } from '../../types/types';
import { actions } from '../../store/slices/presentation.slice';

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


export const addText = (e: React.FormEvent<HTMLButtonElement>, value: valueType, setIsActive: setIsActiveType, setValue: setValueType, dispatch: dispatchType) => {
  e.preventDefault();
  if (!value.value) return;
  dispatch(actions.addText({value: value.value}));
  setValue((prev) => ({ ...prev, value: '' }));
  setIsActive((prev) => ({ ...prev, text: false }));
};

export const addImageEl = (e: React.ChangeEvent<HTMLInputElement>, setIsActive: setIsActiveType, dispatch: dispatchType) => {
  if (!e.target.files || !e.target.value[0]) return;
  const elem = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    if (!reader.result) return;
    dispatch(actions.addImage({image: reader.result}));
    setIsActive((prev) => ({ ...prev, image: false }));
  };
  reader.readAsDataURL(elem);
};

export const changeBackground = (e: React.FormEvent<HTMLFormElement>, value: valueType, setIsActive: setIsActiveType, dispatch: dispatchType) => {
  e.preventDefault();
  dispatch(actions.changeBackground({color: value.color, type: 'solid' }));
  setIsActive((prev) => ({ ...prev, background: false }));
};

export const changeBackgoundImages = (e: React.ChangeEvent<HTMLInputElement>, setIsActive: setIsActiveType, dispatch: dispatchType) => {
  if (!e.target.files || !e.target.value[0]) return;
  const elem = e.target.files[0];

  const reader = new FileReader();
  reader.onloadend = () => {
    if (!reader.result) return;
    dispatch(actions.changeBackground({ image: reader.result, type: 'image' }));
    setIsActive((prev) => ({ ...prev, background: false }));
  };

  reader.readAsDataURL(elem);
};