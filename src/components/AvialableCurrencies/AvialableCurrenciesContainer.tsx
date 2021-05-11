import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AvialableCurrencies from "./AvialableCurrencies";
import Spinner from "../spinner";

import { TStateAvialableCurrenciesReducer } from "../../reducers/avialableCurrenciesReducer/avialableCurrenciesReducer";
import { fetchCurrencies } from "../../reducers/avialableCurrenciesReducer/actions";
import {
  getAvialableCurrencies,
  getError,
  getLoading,
} from "../../reducers/avialableCurrenciesReducer/selectors";

const AvialableCurrenciesContainer: React.FC<TStateAvialableCurrenciesReducer> = () => {
  const avialableCurrencies = useSelector(getAvialableCurrencies);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  if (loading) return <Spinner />;
  if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

  return <AvialableCurrencies avialableCurrencies={avialableCurrencies} />;
};

export default AvialableCurrenciesContainer;
