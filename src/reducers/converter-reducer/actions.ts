import { service } from "../../services/currency-service";

export const FETCH_PRICE_REQUEST = "FETCH_PRICE_REQUEST";
export const FETCH_PRICE_SUCCESS = "FETCH_PRICE_SUCCESS";
export const FETCH_PRICE_FUILURE = "FETCH_PRICE_FUILURE";
export const SET_CONVERTER_TEXT = "SET_CONVERTER_TEXT";
export const SET_CONVERTER_DATE = "SET_CONVERTER_DATE";

type TFetchPriceRequest = {
  type: typeof FETCH_PRICE_REQUEST;
};

const priceRequest = (): TFetchPriceRequest => ({
  type: FETCH_PRICE_REQUEST,
});

type TFetchPriceSuccess = {
  type: typeof FETCH_PRICE_SUCCESS;
  payload: number;
};

const priceLoaded = (price: number): TFetchPriceSuccess => {
  return {
    type: FETCH_PRICE_SUCCESS,
    payload: price,
  };
};

type TFetchPriceError = {
  type: typeof FETCH_PRICE_FUILURE;
  payload: Error;
};

const priceError = (error: Error): TFetchPriceError => {
  return {
    type: FETCH_PRICE_FUILURE,
    payload: error,
  };
};

type TConverterText = {
  type: typeof SET_CONVERTER_TEXT;
  payload: string;
};

const setConverterText = (text: string): TConverterText => {
  return {
    type: SET_CONVERTER_TEXT,
    payload: text,
  };
};

type TConverterDate = {
  type: typeof SET_CONVERTER_DATE;
  payload: string;
};

const setConverterDate = (date: string): TConverterDate => {
  return {
    type: SET_CONVERTER_DATE,
    payload: date,
  };
};

const fetchPrice = (text: string, date: string) => (dispatch: any) => {
  const [quantity, fromName, , toName] = text.toUpperCase().split(" ");

  dispatch(priceRequest());
  service
    .getConvertPrice(fromName, toName, quantity, date)
    .then((price) => dispatch(priceLoaded(price)))
    .catch((error: Error) => dispatch(priceError(error)));
};

export type TActionsConverterReducer = {
  setConverterText: (text: string) => TConverterText;
  setConverterDate: (date: string) => TConverterDate;
  fetchPrice: (text: string, date: string) => any;
};

export const actionsConverterReducer = {
  setConverterText,
  setConverterDate,
  fetchPrice,
};
