import React, { Component } from "react";
import { connect } from "react-redux";
import withCurrencyService from "../../components/hoc";

import { TCurrencyReducer } from "../../reducers/currency-rates-reducer/currency-rates-reducer";
import { TService } from "../../services/currency-service";

import CurrencyRates from "../../components/CurrencyRates";
import Spinner from "../../components/spinner";
import { renderSelect, renderTable } from "../../utils";

import {
  actionsCurrencyRatesReducer,
  TActionsCurrencyRatesReducer,
} from "../../reducers/currency-rates-reducer/actions";

type CurrencyRatesContainerProps = TCurrencyReducer &
  TActionsCurrencyRatesReducer &
  TService;

class CurrencyRatesContainer extends Component<CurrencyRatesContainerProps> {
  private idInterval: any;

  private interval = 100000;

  componentDidMount(): void {
    const { ratesRequested, base } = this.props;
    ratesRequested();
    this.startTimer(base);
  }

  componentWillUnmount(): void {
    clearInterval(this.idInterval);
  }

  startTimer = (base: string) => {
    this.fetchRates(base);
    this.idInterval = setInterval(() => this.fetchRates(base), this.interval);
  };

  fetchRates = (base: string) => {
    const { service, ratesLoaded, ratesError } = this.props;
    service
      .getLatestByBase(base)
      .then((data) => ratesLoaded(data))
      .catch((error: Error) => ratesError(error));
  };

  handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    localStorage.setItem("base", e.target.value);
    clearInterval(this.idInterval);
    this.startTimer(e.target.value);
  };

  render() {
    const { base, loading, error, currencyRates } = this.props;

    if (loading) return <Spinner />;
    if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

    const options = renderSelect(currencyRates);
    const items = renderTable(base, currencyRates);

    return (
      <CurrencyRates
        options={options}
        items={items}
        base={base}
        handleSelectChange={this.handleSelectChange}
      />
    );
  }
}

const mapStateToProps = ({
  currencyRatesReducer,
}: {
  currencyRatesReducer: TCurrencyReducer;
}): TCurrencyReducer => currencyRatesReducer;
const mapDispatchToProps: TActionsCurrencyRatesReducer = actionsCurrencyRatesReducer;

export default withCurrencyService()(
  connect(mapStateToProps, mapDispatchToProps)(CurrencyRatesContainer)
);
