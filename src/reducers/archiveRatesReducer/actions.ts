/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import { ThunkAction } from "redux-thunk";
import { service, TArchiveRates } from "../../currency-service";
import { TAppState } from "../../store";

export const FETCH_ARCHIVE_REQUEST = "FETCH_ARCHIVE_REQUEST";
export const FETCH_ARCHIVE_SUCCESS = "FETCH_ARCHIVE_SUCCESS";
export const FETCH_ARCHIVE_FUILURE = "FETCH_ARCHIVE_FUILURE";

export type TActions = TActionRequest | TActionSuccess | TActionError;

type TActionRequest = {
  type: typeof FETCH_ARCHIVE_REQUEST;
};

const archiveRequested = (): TActionRequest => ({
  type: FETCH_ARCHIVE_REQUEST,
});

type TActionSuccess = {
  type: typeof FETCH_ARCHIVE_SUCCESS;
  payload: TArchiveRates;
};

const archiveLoaded = (data: TArchiveRates): TActionSuccess => {
  return {
    type: FETCH_ARCHIVE_SUCCESS,
    payload: data,
  };
};

type TActionError = {
  type: typeof FETCH_ARCHIVE_FUILURE;
  payload: Error;
};

const archiveError = (error: Error): TActionError => ({
  type: FETCH_ARCHIVE_FUILURE,
  payload: error,
});

type ThunkType = ThunkAction<void, TAppState, unknown, TActions>;

export const fetchArvhiveRates = (
  base: string,
  date: string
): ThunkType => async (dispatch) => {
  dispatch(archiveRequested());
  try {
    const data = await service.getArchiveRates(base, date);
    dispatch(archiveLoaded(data));
  } catch (error) {
    dispatch(archiveError(error));
  }
};

export type TCallbacksReducer = {
  fetchArvhiveRates: (base: string, date: string) => void;
};

export const callbacksReducer = {
  fetchArvhiveRates,
};
