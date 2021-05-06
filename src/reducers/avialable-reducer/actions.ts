export const FETCH_AVIALABLE_REQUEST = "FETCH_AVIALABLE_REQUEST";
export const FETCH_AVIALABLE_SUCCESS = "FETCH_AVIALABLE_SUCCESS";
export const FETCH_AVIALABLE_FUILURE = "FETCH_AVIALABLE_FUILURE";

export type TFeatchAvialableRequest = {
  type: typeof FETCH_AVIALABLE_REQUEST;
};

const avialableRequested = (): TFeatchAvialableRequest => ({
  type: FETCH_AVIALABLE_REQUEST,
});

export type TFetchAvialableSuccess = {
  type: typeof FETCH_AVIALABLE_SUCCESS;
  payload: [string, string][];
};

const avialableLoaded = (
  currencies: [string, string][]
): TFetchAvialableSuccess => {
  return {
    type: FETCH_AVIALABLE_SUCCESS,
    payload: currencies,
  };
};

export type TFetchAvialableError = {
  type: typeof FETCH_AVIALABLE_FUILURE;
  payload: Error;
};

const avialableError = (error: Error): TFetchAvialableError => ({
  type: FETCH_AVIALABLE_FUILURE,
  payload: error,
});

export type TActionsAvialableReducer = {
  avialableRequested: () => TFeatchAvialableRequest;
  avialableLoaded: (currencies: [string, string][]) => TFetchAvialableSuccess;
  avialableError: (error: Error) => TFetchAvialableError;
};

export const actionsAvialableReducer = {
  avialableRequested,
  avialableLoaded,
  avialableError,
};
