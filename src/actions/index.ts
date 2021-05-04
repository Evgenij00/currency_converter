import { FETCH_PRICE_REQUEST, FETCH_PRICE_SUCCESS, FETCH_PRICE_FUILURE, FETCH_RATES_FUILURE, FETCH_RATES_REQUEST, FETCH_RATES_SUCCESS, FETCH_ARCHIVE_FUILURE, FETCH_ARCHIVE_REQUEST, FETCH_ARCHIVE_SUCCESS, SET_ARCHIVE_BASE, SET_ARCHIVE_DATE, FETCH_AVIALABLE_FUILURE, FETCH_AVIALABLE_REQUEST, FETCH_AVIALABLE_SUCCESS, SET_CONVERTER_DATE, SET_CONVERTER_TEXT } from "./consts"
import { TFetchPriceRequest, TFetchPriceSuccess, TFetchPriceError, TFeatchRatesRequest, TFetchRatesError, TFetchRatesSuccess, TArchiveBase, TArchiveDate, TFeatchArchiveRequest, TFetchArchiveError, TFetchArchiveSuccess, TFeatchAvialableRequest, TFetchAvialableError, TFetchAvialableSuccess, TConverterDate, TConverterText } from "./types"

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

const setConverterText = (text: string, inputValid: boolean): TConverterText => {
  return {
    type: SET_CONVERTER_TEXT,
    payload: { text, inputValid }
  }
}

const setConverterDate = (date: string): TConverterDate => {
  return {
    type: SET_CONVERTER_DATE,
    payload: date
  }
}

const archiveRequested = (): TFeatchArchiveRequest => ({ type: FETCH_ARCHIVE_REQUEST })

const archiveLoaded = (data: any): TFetchArchiveSuccess => {
  return {
    type: FETCH_ARCHIVE_SUCCESS,
    payload: data,
  }
}

const archiveError = (error: Error): TFetchArchiveError => ({
  type: FETCH_ARCHIVE_FUILURE,
  payload: error
})

const setArchiveBase = (base: string): TArchiveBase => {
  return {
    type: SET_ARCHIVE_BASE,
    payload: base
  }
}

const setArchiveDate = (date: string): TArchiveDate => {
  return {
    type: SET_ARCHIVE_DATE,
    payload: date
  }
}

const avialableRequested = (): TFeatchAvialableRequest => ({ type: FETCH_AVIALABLE_REQUEST })

const avialableLoaded = (currencies: [string, string][]): TFetchAvialableSuccess => {
  return {
    type: FETCH_AVIALABLE_SUCCESS,
    payload: currencies,
  }
}

const avialableError = (error: Error): TFetchAvialableError => ({
  type: FETCH_AVIALABLE_FUILURE,
  payload: error
})

export {
  ratesRequested,
  ratesLoaded,
  ratesError,

  priceRequest,
  priceLoaded,
  priceError,
  setConverterText,
  setConverterDate,

  archiveRequested,
  archiveLoaded,
  archiveError,
  setArchiveBase,
  setArchiveDate,

  avialableRequested,
  avialableLoaded,
  avialableError,
}
