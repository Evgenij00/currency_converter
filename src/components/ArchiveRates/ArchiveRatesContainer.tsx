import { connect } from "react-redux";
import React, { Component } from "react";

import { TArchiveReducer } from "../../reducers/archive-reducer/archive-reducer";
import { TService } from "../../currency-service";

import {
  actionsArchiveReducer,
  TActionsArchiveReducer,
} from "../../reducers/archive-reducer/actions";

import Spinner from "../spinner";
import { AppStateType } from "../../store";
import ArchiveRateTable from "./ArchiveRateTable/ArchiveRateTable";
import ArchiveSelectionParameters from "./ArchiveSelectionParameters/ArchiveSelectionParameters";

type ArchiveRatesContainerProps = TArchiveReducer &
  TActionsArchiveReducer &
  TService;

class ArchiveRatesContainer extends Component<ArchiveRatesContainerProps> {
  componentDidMount() {
    const { base, date, fetchArvhiveRates } = this.props;
    fetchArvhiveRates(base, date);
  }

  setBaseCurrency = (base: string) => {
    localStorage.setItem("base", base);
    const { date, fetchArvhiveRates } = this.props;
    fetchArvhiveRates(base, date);
  };

  setDate = (date: string) => {
    const { base, fetchArvhiveRates } = this.props;
    fetchArvhiveRates(base, date);
  };

  render() {
    const { base, date, loading, error, arhiveRates } = this.props;

    if (loading) return <Spinner />;
    if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

    return (
      <>
        <ArchiveSelectionParameters
          date={date}
          base={base}
          arhiveRates={arhiveRates}
          setDate={this.setDate}
          setBaseCurrency={this.setBaseCurrency}
        />
        <ArchiveRateTable arhiveRates={arhiveRates} base={base} />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType): TArchiveReducer =>
  state.archiveReducer;

const mapDispatchToProps: TActionsArchiveReducer = actionsArchiveReducer;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchiveRatesContainer);
