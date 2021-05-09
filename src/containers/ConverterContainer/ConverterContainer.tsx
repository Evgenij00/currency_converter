import { connect } from "react-redux";
import React, { Component } from "react";
import withCurrencyService from "../../components/hoc";

import { TConverterReducer } from "../../reducers/converter-reducer/converter-reducer";
import { TService } from "../../services/currency-service";

import Converter from "../../components/Converter";
import Spinner from "../../components/spinner";

import {
  TActionsConverterReducer,
  actionsConverterReducer,
} from "../../reducers/converter-reducer/actions";

type ConverterContainerProps = TConverterReducer &
  TActionsConverterReducer &
  TService;

class ConverterContainer extends Component<ConverterContainerProps> {
  setText = (text: string) => {
    const { setConverterText } = this.props;
    setConverterText(text);
  };

  setDate = (date: string) => {
    const { setConverterDate } = this.props;
    setConverterDate(date);
  };

  getConvertPrice = () => {
    const { text, date, fetchPrice } = this.props;
    fetchPrice(text, date);
  };

  render() {
    const {
      loading,
      price,
      service,
      inputValid,
      date,
      error,
      text,
    } = this.props;
    const currentDate = service.getCurrentDate();

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
        result={result}
        inputValid={!inputValid}
        date={date}
        currentDate={currentDate}
        getConvertPrice={this.getConvertPrice}
        setText={this.setText}
        setDate={this.setDate}
      />
    );
  }
}

const mapStateToProps = (state: any): TConverterReducer =>
  state.converterReducer;

const mapDispatchToProps: TActionsConverterReducer = actionsConverterReducer;

export default withCurrencyService()(
  connect(mapStateToProps, mapDispatchToProps)(ConverterContainer)
);
