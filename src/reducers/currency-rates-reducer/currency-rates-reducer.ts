import { TRate } from "../../currency-service";
import {
  FETCH_RATES_REQUEST,
  FETCH_RATES_SUCCESS,
  FETCH_RATES_FUILURE,
} from "./actions";

const initialState = {
  base: localStorage.getItem("base") || "USD",
  loading: true,
  currencyRates: [] as TRate[] | [],
  error: null as Error | null,
};

export type TCurrencyReducer = typeof initialState;

const currencyRatesReducer = (
  state = initialState,
  action: any
): TCurrencyReducer => {
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
        base: action.payload.base,
        currencyRates: action.payload.rates,
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
