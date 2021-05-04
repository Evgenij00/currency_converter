export const FETCH_ARCHIVE_REQUEST = 'FETCH_ARCHIVE_REQUEST'
export const FETCH_ARCHIVE_SUCCESS = 'FETCH_ARCHIVE_SUCCESS'
export const FETCH_ARCHIVE_FUILURE = 'FETCH_ARCHIVE_FUILURE'
export const SET_ARCHIVE_BASE = 'SET_ARCHIVE_BASE'
export const SET_ARCHIVE_DATE = 'SET_ARCHIVE_DATE'

export type TFeatchArchiveRequest = {
  type: typeof FETCH_ARCHIVE_REQUEST
}

export const archiveRequested = (): TFeatchArchiveRequest => ({ type: FETCH_ARCHIVE_REQUEST })

export type TFetchArchiveSuccess = {
  type: typeof FETCH_ARCHIVE_SUCCESS,
  payload: {
    base: string,
    rates: any
  }
}

export const archiveLoaded = (data: any): TFetchArchiveSuccess => {
  return {
    type: FETCH_ARCHIVE_SUCCESS,
    payload: data,
  }
}

export type TFetchArchiveError = {
  type: typeof FETCH_ARCHIVE_FUILURE
  payload: Error
}

export const archiveError = (error: Error): TFetchArchiveError => ({
  type: FETCH_ARCHIVE_FUILURE,
  payload: error
})

export type TArchiveBase = {
  type: typeof SET_ARCHIVE_BASE
  payload: string
}

export const setArchiveBase = (base: string): TArchiveBase => {
  return {
    type: SET_ARCHIVE_BASE,
    payload: base
  }
}

export type TArchiveDate = {
  type: typeof SET_ARCHIVE_DATE
  payload: string
}

export const setArchiveDate = (date: string): TArchiveDate => {
  return {
    type: SET_ARCHIVE_DATE,
    payload: date
  }
}