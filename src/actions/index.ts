import { FETCH_PRICE_REQUEST, FETCH_PRICE_SUCCESS, FETCH_PRICE_FUILURE, SET_TEXT, SET_CONVERT_DATE } from "./consts"
import { TFetchPriceRequest, TFetchPriceSuccess, TFetchPriceError, TText, TConvertDate } from "./types"

const priceRequest = (): TFetchPriceRequest => ({ type: FETCH_PRICE_REQUEST })

const priceLoaded = (price: number): TFetchPriceSuccess => {
  return {
    type: FETCH_PRICE_SUCCESS,
    payload: price
  }
}

const priceError = (error: Error): TFetchPriceError => {
  return {
    type: FETCH_PRICE_FUILURE,
    payload: error
  }
}

const setText = (text: string, inputValid: boolean): TText => {
  return {
    type: SET_TEXT,
    payload: { text, inputValid }
  }
}

const setConvertDate = (date: string): TConvertDate => {
  return {
    type: SET_CONVERT_DATE,
    payload: date
  }
}


export {
  priceRequest,
  priceLoaded,
  priceError,
  setText,
  setConvertDate,
}
