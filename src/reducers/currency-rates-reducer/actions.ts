import { TBaseAndRates, TRate } from "../../services/currency-service";

export const FETCH_RATES_REQUEST = "FETCH_RATES_REQUEST";
export const FETCH_RATES_SUCCESS = "FETCH_RATES_SUCCESS";
export const FETCH_RATES_FUILURE = "FETCH_RATES_FUILURE";

export type TFeatchRatesRequest = {
  type: typeof FETCH_RATES_REQUEST;
};

const ratesRequested = (): TFeatchRatesRequest => ({
  type: FETCH_RATES_REQUEST,
});

export type TFetchRatesSuccess = {
  type: typeof FETCH_RATES_SUCCESS;
  payload: {
    base: string;
    rates: TRate[];
  };
};

const ratesLoaded = (data: TBaseAndRates): TFetchRatesSuccess => {
  return {
    type: FETCH_RATES_SUCCESS,
    payload: data,
  };
};

export type TFetchRatesError = {
  type: typeof FETCH_RATES_FUILURE;
  payload: Error;
};

const ratesError = (error: Error): TFetchRatesError => ({
  type: FETCH_RATES_FUILURE,
  payload: error,
});

export type TActionsCurrencyRatesReducer = {
  ratesRequested: () => TFeatchRatesRequest;
  ratesLoaded: (data: TBaseAndRates) => TFetchRatesSuccess;
  ratesError: (error: Error) => TFetchRatesError;
};

export const actionsCurrencyRatesReducer = {
  ratesLoaded,
  ratesError,
  ratesRequested,
};
