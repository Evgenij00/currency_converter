import { service, TCurrency } from "../../services/currency-service";

export const FETCH_AVIALABLE_REQUEST = "FETCH_AVIALABLE_REQUEST";
export const FETCH_AVIALABLE_SUCCESS = "FETCH_AVIALABLE_SUCCESS";
export const FETCH_AVIALABLE_FUILURE = "FETCH_AVIALABLE_FUILURE";

type TFeatchAvialableRequest = {
  type: typeof FETCH_AVIALABLE_REQUEST;
};

const avialableRequested = (): TFeatchAvialableRequest => ({
  type: FETCH_AVIALABLE_REQUEST,
});

type TFetchAvialableSuccess = {
  type: typeof FETCH_AVIALABLE_SUCCESS;
  payload: TCurrency[];
};

const avialableLoaded = (currencies: TCurrency[]): TFetchAvialableSuccess => {
  return {
    type: FETCH_AVIALABLE_SUCCESS,
    payload: currencies,
  };
};

type TFetchAvialableError = {
  type: typeof FETCH_AVIALABLE_FUILURE;
  payload: Error;
};

const avialableError = (error: Error): TFetchAvialableError => ({
  type: FETCH_AVIALABLE_FUILURE,
  payload: error,
});

const fetchCurrencies = () => (dispatch: any) => {
  dispatch(avialableRequested());
  service
    .getCurrencies()
    .then((currencies) => dispatch(avialableLoaded(currencies)))
    .catch((error: Error) => dispatch(avialableError(error)));
};

export type TActionsAvialableReducer = {
  fetchCurrencies: () => any;
};

export const actionsAvialableReducer = {
  fetchCurrencies,
};
