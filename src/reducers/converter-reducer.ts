import { FETCH_PRICE_REQUEST, FETCH_PRICE_SUCCESS, FETCH_PRICE_FUILURE, SET_CONVERTER_DATE, SET_CONVERTER_TEXT } from "../actions/consts";

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
      date: new Date().toLocaleDateString('en-CA'),
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
      return {
        ...state,
        result: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_PRICE_FUILURE:
      return {
        ...state,
        result: '',
        error: action.payload,
        loading: false,
      };
    case SET_CONVERTER_TEXT:
      return {
        ...state,
        text: action.payload.text,
        inputValid: action.payload.inputValid
      };
    case SET_CONVERTER_DATE:
      return {
        ...state,
        date: action.payload
      };
    default:
      return state;
  }
};

export default converterReducer;