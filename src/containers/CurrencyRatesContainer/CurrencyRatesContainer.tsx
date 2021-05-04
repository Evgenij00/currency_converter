import { Component } from 'react'
import { connect } from 'react-redux';
import { ratesError, ratesLoaded, ratesRequested } from '../../actions';
import { TFeatchRatesRequest, TFetchRatesSuccess, TFetchRatesError } from '../../actions/types';
import CurrencyRates from '../../components/CurrencyRates';
import { withCurrencyService } from '../../components/hoc';
import { TCurrencyReducer } from '../../reducers/currency-rates-reducer';
import { ICurrencyService } from '../../services/currency-service';

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
  private _interval: number = 10000000

  componentDidMount(): void {
    const { ratesRequested } = this.props
    ratesRequested()
    this.startTimer(this.props.base)
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
    service.getLatestFrom(base)
      .then((data) => ratesLoaded(data))
      .catch((error: Error) => ratesError(error))
  }

  handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    localStorage.setItem('base', e.target.value)
    clearInterval(this._idInterval)
    this.startTimer(e.target.value)
  }

  renderSelect = (item: any): any => {
    return (
      <option key={item[0]} value={item[0]}>
        {item[0]}
      </option>
    );
  };

  renderTabels = (item: any): any => {
    return (
      <tr key={item[0]}>
        <td>
          {this.props.base}/{item[0]}
        </td>
        <td>
          <span>{item[1]}</span>
        </td>
      </tr>
    );
  };

  render() {
    const { base, loading, error, currencyRates } = this.props;
    // console.log(base)

    if (loading) return <h1>Выполняем работу :)</h1>;
    if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

    const options = currencyRates.map(this.renderSelect)
    const items = currencyRates.map(this.renderTabels)

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