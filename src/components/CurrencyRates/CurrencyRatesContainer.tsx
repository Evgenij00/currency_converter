import React, { Component } from "react";
import { connect } from "react-redux";

import { TStateCurrencyRatesReducer } from "../../reducers/currencyRatesReducer/currencyRatesReducer";

import CurrencySelection from "./CurrencySelection/CurrencySelection";
import RateTable from "./RateTable/RateTable";
import Spinner from "../spinner";

import {
  callbacksCurrencyRatesReducer,
  TCallbacksCurrencyRatesReducer,
} from "../../reducers/currencyRatesReducer/actions";
import { TAppState } from "../../store";
import Error from "../Error";

type CurrencyRatesContainerProps = TStateCurrencyRatesReducer &
  TCallbacksCurrencyRatesReducer;

class CurrencyRatesContainer extends Component<CurrencyRatesContainerProps> {
  private idInterval: number | undefined;

  private interval = 100000000;

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
    const { fetchLatestRates } = this.props;
    fetchLatestRates(base);
    this.idInterval = window.setInterval(
      () => fetchLatestRates(base),
      this.interval
    );
  };

  render() {
    const { base, loading, error, currencyRates } = this.props;

    if (loading) return <Spinner />;
    if (error) return <Error />;

    return (
      <>
        <CurrencySelection
          base={base}
          currencyRates={currencyRates}
          setBaseCurrency={this.setBaseCurrency}
        />

        <RateTable base={base} currencyRates={currencyRates} />
      </>
    );
  }
}

const mapStateToProps = (state: TAppState): TStateCurrencyRatesReducer =>
  state.currencyRatesReducer;

const mapDispatchToProps: TCallbacksCurrencyRatesReducer = callbacksCurrencyRatesReducer;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyRatesContainer);
