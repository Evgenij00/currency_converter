import React, { Component } from "react";
import { connect } from "react-redux";

import { TAvialableReducer } from "../../reducers/avialable-reducer/avialable-reducer";
import { TService } from "../../currency-service";

import AvialableCurrencies from "./AvialableCurrencies";
import Spinner from "../spinner";

import {
  TActionsAvialableReducer,
  actionsAvialableReducer,
} from "../../reducers/avialable-reducer/actions";
import { AppStateType } from "../../store";

type AvialableCurrenciesContainerProps = TAvialableReducer &
  TActionsAvialableReducer &
  TService;

class AvialableCurrenciesContainer extends Component<AvialableCurrenciesContainerProps> {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { avialableCurrencies, loading, error } = this.props;

    if (loading) return <Spinner />;
    if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

    return <AvialableCurrencies avialableCurrencies={avialableCurrencies} />;
  }
}

const mapStateToProps = (state: AppStateType): TAvialableReducer =>
  state.avialableReducer;

const mapDispatchToProps: TActionsAvialableReducer = actionsAvialableReducer;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvialableCurrenciesContainer);
