import { connect } from "react-redux";
import React, { Component } from "react";
import { TFetchPriceRequest, TFetchPriceSuccess, TFetchPriceError, TConvertDate, TText } from "../../actions/types";
import { TConverterReducer } from "../../reducers/converter-reducer";
import { priceError, priceRequest, priceLoaded, setConvertDate, setText } from "../../actions";
import CurrencyService, { ICurrencyService } from "../../services/currency-service";
import Converter from "../../components/Converter";

type TDispatchProps = {
  priceRequest: () => TFetchPriceRequest
  priceLoaded: (price: number) => TFetchPriceSuccess
  priceError: (error: Error) => TFetchPriceError
  setText: (text: string, inputValid: boolean) => TText
  setConvertDate: (date: string) => TConvertDate
}

type ConverterContainerProps = TConverterReducer & TDispatchProps

class ConverterContainer extends Component<ConverterContainerProps> {

  service: ICurrencyService = new CurrencyService()

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    this.props.setText(text, !!(this.isValid(text)))
  }

  handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    this.props.setConvertDate(date)
  }

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { text, date, priceRequest, priceLoaded, priceError } = this.props

    const [quantity, fromName, , toName] = text.toUpperCase().split(" ");

    priceRequest();
    this.service
      .getLatestFromTo(fromName, toName, quantity, date)
      .then((price: number) => {
        console.log(price)
        priceLoaded(price)
      })
      .catch((error: Error) => priceError(error));
  };

  isValid = (text: string) => {
    const regExp = /^\d+\s[A-Za-z]{3}\sin\s[A-Za-z]{3}$/;
    return Boolean(text.match(regExp)?.[0]);
  };

  render() {

    const { loading, result, inputValid, date, error, text} = this.props;

    let general: any

    if (loading) {
      general = <span>Выполняем работу :)</span>;
    } else if (error) {
      general = <span>Упс! Что-то пошло не так... Возможно вы неверно указали одну из валют.</span>
    } else {
      general = <span>{result}</span>;
    }

    return (
      <Converter
      text={text}
      general={general}
      inputValid={!inputValid}
      date={date}
      handleFormSubmit={this.handleFormSubmit}
      handleInputChange={this.handleInputChange}
      handleDateChange={this.handleDateChange}
      />
    );
  }
}

const mapStateToProps = (
  { converterReducer: { loading, result, inputValid, date, error, text } }:
  { converterReducer: TConverterReducer }): TConverterReducer => {
  return { loading, result, date, error, text, inputValid};
};

const mapDispatchToProps: TDispatchProps = {
  priceRequest,
  priceLoaded,
  priceError,
  setText,
  setConvertDate,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConverterContainer)