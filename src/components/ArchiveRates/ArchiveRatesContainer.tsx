import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../spinner";
import ArchiveRateTable from "./ArchiveRateTable/ArchiveRateTable";
import ArchiveSelectionParameters from "./ArchiveSelectionParameters/ArchiveSelectionParameters";
import { TStateArchiveRatesReducer } from "../../reducers/archiveRatesReducer/archiveRatesReducer";
import { fetchArvhiveRates } from "../../reducers/archiveRatesReducer/actions";
import {
  getArchiveRates,
  getBase,
  getDate,
  getError,
  getLoading,
} from "../../reducers/archiveRatesReducer/selectors";

const ArchiveRatesContainer: React.FC<TStateArchiveRatesReducer> = () => {
  const base = useSelector(getBase);
  const date = useSelector(getDate);
  const archiveRates = useSelector(getArchiveRates);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArvhiveRates(date, base));
  }, []);

  const setBaseCurrency = (value: string) => {
    localStorage.setItem("base", value);
    dispatch(fetchArvhiveRates(date, value));
  };

  const setDate = (value: string) => {
    dispatch(fetchArvhiveRates(value, base));
  };

  if (loading) return <Spinner />;
  if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

  return (
    <>
      <ArchiveSelectionParameters
        date={date}
        base={base}
        archiveRates={archiveRates}
        setDate={setDate}
        setBaseCurrency={setBaseCurrency}
      />
      <ArchiveRateTable archiveRates={archiveRates} base={base} />
    </>
  );
};

export default ArchiveRatesContainer;
