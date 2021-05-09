import { connect } from "react-redux";
import React, { Component } from "react";

import { TConverterReducer } from "../../reducers/converter-reducer/converter-reducer";
import { TService } from "../../currency-service";

import Converter from "./Converter";
import Spinner from "../spinner";

import {
  TActionsConverterReducer,
  actionsConverterReducer,
} from "../../reducers/converter-reducer/actions";
import { AppStateType } from "../../store";

type ConverterContainerProps = TConverterReducer &
  TActionsConverterReducer &
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
      setConverterText,
      setConverterDate,
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
        inputValid={!inputValid}
        result={result}
        getConvertPrice={this.getConvertPrice}
        setConverterText={setConverterText}
        setConverterDate={setConverterDate}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType): TConverterReducer =>
  state.converterReducer;

const mapDispatchToProps: TActionsConverterReducer = actionsConverterReducer;

export default connect(mapStateToProps, mapDispatchToProps)(ConverterContainer);
