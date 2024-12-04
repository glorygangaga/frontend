import { dispatch } from "../../store/editor";
import { exportPresentation } from "../../store/exportPresentation";
import { importPresentation } from "../../store/importPresentation";
import { renamePresentationTitle } from "../../types/types";

export type valueType = {
  title: string;
  importPresentation: File | null;
  presentationFileName: string;
}

export type isActiveType = {
  file: boolean;
}

type setIsActiveType =  React.Dispatch<React.SetStateAction<isActiveType>>
type setValueType = React.Dispatch<React.SetStateAction<valueType>>;

export const changeTitle = (e: React.ChangeEvent<HTMLInputElement>, setValue: setValueType) => {
  setValue((prev) => ({ ...prev, title: e.target.value }));
  dispatch(renamePresentationTitle, e.target.value);
};

export const importPres = (e: React.ChangeEvent<HTMLInputElement>, setIsActive: setIsActiveType) => {
  e.preventDefault();
  if (!e.target.files || !e.target.value[0]) return;
  const elem = e.target.files[0];

  const reader = new FileReader();
  reader.onloadend = () => {
    dispatch(importPresentation, { jsonFile: reader.result });
    setIsActive((prev) => ({ ...prev, file: false }));
  };
  reader.readAsText(elem);
};

export const exportPres = (e: React.FormEvent<HTMLButtonElement>, value: valueType, setValue: setValueType, setIsActive: setIsActiveType) => {
  e.preventDefault();
  if (!value.presentationFileName) return;
  dispatch(exportPresentation, { filename: value.presentationFileName });
  setValue((prev) => ({ ...prev, presentationFileName: '' }));
  setIsActive((prev) => ({ ...prev, file: false }));
};