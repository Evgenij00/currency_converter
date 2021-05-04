import { FETCH_PRICE_FUILURE, FETCH_PRICE_REQUEST, FETCH_PRICE_SUCCESS, FETCH_RATES_FUILURE, FETCH_RATES_REQUEST, FETCH_RATES_SUCCESS, FETCH_ARCHIVE_REQUEST, FETCH_ARCHIVE_SUCCESS, FETCH_ARCHIVE_FUILURE, SET_ARCHIVE_BASE, SET_ARCHIVE_DATE, FETCH_AVIALABLE_FUILURE, FETCH_AVIALABLE_REQUEST, FETCH_AVIALABLE_SUCCESS, SET_CONVERTER_DATE, SET_CONVERTER_TEXT } from "./consts"

export type TFeatchRatesRequest = {
  type: typeof FETCH_RATES_REQUEST
}

export type TFetchRatesSuccess = {
  type: typeof FETCH_RATES_SUCCESS,
  payload: {
    base: string,
    rates: any
  }
}

export type TFetchRatesError = {
  type: typeof FETCH_RATES_FUILURE
  payload: Error
}

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

export type TConverterText = {
  type: typeof SET_CONVERTER_TEXT
  payload: {text: string, inputValid: boolean}
}

export type TConverterDate = {
  type: typeof SET_CONVERTER_DATE
  payload: string
}

export type TFeatchArchiveRequest = {
  type: typeof FETCH_ARCHIVE_REQUEST
}

export type TFetchArchiveSuccess = {
  type: typeof FETCH_ARCHIVE_SUCCESS,
  payload: {
    base: string,
    rates: any
  }
}

export type TFetchArchiveError = {
  type: typeof FETCH_ARCHIVE_FUILURE
  payload: Error
}

export type TArchiveBase = {
  type: typeof SET_ARCHIVE_BASE
  payload: string
}

export type TArchiveDate = {
  type: typeof SET_ARCHIVE_DATE
  payload: string
}

export type TFeatchAvialableRequest = {
  type: typeof FETCH_AVIALABLE_REQUEST
}

export type TFetchAvialableSuccess = {
  type: typeof FETCH_AVIALABLE_SUCCESS,
  payload: [string, string][]
}

export type TFetchAvialableError = {
  type: typeof FETCH_AVIALABLE_FUILURE
  payload: Error
}