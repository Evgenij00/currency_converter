/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import { ThunkAction } from "redux-thunk";
import { service, TCurrency } from "../../currency-service";
import { TAppState } from "../../store";

export const FETCH_AVIALABLE_REQUEST = "FETCH_AVIALABLE_REQUEST";
export const FETCH_AVIALABLE_SUCCESS = "FETCH_AVIALABLE_SUCCESS";
export const FETCH_AVIALABLE_FUILURE = "FETCH_AVIALABLE_FUILURE";

export type TActions = TActionRequest | TActionSuccess | TActionError;

type TActionRequest = {
  type: typeof FETCH_AVIALABLE_REQUEST;
};

const avialableRequested = (): TActionRequest => ({
  type: FETCH_AVIALABLE_REQUEST,
});

type TActionSuccess = {
  type: typeof FETCH_AVIALABLE_SUCCESS;
  payload: TCurrency[];
};

const avialableLoaded = (currencies: TCurrency[]): TActionSuccess => {
  return {
    type: FETCH_AVIALABLE_SUCCESS,
    payload: currencies,
  };
};

type TActionError = {
  type: typeof FETCH_AVIALABLE_FUILURE;
  payload: Error;
};

const avialableError = (error: Error): TActionError => ({
  type: FETCH_AVIALABLE_FUILURE,
  payload: error,
});

type ThunkType = ThunkAction<void, TAppState, unknown, TActions>;

const fetchCurrencies = (): ThunkType => (dispatch) => {
  dispatch(avialableRequested());
  service
    .getCurrencies()
    .then((currencies) => dispatch(avialableLoaded(currencies)))
    .catch((error: Error) => dispatch(avialableError(error)));
};

export type TCallbacksAvialableCurrenciesReducer = {
  fetchCurrencies: () => void;
};

export const callbacksAvialableCurrenciesReducer = {
  fetchCurrencies,
};
