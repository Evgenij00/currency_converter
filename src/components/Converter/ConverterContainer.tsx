import { useDispatch, useSelector } from "react-redux";
import React from "react";

import Spinner from "../Spinner";

import { TStateConverterReducer } from "../../reducers/converterReducer/converterReducer";
import {
  fetchPrice,
  setText,
  setDate,
} from "../../reducers/converterReducer/actions";
import ConverterHooks from "./Converter";
import {
  getDate,
  getError,
  getInputValid,
  getLoading,
  getPrice,
  getText,
} from "../../reducers/converterReducer/selectors";

const ConverterContainer: React.FC<TStateConverterReducer> = () => {
  const text = useSelector(getText);
  const date = useSelector(getDate);
  const price = useSelector(getPrice);
  const error = useSelector(getError);
  const loading = useSelector(getLoading);
  const inputValid = useSelector(getInputValid);

  const dispatch = useDispatch();

  const changeText = (value: string) => {
    dispatch(setText(value));
  };

  const changeDate = (value: string) => {
    dispatch(setDate(value));
  };

  const getConvertPrice = () => {
    dispatch(fetchPrice(text, date));
  };

  let result: JSX.Element;

  if (loading) {
    result = <Spinner />;
  } else if (error) {
    result = (
      <span className="text-danger">
        Упс! Что-то пошло не так... Возможно вы неверно указали одну из валют.
      </span>
    );
  } else {
    result = <span>{price}</span>;
  }

  return (
    <ConverterHooks
      text={text}
      date={date}
      result={result}
      inputValid={inputValid}
      changeText={changeText}
      changeDate={changeDate}
      getConvertPrice={getConvertPrice}
    />
  );
};

export default ConverterContainer;
