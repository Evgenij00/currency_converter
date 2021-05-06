export const FETCH_PRICE_REQUEST = "FETCH_PRICE_REQUEST";
export const FETCH_PRICE_SUCCESS = "FETCH_PRICE_SUCCESS";
export const FETCH_PRICE_FUILURE = "FETCH_PRICE_FUILURE";
export const SET_CONVERTER_TEXT = "SET_CONVERTER_TEXT";
export const SET_CONVERTER_DATE = "SET_CONVERTER_DATE";

export type TFetchPriceRequest = {
  type: typeof FETCH_PRICE_REQUEST;
};

export const priceRequest = (): TFetchPriceRequest => ({
  type: FETCH_PRICE_REQUEST,
});

export type TFetchPriceSuccess = {
  type: typeof FETCH_PRICE_SUCCESS;
  payload: number;
};

export const priceLoaded = (price: number): TFetchPriceSuccess => {
  return {
    type: FETCH_PRICE_SUCCESS,
    payload: price,
  };
};

export type TFetchPriceError = {
  type: typeof FETCH_PRICE_FUILURE;
  payload: Error;
};

export const priceError = (error: Error): TFetchPriceError => {
  return {
    type: FETCH_PRICE_FUILURE,
    payload: error,
  };
};

export type TConverterText = {
  type: typeof SET_CONVERTER_TEXT;
  payload: { text: string; inputValid: boolean };
};

export const setConverterText = (
  text: string,
  inputValid: boolean
): TConverterText => {
  return {
    type: SET_CONVERTER_TEXT,
    payload: { text, inputValid },
  };
};

export type TConverterDate = {
  type: typeof SET_CONVERTER_DATE;
  payload: string;
};

export const setConverterDate = (date: string): TConverterDate => {
  return {
    type: SET_CONVERTER_DATE,
    payload: date,
  };
};

export type TActionsConverterReducer = {
  priceRequest: () => TFetchPriceRequest;
  priceLoaded: (price: number) => TFetchPriceSuccess;
  priceError: (error: Error) => TFetchPriceError;
  setConverterText: (text: string, inputValid: boolean) => TConverterText;
  setConverterDate: (date: string) => TConverterDate;
};

export const actionsConverterReducer = {
  priceRequest,
  priceLoaded,
  priceError,
  setConverterText,
  setConverterDate,
};
