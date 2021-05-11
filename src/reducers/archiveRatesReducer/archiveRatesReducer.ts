/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import { TRate } from "../../currency-service";
import {
  FETCH_ARCHIVE_REQUEST,
  FETCH_ARCHIVE_SUCCESS,
  FETCH_ARCHIVE_FUILURE,
  TActions,
} from "./actions";

const initialState = {
  base: localStorage.getItem("base") || "USD",
  date: new Date().toLocaleDateString("en-CA"),
  loading: true,
  archiveRates: [] as TRate[] | [],
  error: null as Error | null,
};

export type TStateArchiveRatesReducer = typeof initialState;

const archiveReducer = (
  state = initialState,
  action: TActions
): TStateArchiveRatesReducer => {
  switch (action.type) {
    case FETCH_ARCHIVE_REQUEST:
      return {
        ...state,
        archiveRates: [],
        loading: true,
        error: null,
      };
    case FETCH_ARCHIVE_SUCCESS:
      return {
        ...state,
        base: action.payload.base,
        date: action.payload.date,
        archiveRates: action.payload.rates,
        loading: false,
        error: null,
      };
    case FETCH_ARCHIVE_FUILURE:
      return {
        ...state,
        archiveRates: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default archiveReducer;
