import { TAppState } from "../../store";

export const getText = (state: TAppState): string => {
  return state.converterReducer.text;
};
export const getDate = (state: TAppState): string => {
  return state.converterReducer.date;
};
export const getPrice = (state: TAppState): number | string => {
  return state.converterReducer.price;
};
export const getInputValid = (state: TAppState): boolean => {
  return state.converterReducer.inputValid;
};
export const getLoading = (state: TAppState): boolean => {
  return state.converterReducer.loading;
};
export const getError = (state: TAppState): Error | null => {
  return state.converterReducer.error;
};
