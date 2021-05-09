import { service, TBaseAndRates, TRate } from "../../services/currency-service";

export const FETCH_RATES_REQUEST = "FETCH_RATES_REQUEST";
export const FETCH_RATES_SUCCESS = "FETCH_RATES_SUCCESS";
export const FETCH_RATES_FUILURE = "FETCH_RATES_FUILURE";

type TFeatchRatesRequest = {
  type: typeof FETCH_RATES_REQUEST;
};

const ratesRequested = (): TFeatchRatesRequest => ({
  type: FETCH_RATES_REQUEST,
});

type TFetchRatesSuccess = {
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

type TFetchRatesError = {
  type: typeof FETCH_RATES_FUILURE;
  payload: Error;
};

const ratesError = (error: Error): TFetchRatesError => ({
  type: FETCH_RATES_FUILURE,
  payload: error,
});

export const fetchRates = (base: string) => (dispatch: any) => {
  dispatch(ratesRequested());
  service
    .getLatestByBase(base)
    .then((data) => dispatch(ratesLoaded(data)))
    .catch((error: Error) => dispatch(ratesError(error)));
};

export type TActionsCurrencyRatesReducer = {
  fetchRates: any;
};

export const actionsCurrencyRatesReducer = {
  fetchRates,
};
