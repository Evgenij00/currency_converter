import { FETCH_PRICE_REQUEST, FETCH_PRICE_SUCCESS, FETCH_PRICE_FUILURE, SET_TEXT, SET_CONVERT_DATE } from "../actions/consts";

export type TConverterReducer = {
  text: string
  result: number | string
  date: string
  loading: boolean
  error: Error | null
  inputValid: boolean
}

const converterReducer = (state: any, action: any): TConverterReducer => {

  if (state === undefined) {
    return {
      ...state,
      text: "",
      result: "",
      date: '2021-05-04',
      loading: false,
      error: null,
      inputValid: false
    }
  }

  switch (action.type) {
    case FETCH_PRICE_REQUEST:
      return {
        ...state,
        result: '',
        loading: true,
        error: null,
      };
    case FETCH_PRICE_SUCCESS:
      if (!action.payload) {
        return {
          ...state,
          loading: false,
          error: null,
        };
      } else {
        return {
          ...state,
          result: action.payload,
          loading: false,
          error: null,
        };
      }
    case FETCH_PRICE_FUILURE:
      return {
        ...state,
        result: '',
        error: action.payload,
        loading: false,
      };
    case SET_TEXT:
      return {
        ...state,
        text: action.payload.text,
        inputValid: action.payload.inputValid
      };
    case SET_CONVERT_DATE:
      return {
        ...state,
        date: action.payload
      };
    default:
      return state;
  }
};

export default converterReducer;