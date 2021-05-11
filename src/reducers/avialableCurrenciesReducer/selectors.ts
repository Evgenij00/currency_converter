import { TCurrency } from "../../currency-service";
import { TAppState } from "../../store";

export const getAvialableCurrencies = (state: TAppState): [] | TCurrency[] => {
  return state.avialableCurrenciesReducer.avialableCurrencies;
};
export const getLoading = (state: TAppState): boolean => {
  return state.avialableCurrenciesReducer.loading;
};
export const getError = (state: TAppState): Error | null => {
  return state.avialableCurrenciesReducer.error;
};
