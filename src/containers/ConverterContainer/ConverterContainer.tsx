import { connect } from "react-redux";
import { Component } from "react";
import { withCurrencyService } from "../../components/hoc";

import { TFetchPriceRequest, TFetchPriceSuccess, TFetchPriceError, TConverterDate, TConverterText } from "../../actions/types";
import { TConverterReducer } from "../../reducers/converter-reducer";
import { priceError, priceRequest, priceLoaded, setConverterDate, setConverterText } from "../../actions";
import { ICurrencyService } from "../../services/currency-service";

import Converter from "../../components/Converter";
import Spinner from "../../components/spinner";

type TDispatchProps = {
  priceRequest: () => TFetchPriceRequest
  priceLoaded: (price: number) => TFetchPriceSuccess
  priceError: (error: Error) => TFetchPriceError
  setConverterText: (text: string, inputValid: boolean) => TConverterText
  setConverterDate: (date: string) => TConverterDate
}

type TOwnProps = {
  service: ICurrencyService
}

type ConverterContainerProps = TConverterReducer & TDispatchProps & TOwnProps

class ConverterContainer extends Component<ConverterContainerProps> {

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    this.props.setConverterText(text, this.isValid(text))
  }

  handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    this.props.setConverterDate(date)
  }

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { text, date, service, priceRequest, priceLoaded, priceError } = this.props

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

    const { loading, result, service, inputValid, date, error, text} = this.props;
    const currentDate = service.getCurrentDate()

    let general: any

    if (loading) {
      general = <Spinner />
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
      currentDate={currentDate}
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
  setConverterText,
  setConverterDate,
};

export default withCurrencyService()(
  connect(mapStateToProps, mapDispatchToProps)(ConverterContainer)
)