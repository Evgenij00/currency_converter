import { connect } from "react-redux";
import React, { Component } from "react";
import withCurrencyService from "../../components/hoc";

import { TAvialableReducer } from "../../reducers/avialable-reducer/avialable-reducer";
import { TCurrency, TService } from "../../services/currency-service";

import AvialableCurrencies from "../../components/AvialableCurrencies";
import Spinner from "../../components/spinner";

import {
  TActionsAvialableReducer,
  actionsAvialableReducer,
} from "../../reducers/avialable-reducer/actions";

type AvialableCurrenciesContainerProps = TAvialableReducer &
  TActionsAvialableReducer &
  TService;

class AvialableCurrenciesContainer extends Component<AvialableCurrenciesContainerProps> {
  componentDidMount() {
    const {
      service,
      avialableRequested,
      avialableLoaded,
      avialableError,
    } = this.props;

    avialableRequested();
    service
      .getCurrencies()
      .then((currencies) => avialableLoaded(currencies))
      .catch((error: Error) => avialableError(error));
  }

  renderTabels = (item: TCurrency): JSX.Element => {
    return (
      <tr key={item[0]}>
        <td>{item[0]}</td>
        <td>
          <span>{item[1]}</span>
        </td>
      </tr>
    );
  };

  render() {
    const { avialableCurrencies, loading, error } = this.props;

    if (loading) return <Spinner />;
    if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

    const items = avialableCurrencies.map(this.renderTabels);

    return <AvialableCurrencies items={items} />;
  }
}

const mapStateToProps = ({
  avialableReducer,
}: {
  avialableReducer: TAvialableReducer;
}): TAvialableReducer => avialableReducer;

const mapDispatchToProps: TActionsAvialableReducer = actionsAvialableReducer;

export default withCurrencyService()(
  connect(mapStateToProps, mapDispatchToProps)(AvialableCurrenciesContainer)
);
