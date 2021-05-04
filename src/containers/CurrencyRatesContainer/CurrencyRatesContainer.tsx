import { Component } from 'react'
import { connect } from 'react-redux';
import { withCurrencyService } from '../../components/hoc';

import { TCurrencyReducer } from '../../reducers/currency-rates-reducer/currency-rates-reducer';
import { ICurrencyService } from '../../services/currency-service';

import CurrencyRates from '../../components/CurrencyRates';
import Spinner from '../../components/spinner';
import { renderSelect, renderTable } from '../../utils';

import { TFeatchRatesRequest, TFetchRatesSuccess,
TFetchRatesError, ratesError, ratesLoaded, ratesRequested } from '../../reducers/currency-rates-reducer/actions';

type TDispatchProps = {
  ratesRequested: () => TFeatchRatesRequest
  ratesLoaded: (data: any) => TFetchRatesSuccess
  ratesError: (error: Error) => TFetchRatesError
}

type TOwnProps = {
  service: ICurrencyService
}

type CurrencyRatesContainerProps = TDispatchProps & TCurrencyReducer & TOwnProps

class CurrencyRatesContainer extends Component<CurrencyRatesContainerProps> {

  private _idInterval: any
  private _interval: number = 100000

  componentDidMount(): void {
    const { ratesRequested, base } = this.props
    ratesRequested()
    this.startTimer(base)
  }

  componentWillUnmount(): void {
    clearInterval(this._idInterval);
  }

  startTimer = (base: string) => {
    this.fetchRates(base)
    this._idInterval = setInterval(() => this.fetchRates(base), this._interval)
  }

  fetchRates = (base: string) => {
    const {service, ratesLoaded, ratesError} = this.props
    service.getLatestByBase(base)
      .then((data) => ratesLoaded(data))
      .catch((error: Error) => ratesError(error))
  }

  handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    localStorage.setItem('base', e.target.value)
    clearInterval(this._idInterval)
    this.startTimer(e.target.value)
  }

  render() {
    console.log('render')
    const { base, loading, error, currencyRates } = this.props;

    if (loading) return <Spinner />
    if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

    const options = renderSelect(currencyRates)
    const items = renderTable(base, currencyRates)

    return (
      <CurrencyRates
        options={options}
        items={items}
        base={base}
        handleSelectChange={this.handleSelectChange} />
    )
  }
}

const mapStateToProps = (
  { currencyRatesReducer: { base, currencyRates, error, loading } }:
  { currencyRatesReducer: TCurrencyReducer }
): TCurrencyReducer => {
  return { base, currencyRates, error, loading };
};

const mapDispatchToProps: TDispatchProps = {
  ratesLoaded,
  ratesError,
  ratesRequested
}

export default withCurrencyService()(
  connect(mapStateToProps, mapDispatchToProps)(CurrencyRatesContainer)
)