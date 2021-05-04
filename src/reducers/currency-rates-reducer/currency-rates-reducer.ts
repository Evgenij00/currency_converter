import { FETCH_RATES_REQUEST, FETCH_RATES_SUCCESS, FETCH_RATES_FUILURE } from "./actions";

export type TCurrencyReducer = {
  base: string
  currencyRates: [string, number][] | []
  error: Error | null
  loading: boolean
}

const currencyRatesReducer = (state: any, action: any): TCurrencyReducer => {

  if (state === undefined) {
    return {
      ...state,
      loading: true,
      base: localStorage.getItem('base') || 'USD',
      currencyRates: [],
      error: null,
    }
  }

  switch (action.type) {
    case FETCH_RATES_REQUEST:
      return {
        ...state,
        loading: true,
        currencyRates: [],
        error: null,
      };
    case FETCH_RATES_SUCCESS:
      return {
        ...state,
        loading: false,
        currencyRates: action.payload.rates,
        base: action.payload.base
      };
    case FETCH_RATES_FUILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default currencyRatesReducer;