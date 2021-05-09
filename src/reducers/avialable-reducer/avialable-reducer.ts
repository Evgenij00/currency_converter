import { TCurrency } from "../../currency-service";
import {
  FETCH_AVIALABLE_REQUEST,
  FETCH_AVIALABLE_SUCCESS,
  FETCH_AVIALABLE_FUILURE,
} from "./actions";

const initialState = {
  loading: true,
  avialableCurrencies: [] as TCurrency[] | [],
  error: null as Error | null,
};

export type TAvialableReducer = typeof initialState;

const avialableReducer = (
  state = initialState,
  action: any
): TAvialableReducer => {
  switch (action.type) {
    case FETCH_AVIALABLE_REQUEST:
      return {
        ...state,
        avialableCurrencies: [],
        loading: true,
        error: null,
      };
    case FETCH_AVIALABLE_SUCCESS:
      return {
        ...state,
        avialableCurrencies: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_AVIALABLE_FUILURE:
      return {
        ...state,
        avialableCurrencies: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default avialableReducer;
