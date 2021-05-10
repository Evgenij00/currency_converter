import React, { Component } from "react";
import { connect } from "react-redux";

import { TService } from "../../currency-service";

import AvialableCurrencies from "./AvialableCurrencies";
import Spinner from "../spinner";

import { TAppState } from "../../store";
import { TStateAvialableCurrenciesReducer } from "../../reducers/avialableCurrenciesReducer/avialableCurrenciesReducer";
import {
  callbacksAvialableCurrenciesReducer,
  TCallbacksAvialableCurrenciesReducer,
} from "../../reducers/avialableCurrenciesReducer/actions";

type AvialableCurrenciesContainerProps = TStateAvialableCurrenciesReducer &
  TCallbacksAvialableCurrenciesReducer &
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

const mapStateToProps = (state: TAppState): TStateAvialableCurrenciesReducer =>
  state.avialableCurrenciesReducer;

const mapDispatchToProps: TCallbacksAvialableCurrenciesReducer = callbacksAvialableCurrenciesReducer;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvialableCurrenciesContainer);
