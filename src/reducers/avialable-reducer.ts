import { FETCH_AVIALABLE_REQUEST, FETCH_AVIALABLE_SUCCESS, FETCH_AVIALABLE_FUILURE } from "../actions/consts";

export type TAvialableReducer = {
  avialableCurrencies: [string, string][] | []
  loading: boolean
  error: Error | null
}

const avialableReducer = (state: any, action: any): TAvialableReducer => {

  if (state === undefined) {
    return {
      ...state,
      avialableCurrencies: [],
      loading: true,
      error: null
    }
  }

  switch (action.type) {
    case FETCH_AVIALABLE_REQUEST:
      return {
        ...state,
        avialableCurrencies: [],
        loading: true,
        error: null
      };
    case FETCH_AVIALABLE_SUCCESS:
      return {
        ...state,
        avialableCurrencies: action.payload,
        loading: false,
        error: null
      };
    case FETCH_AVIALABLE_FUILURE:
      return {
        ...state,
        avialableCurrencies: [],
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default avialableReducer;