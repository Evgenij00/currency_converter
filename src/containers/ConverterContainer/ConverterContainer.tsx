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
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { setConverterText } = this.props;
    const text = e.target.value;
    setConverterText(text, this.isValid(text));
  };

  handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { setConverterDate } = this.props;
    const date = e.target.value;
    setConverterDate(date);
  };

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      text,
      date,
      service,
      priceRequest,
      priceLoaded,
      priceError,
    } = this.props;

    const [quantity, fromName, , toName] = text.toUpperCase().split(" ");

    priceRequest();
    service
      .getConvertPrice(fromName, toName, quantity, date)
      .then((price: number) => priceLoaded(price))
      .catch((error: Error) => priceError(error));
  };

  isValid = (text: string) => {
    const regExp = /^\d+\s[A-Za-z]{3}\sin\s[A-Za-z]{3}$/;
    return Boolean(text.match(regExp)?.[0]);
  };

  render() {
    const {
      loading,
      result,
      service,
      inputValid,
      date,
      error,
      text,
    } = this.props;
    const currentDate = service.getCurrentDate();

    let general: JSX.Element;

    if (loading) {
      general = <Spinner />;
    } else if (error) {
      general = (
        <span>
          Упс! Что-то пошло не так... Возможно вы неверно указали одну из валют.
        </span>
      );
    } else {
      general = <span>{result}</span>;
    }

    return (
      <Converter
        text={text}
        general={general}
        inputValid={!inputValid}
        date={date}
        currentDate={currentDate}
        handleFormSubmit={this.handleFormSubmit}
        handleInputChange={this.handleInputChange}
        handleDateChange={this.handleDateChange}
      />
    );
  }
}

const mapStateToProps = ({
  converterReducer,
}: {
  converterReducer: TConverterReducer;
}): TConverterReducer => converterReducer;
const mapDispatchToProps: TActionsConverterReducer = actionsConverterReducer;

export default withCurrencyService()(
  connect(mapStateToProps, mapDispatchToProps)(ConverterContainer)
);
