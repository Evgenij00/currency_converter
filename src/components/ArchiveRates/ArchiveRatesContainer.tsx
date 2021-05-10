import { connect } from "react-redux";
import React, { Component } from "react";

import { TService } from "../../currency-service";

import Spinner from "../spinner";
import { TAppState } from "../../store";
import ArchiveRateTable from "./ArchiveRateTable/ArchiveRateTable";
import ArchiveSelectionParameters from "./ArchiveSelectionParameters/ArchiveSelectionParameters";
import { TStateReducer } from "../../reducers/archiveRatesReducer/archiveRatesReducer";
import {
  callbacksReducer,
  TCallbacksReducer,
} from "../../reducers/archiveRatesReducer/actions";

type ArchiveRatesContainerProps = TStateReducer & TCallbacksReducer & TService;

class ArchiveRatesContainer extends Component<ArchiveRatesContainerProps> {
  componentDidMount() {
    const { base, date, fetchArvhiveRates } = this.props;
    fetchArvhiveRates(date, base);
  }

  setBaseCurrency = (base: string) => {
    localStorage.setItem("base", base);
    const { date, fetchArvhiveRates } = this.props;
    fetchArvhiveRates(date, base);
  };

  setDate = (date: string) => {
    const { base, fetchArvhiveRates } = this.props;
    fetchArvhiveRates(date, base);
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

const mapStateToProps = (state: TAppState): TStateReducer =>
  state.archiveRatesReducer;

const mapDispatchToProps: TCallbacksReducer = callbacksReducer;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchiveRatesContainer);
