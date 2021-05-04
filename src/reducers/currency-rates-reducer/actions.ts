export const FETCH_RATES_REQUEST = 'FETCH_RATES_REQUEST'
export const FETCH_RATES_SUCCESS = 'FETCH_RATES_SUCCESS'
export const FETCH_RATES_FUILURE = 'FETCH_RATES_FUILURE'

export type TFeatchRatesRequest = {
  type: typeof FETCH_RATES_REQUEST
}

export const ratesRequested = (): TFeatchRatesRequest => ({ type: FETCH_RATES_REQUEST })

export type TFetchRatesSuccess = {
  type: typeof FETCH_RATES_SUCCESS,
  payload: {
    base: string,
    rates: any
  }
}

export const ratesLoaded = (data: any): TFetchRatesSuccess => {
  return {
    type: FETCH_RATES_SUCCESS,
    payload: data,
  }
}

export type TFetchRatesError = {
  type: typeof FETCH_RATES_FUILURE
  payload: Error
}


export const ratesError = (error: Error): TFetchRatesError => ({
  type: FETCH_RATES_FUILURE,
  payload: error
})