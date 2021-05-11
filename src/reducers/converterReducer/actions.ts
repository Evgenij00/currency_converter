/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import { ThunkAction } from "redux-thunk";
import { service } from "../../currency-service";
import { TAppState } from "../../store";

export const FETCH_PRICE_REQUEST = "FETCH_PRICE_REQUEST";
export const FETCH_PRICE_SUCCESS = "FETCH_PRICE_SUCCESS";
export const FETCH_PRICE_FUILURE = "FETCH_PRICE_FUILURE";
export const SET_TEXT = "SET_CONVERTER_TEXT";
export const SET_DATE = "SET_CONVERTER_DATE";

export type TActions =
  | TActionRequest
  | TActionSuccess
  | TActionError
  | TActionForText
  | TActionForDate;

type TActionRequest = {
  type: typeof FETCH_PRICE_REQUEST;
};

const priceRequest = (): TActionRequest => ({
  type: FETCH_PRICE_REQUEST,
});

type TActionSuccess = {
  type: typeof FETCH_PRICE_SUCCESS;
  payload: number;
};

const priceLoaded = (price: number): TActionSuccess => {
  return {
    type: FETCH_PRICE_SUCCESS,
    payload: price,
  };
};

type TActionError = {
  type: typeof FETCH_PRICE_FUILURE;
  payload: Error;
};

const priceError = (error: Error): TActionError => {
  return {
    type: FETCH_PRICE_FUILURE,
    payload: error,
  };
};

type TActionForText = {
  type: typeof SET_TEXT;
  payload: string;
};

export const setText = (text: string): TActionForText => {
  return {
    type: SET_TEXT,
    payload: text,
  };
};

type TActionForDate = {
  type: typeof SET_DATE;
  payload: string;
};

export const setDate = (date: string): TActionForDate => {
  return {
    type: SET_DATE,
    payload: date,
  };
};

type TFetchPriceThunk = TActionRequest | TActionSuccess | TActionError;

type ThunkType = ThunkAction<void, TAppState, unknown, TFetchPriceThunk>;

export const fetchPrice = (text: string, date: string): ThunkType => async (
  dispatch
) => {
  const [quantity, fromName, , toName] = text.toUpperCase().split(" ");

  dispatch(priceRequest());
  try {
    const price = await service.getConvertPrice(
      fromName,
      toName,
      quantity,
      date
    );
    dispatch(priceLoaded(price));
  } catch (error) {
    dispatch(priceError(error));
  }
};
