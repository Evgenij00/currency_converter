/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import { ThunkAction } from "redux-thunk";
import { service, TBaseAndRates, TRate } from "../../currency-service";
import { TAppState } from "../../store";

export const FETCH_RATES_REQUEST = "FETCH_RATES_REQUEST";
export const FETCH_RATES_SUCCESS = "FETCH_RATES_SUCCESS";
export const FETCH_RATES_FUILURE = "FETCH_RATES_FUILURE";

export type TActions = TActionRequest | TActionSuccess | TActionError;

type TActionRequest = {
  type: typeof FETCH_RATES_REQUEST;
};

const ratesRequested = (): TActionRequest => ({
  type: FETCH_RATES_REQUEST,
});

type TActionSuccess = {
  type: typeof FETCH_RATES_SUCCESS;
  payload: {
    base: string;
    rates: TRate[];
  };
};

const ratesLoaded = (data: TBaseAndRates): TActionSuccess => {
  return {
    type: FETCH_RATES_SUCCESS,
    payload: data,
  };
};

type TActionError = {
  type: typeof FETCH_RATES_FUILURE;
  payload: Error;
};

export const ratesError = (error: Error): TActionError => ({
  type: FETCH_RATES_FUILURE,
  payload: error,
});

type ThunkType = ThunkAction<void, TAppState, unknown, TActions>;

export const fetchLatestRates = (base: string): ThunkType => (dispatch) => {
  dispatch(ratesRequested());
  service
    .getLatestRates(base)
    .then((data) => dispatch(ratesLoaded(data)))
    .catch((error: Error) => dispatch(ratesError(error)));
};

export type TCallbacksCurrencyRatesReducer = {
  fetchLatestRates: (base: string) => void;
};

export const callbacksCurrencyRatesReducer = {
  fetchLatestRates,
};
