import { FETCH_PRICE_REQUEST, FETCH_PRICE_SUCCESS, FETCH_PRICE_FUILURE, SET_TEXT, SET_CONVERT_DATE, FETCH_RATES_FUILURE, FETCH_RATES_REQUEST, FETCH_RATES_SUCCESS } from "./consts"
import { TFetchPriceRequest, TFetchPriceSuccess, TFetchPriceError, TText, TConvertDate, TFeatchRatesRequest, TFetchRatesError, TFetchRatesSuccess } from "./types"

const ratesRequested = (): TFeatchRatesRequest => ({ type: FETCH_RATES_REQUEST })

const ratesLoaded = (data: any): TFetchRatesSuccess => {
  return {
    type: FETCH_RATES_SUCCESS,
    payload: data,
  }
}

const ratesError = (error: Error): TFetchRatesError => ({
  type: FETCH_RATES_FUILURE,
  payload: error
})

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
  ratesRequested,
  ratesLoaded,
  ratesError,
  priceRequest,
  priceLoaded,
  priceError,
  setText,
  setConvertDate,
}
