import { TRate } from "../../services/currency-service";

export const FETCH_ARCHIVE_REQUEST = "FETCH_ARCHIVE_REQUEST";
export const FETCH_ARCHIVE_SUCCESS = "FETCH_ARCHIVE_SUCCESS";
export const FETCH_ARCHIVE_FUILURE = "FETCH_ARCHIVE_FUILURE";
export const SET_ARCHIVE_BASE = "SET_ARCHIVE_BASE";
export const SET_ARCHIVE_DATE = "SET_ARCHIVE_DATE";

export type TFeatchArchiveRequest = {
  type: typeof FETCH_ARCHIVE_REQUEST;
};

const archiveRequested = (): TFeatchArchiveRequest => ({
  type: FETCH_ARCHIVE_REQUEST,
});

export type TFetchArchiveSuccess = {
  type: typeof FETCH_ARCHIVE_SUCCESS;
  payload: TRate[];
};

const archiveLoaded = (data: TRate[]): TFetchArchiveSuccess => {
  return {
    type: FETCH_ARCHIVE_SUCCESS,
    payload: data,
  };
};

export type TFetchArchiveError = {
  type: typeof FETCH_ARCHIVE_FUILURE;
  payload: Error;
};

const archiveError = (error: Error): TFetchArchiveError => ({
  type: FETCH_ARCHIVE_FUILURE,
  payload: error,
});

export type TArchiveBase = {
  type: typeof SET_ARCHIVE_BASE;
  payload: string;
};

const setArchiveBase = (base: string): TArchiveBase => {
  return {
    type: SET_ARCHIVE_BASE,
    payload: base,
  };
};

export type TArchiveDate = {
  type: typeof SET_ARCHIVE_DATE;
  payload: string;
};

const setArchiveDate = (date: string): TArchiveDate => {
  return {
    type: SET_ARCHIVE_DATE,
    payload: date,
  };
};

export type TActionsArchiveReducer = {
  archiveRequested: () => TFeatchArchiveRequest;
  archiveLoaded: (data: TRate[]) => TFetchArchiveSuccess;
  archiveError: (error: Error) => TFetchArchiveError;
  setArchiveBase: (base: string) => TArchiveBase;
  setArchiveDate: (date: string) => TArchiveDate;
};

export const actionsArchiveReducer = {
  archiveRequested,
  archiveLoaded,
  archiveError,
  setArchiveBase,
  setArchiveDate,
};
