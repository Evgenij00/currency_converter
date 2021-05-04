import { FETCH_PRICE_REQUEST, FETCH_PRICE_SUCCESS, FETCH_PRICE_FUILURE, SET_TEXT, SET_CONVERT_DATE } from "./consts"

export type TFetchPriceRequest = {
  type: typeof FETCH_PRICE_REQUEST
}

export type TFetchPriceSuccess = {
  type: typeof FETCH_PRICE_SUCCESS
  payload: number
}

export type TFetchPriceError = {
  type: typeof FETCH_PRICE_FUILURE
  payload: Error
}

export type TText = {
  type: typeof SET_TEXT
  payload: {text: string, inputValid: boolean}
}

export type TConvertDate = {
  type: typeof SET_CONVERT_DATE
  payload: string
}