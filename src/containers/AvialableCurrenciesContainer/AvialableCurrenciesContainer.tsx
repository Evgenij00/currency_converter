import { connect } from "react-redux";
import { Component } from "react";
import { withCurrencyService } from "../../components/hoc";

import { TAvialableReducer } from "../../reducers/avialable-reducer/avialable-reducer";
import { ICurrencyService } from "../../services/currency-service";

import AvialableCurrencies from '../../components/AvialableCurrencies'
import Spinner from "../../components/spinner";

import { TFeatchAvialableRequest, TFetchAvialableSuccess, 
TFetchAvialableError, avialableRequested, 
avialableLoaded, avialableError } from "../../reducers/avialable-reducer/actions";

type TDispatchProps = {
  avialableRequested: () => TFeatchAvialableRequest
  avialableLoaded: (currencies: [string, string][]) => TFetchAvialableSuccess
  avialableError: (error: Error) => TFetchAvialableError
}

type TOwnProps = {
  service: ICurrencyService
}

type AvialableCurrenciesContainerProps = TDispatchProps & TAvialableReducer & TOwnProps

class AvialableCurrenciesContainer extends Component<AvialableCurrenciesContainerProps> {

  componentDidMount() {
    const {service, avialableRequested, avialableLoaded, avialableError} = this.props

    avialableRequested()
    service.getCurrencies()
      .then(currencies => avialableLoaded(currencies))
      .catch(error => avialableError(error))
  }

  renderTabels = (item: any): any => {
    return (
      <tr key={item[0]}>
        <td>
          {item[0]}
        </td>
        <td>
          <span>{item[1]}</span>
        </td>
      </tr>
    );
  };

  render() {
    const {avialableCurrencies, loading, error} = this.props

    if (loading) return <Spinner />
    if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

    const items = avialableCurrencies.map(this.renderTabels)

    return (
      <AvialableCurrencies items={items}/>
    );
  } 
};

const mapStateToProps = (
  { avialableReducer: { avialableCurrencies, loading, error } }:
  { avialableReducer: TAvialableReducer }
): TAvialableReducer => {
  return { avialableCurrencies, loading, error };
};

const mapDispatchToProps: TDispatchProps = {
  avialableRequested,
  avialableLoaded,
  avialableError,
}

export default withCurrencyService()(
  connect(mapStateToProps, mapDispatchToProps)(AvialableCurrenciesContainer)
)