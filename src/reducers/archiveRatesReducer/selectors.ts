import { TRate } from "../../currency-service";
import { TAppState } from "../../store";

export const getBase = (state: TAppState): string => {
  return state.archiveRatesReducer.base;
};
export const getDate = (state: TAppState): string => {
  return state.archiveRatesReducer.date;
};
export const getArchiveRates = (state: TAppState): TRate[] | [] => {
  return state.archiveRatesReducer.archiveRates;
};
export const getLoading = (state: TAppState): boolean => {
  return state.archiveRatesReducer.loading;
};
export const getError = (state: TAppState): Error | null => {
  return state.archiveRatesReducer.error;
};
