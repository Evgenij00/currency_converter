import { connect } from "react-redux";
import React, { Component } from "react";
import withCurrencyService from "../../components/hoc";

import { TArchiveReducer } from "../../reducers/archive-reducer/archive-reducer";
import { TService } from "../../services/currency-service";

import {
  actionsArchiveReducer,
  TActionsArchiveReducer,
} from "../../reducers/archive-reducer/actions";

import ArchiveRates from "../../components/ArchiveRates";
import Spinner from "../../components/spinner";

type ArchiveRatesContainerProps = TArchiveReducer &
  TActionsArchiveReducer &
  TService;

class ArchiveRatesContainer extends Component<ArchiveRatesContainerProps> {
  componentDidMount() {
    const { base, date, fetchArvhiveRates } = this.props;
    fetchArvhiveRates(base, date);
  }

  setBaseCurrency = (base: string) => {
    const { setArchiveBase } = this.props;
    localStorage.setItem("base", base);
    setArchiveBase(base);
  };

  setDate = (date: string) => {
    const { setArchiveDate } = this.props;
    setArchiveDate(date);
  };

  getArchiveRates = () => {
    const { base, date, fetchArvhiveRates } = this.props;
    fetchArvhiveRates(base, date);
  };

  render() {
    const {
      base,
      date,
      service,
      showTable,
      loading,
      error,
      arhiveRates,
    } = this.props;
    const currentDate = service.getCurrentDate();

    if (loading) return <Spinner />;
    if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

    return (
      <ArchiveRates
        date={date}
        currentDate={currentDate}
        base={base}
        showTable={showTable}
        arhiveRates={arhiveRates}
        getArchiveRates={this.getArchiveRates}
        setBaseCurrency={this.setBaseCurrency}
        setDate={this.setDate}
      />
    );
  }
}

const mapStateToProps = (state: any): TArchiveReducer => state.archiveReducer;

const mapDispatchToProps: TActionsArchiveReducer = actionsArchiveReducer;

export default withCurrencyService()(
  connect(mapStateToProps, mapDispatchToProps)(ArchiveRatesContainer)
);
