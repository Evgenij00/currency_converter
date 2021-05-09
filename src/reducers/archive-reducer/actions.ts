import { service, TFetchArchiveCurrencies } from "../../currency-service";

export const FETCH_ARCHIVE_REQUEST = "FETCH_ARCHIVE_REQUEST";
export const FETCH_ARCHIVE_SUCCESS = "FETCH_ARCHIVE_SUCCESS";
export const FETCH_ARCHIVE_FUILURE = "FETCH_ARCHIVE_FUILURE";

type TFeatchArchiveRequest = {
  type: typeof FETCH_ARCHIVE_REQUEST;
};

const archiveRequested = (): TFeatchArchiveRequest => ({
  type: FETCH_ARCHIVE_REQUEST,
});

type TFetchArchiveSuccess = {
  type: typeof FETCH_ARCHIVE_SUCCESS;
  payload: TFetchArchiveCurrencies;
};

const archiveLoaded = (data: TFetchArchiveCurrencies): TFetchArchiveSuccess => {
  return {
    type: FETCH_ARCHIVE_SUCCESS,
    payload: data,
  };
};

type TFetchArchiveError = {
  type: typeof FETCH_ARCHIVE_FUILURE;
  payload: Error;
};

const archiveError = (error: Error): TFetchArchiveError => ({
  type: FETCH_ARCHIVE_FUILURE,
  payload: error,
});

const fetchArvhiveRates = (base: string, date: string) => (dispatch: any) => {
  console.log("render");
  dispatch(archiveRequested());
  service
    .getArchiveByBase(base, date)
    .then((data) => dispatch(archiveLoaded(data)))
    .catch((error: Error) => dispatch(archiveError(error)));
};

export type TActionsArchiveReducer = {
  fetchArvhiveRates: (base: string, date: string) => void;
};

export const actionsArchiveReducer = {
  fetchArvhiveRates,
};
