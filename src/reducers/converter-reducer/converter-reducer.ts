import {
  FETCH_PRICE_REQUEST,
  FETCH_PRICE_SUCCESS,
  FETCH_PRICE_FUILURE,
  SET_CONVERTER_TEXT,
  SET_CONVERTER_DATE,
} from "./actions";

function isValid(text: string) {
  const regExp = /^\d+\s[A-Za-z]{3}\sin\s[A-Za-z]{3}$/;
  return Boolean(text.match(regExp)?.[0]);
}

const initialState = {
  text: "",
  date: new Date().toLocaleDateString("en-CA"),
  loading: false,
  inputValid: false,
  price: "" as number | string,
  error: null as Error | null,
};

export type TConverterReducer = typeof initialState;

const converterReducer = (
  state = initialState,
  action: any
): TConverterReducer => {
  switch (action.type) {
    case FETCH_PRICE_REQUEST:
      return {
        ...state,
        price: "",
        loading: true,
        error: null,
      };
    case FETCH_PRICE_SUCCESS:
      return {
        ...state,
        price: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_PRICE_FUILURE:
      return {
        ...state,
        price: "",
        error: action.payload,
        loading: false,
      };
    case SET_CONVERTER_TEXT: {
      return {
        ...state,
        text: action.payload,
        inputValid: isValid(action.payload),
      };
    }
    case SET_CONVERTER_DATE:
      return {
        ...state,
        date: action.payload,
      };
    default:
      return state;
  }
};

export default converterReducer;
