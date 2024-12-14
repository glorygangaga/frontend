import { actions } from "../../store/slices/presentation.slice";
import { dispatchType } from "../../types/types";

export type valueType = {
  title: string;
  importPresentation: File | null;
  presentationFileName: string;
  PDFPresentationFileName: string;
}

export type isActiveType = {
  file: boolean;
}

type setIsActiveType =  React.Dispatch<React.SetStateAction<isActiveType>>
type setValueType = React.Dispatch<React.SetStateAction<valueType>>;

export const changeTitle = (e: React.ChangeEvent<HTMLInputElement>, setValue: setValueType, dispatch: dispatchType) => {
  if (!e.target.value) return;
  setValue((prev) => ({ ...prev, title: e.target.value }));
  dispatch(actions.renamePresentationTitle(e.target.value));
};

export const importPres = (e: React.ChangeEvent<HTMLInputElement>, setIsActive: setIsActiveType, dispatch: dispatchType) => {
  e.preventDefault();
  if (!e.target.files || !e.target.value[0]) return;
  const elem = e.target.files[0];

  const reader = new FileReader();
  reader.onloadend = () => {
    dispatch(actions.importPresentation(reader.result));
    setIsActive((prev) => ({ ...prev, file: false }));
  };
  reader.readAsText(elem);
};

export const exportPres = (e: React.FormEvent<HTMLButtonElement>, value: valueType, setValue: setValueType, dispatch: dispatchType) => {
  e.preventDefault();
  if (!value.presentationFileName) return;
  dispatch(actions.exportPresentation(value.presentationFileName));
  setValue((prev) => ({ ...prev, presentationFileName: '' }));
};

export const exportPDRPres = (e: React.FormEvent<HTMLButtonElement>, value: valueType, setValue: setValueType) => {
  e.preventDefault();
  if (!value.PDFPresentationFileName) return;
  setValue((prev) => ({ ...prev, PDFPresentationFileName: '' }));
}