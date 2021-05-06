import { connect } from "react-redux";
import React, { Component } from "react";
import withCurrencyService from "../../components/hoc";

import { TArchiveReducer } from "../../reducers/archive-reducer/archive-reducer";
import { TRates, TService } from "../../services/currency-service";
import { renderSelect, renderTable } from "../../utils";

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
    const {
      base,
      date,
      service,
      archiveLoaded,
      archiveError,
      archiveRequested,
    } = this.props;
    archiveRequested();
    service
      .getArchiveByBase(base, date)
      .then((rates: TRates) => archiveLoaded(rates))
      .catch((error: Error) => archiveError(error));
  }

  handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { setArchiveBase } = this.props;
    const base = e.target.value;
    localStorage.setItem("base", base);
    setArchiveBase(base);
  };

  handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { setArchiveDate } = this.props;
    const date = e.target.value;
    setArchiveDate(date);
  };

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      base,
      date,
      service,
      archiveLoaded,
      archiveError,
      archiveRequested,
    } = this.props;

    archiveRequested();
    service
      .getArchiveByBase(base, date)
      .then((rates: TRates) => archiveLoaded(rates))
      .catch((error: Error) => archiveError(error));
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

    const options = renderSelect(arhiveRates);
    const items = showTable ? renderTable(base, arhiveRates) : null;

    return (
      <ArchiveRates
        date={date}
        currentDate={currentDate}
        base={base}
        items={items}
        options={options}
        handleFormSubmit={this.handleFormSubmit}
        handleSelectChange={this.handleSelectChange}
        handleDateChange={this.handleDateChange}
      />
    );
  }
}

const mapStateToProps = ({
  archiveReducer,
}: {
  archiveReducer: TArchiveReducer;
}): TArchiveReducer => archiveReducer;
const mapDispatchToProps: TActionsArchiveReducer = actionsArchiveReducer;

export default withCurrencyService()(
  connect(mapStateToProps, mapDispatchToProps)(ArchiveRatesContainer)
);
