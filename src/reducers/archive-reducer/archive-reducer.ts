import { TRate } from "../../currency-service";
import {
  FETCH_ARCHIVE_REQUEST,
  FETCH_ARCHIVE_SUCCESS,
  FETCH_ARCHIVE_FUILURE,
} from "./actions";

const initialState = {
  base: localStorage.getItem("base") || "USD",
  date: new Date().toLocaleDateString("en-CA"),
  loading: true,
  arhiveRates: [] as TRate[] | [],
  error: null as Error | null,
};

export type TArchiveReducer = typeof initialState;

const archiveReducer = (state = initialState, action: any): TArchiveReducer => {
  switch (action.type) {
    case FETCH_ARCHIVE_REQUEST:
      return {
        ...state,
        arhiveRates: [],
        loading: true,
        error: null,
      };
    case FETCH_ARCHIVE_SUCCESS:
      return {
        ...state,
        base: action.payload.base,
        date: action.payload.date,
        arhiveRates: action.payload.rates,
        loading: false,
        error: null,
      };
    case FETCH_ARCHIVE_FUILURE:
      return {
        ...state,
        arhiveRates: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default archiveReducer;
