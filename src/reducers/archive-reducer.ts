import { FETCH_ARCHIVE_REQUEST, FETCH_ARCHIVE_SUCCESS, FETCH_ARCHIVE_FUILURE, SET_ARCHIVE_DATE, SET_ARCHIVE_BASE } from "../actions/consts";

export type TArchiveReducer = {
  base: string
  date: string
  arhiveRates: [string, number][]
  loading: boolean
  error: Error | null
}

const archiveReducer = (state: any, action: any): TArchiveReducer => {

  if (state === undefined) {
    return {
      ...state,
      base: localStorage.getItem('base') || 'USD',
      date: new Date().toLocaleDateString('en-CA'),
      arhiveRates: [],
      loading: true,
      error: null,
    }
  }

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
        arhiveRates: action.payload,
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
    case SET_ARCHIVE_BASE:
      return {
        ...state,
        base: action.payload
      };
    case SET_ARCHIVE_DATE:
      return {
        ...state,
        date: action.payload,
      };
    default:
      return state;
  }
};

export default archiveReducer;