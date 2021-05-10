import { connect } from "react-redux";
import React, { Component } from "react";

import { TService } from "../../currency-service";

import Converter from "./Converter";
import Spinner from "../spinner";

import { TAppState } from "../../store";
import { TStateConverterReducer } from "../../reducers/converterReducer/converterReducer";
import {
  callbacksConverterReducer,
  TCallbacksConverterReducer,
} from "../../reducers/converterReducer/actions";

type ConverterContainerProps = TStateConverterReducer &
  TCallbacksConverterReducer &
  TService;

class ConverterContainer extends Component<ConverterContainerProps> {
  getConvertPrice = () => {
    const { text, date, fetchPrice } = this.props;
    fetchPrice(text, date);
  };

  render() {
    const {
      loading,
      price,
      inputValid,
      date,
      error,
      text,
      setText,
      setDate,
    } = this.props;

    let result: React.ReactElement;
    // let general: JSX.Element;

    if (loading) {
      result = <Spinner />;
    } else if (error) {
      result = (
        <span>
          Упс! Что-то пошло не так... Возможно вы неверно указали одну из валют.
        </span>
      );
    } else {
      result = <span>{price}</span>;
    }

    return (
      <Converter
        text={text}
        date={date}
        result={result}
        inputValid={inputValid}
        setText={setText}
        setDate={setDate}
        getConvertPrice={this.getConvertPrice}
      />
    );
  }
}

const mapStateToProps = (state: TAppState): TStateConverterReducer =>
  state.converterReducer;

const mapDispatchToProps: TCallbacksConverterReducer = callbacksConverterReducer;

export default connect(mapStateToProps, mapDispatchToProps)(ConverterContainer);
