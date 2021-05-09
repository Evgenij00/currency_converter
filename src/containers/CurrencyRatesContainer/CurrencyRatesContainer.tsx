import React, { Component } from "react";
import { connect } from "react-redux";

import { TCurrencyReducer } from "../../reducers/currency-rates-reducer/currency-rates-reducer";
import { TService } from "../../services/currency-service";

import CurrencyRates from "../../components/CurrencyRates";
import Spinner from "../../components/spinner";

import {
  actionsCurrencyRatesReducer,
  TActionsCurrencyRatesReducer,
} from "../../reducers/currency-rates-reducer/actions";

type CurrencyRatesContainerProps = TCurrencyReducer &
  TActionsCurrencyRatesReducer &
  TService;

class CurrencyRatesContainer extends Component<CurrencyRatesContainerProps> {
  private idInterval: any;

  private interval = 50000000;

  componentDidMount() {
    const { base } = this.props;
    this.startTimer(base);
  }

  componentWillUnmount() {
    clearInterval(this.idInterval);
  }

  setBaseCurrency = (base: string): void => {
    localStorage.setItem("base", base);
    clearInterval(this.idInterval);
    this.startTimer(base);
  };

  startTimer = (base: string) => {
    const { fetchRates } = this.props;
    fetchRates(base);
    this.idInterval = setInterval(() => fetchRates(base), this.interval);
  };

  render() {
    const { base, loading, error, currencyRates } = this.props;

    if (loading) return <Spinner />;
    if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

    return (
      <CurrencyRates
        currencyRates={currencyRates}
        base={base}
        setBaseCurrency={this.setBaseCurrency}
      />
    );
  }
}

const mapStateToProps = (state: any): TCurrencyReducer =>
  state.currencyRatesReducer;

const mapDispatchToProps: TActionsCurrencyRatesReducer = actionsCurrencyRatesReducer;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyRatesContainer);
