import {
  FETCH_PRICE_REQUEST,
  FETCH_PRICE_SUCCESS,
  FETCH_PRICE_FUILURE,
  SET_CONVERTER_TEXT,
  SET_CONVERTER_DATE,
} from "./actions";

export type TConverterReducer = {
  text: string;
  price: number | string;
  date: string;
  loading: boolean;
  error: Error | null;
  inputValid: boolean;
};

function isValid(text: string) {
  const regExp = /^\d+\s[A-Za-z]{3}\sin\s[A-Za-z]{3}$/;
  return Boolean(text.match(regExp)?.[0]);
}

const converterReducer = (state: any, action: any): TConverterReducer => {
  if (state === undefined) {
    return {
      ...state,
      text: "",
      price: "",
      date: new Date().toLocaleDateString("en-CA"),
      loading: false,
      error: null,
      inputValid: false,
    };
  }

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
      const text = action.payload;
      const inputValid = isValid(text);
      return {
        ...state,
        text,
        inputValid,
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
