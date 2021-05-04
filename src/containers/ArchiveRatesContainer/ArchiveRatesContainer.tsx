import { connect } from "react-redux";
import { Component } from "react";
import { withCurrencyService } from "../../components/hoc";

import { TArchiveReducer } from "../../reducers/archive-reducer/archive-reducer";
import { ICurrencyService } from "../../services/currency-service";
import {renderSelect, renderTable} from '../../utils'

import { TFeatchArchiveRequest, TFetchArchiveSuccess,
TFetchArchiveError, TArchiveBase, TArchiveDate, archiveRequested,
archiveLoaded, archiveError, setArchiveBase, setArchiveDate } from "../../reducers/archive-reducer/actions";

import ArchiveRates from '../../components/ArchiveRates'
import Spinner from "../../components/spinner";

type TDispatchProps = {
  archiveRequested: () => TFeatchArchiveRequest
  archiveLoaded: (data: any) => TFetchArchiveSuccess
  archiveError: (error: Error) => TFetchArchiveError
  setArchiveBase: (base: string) => TArchiveBase
  setArchiveDate: (date: string) => TArchiveDate
}

type TOwnProps = {
  service: ICurrencyService
}

type ArchiveRatesContainerProps = TArchiveReducer & TDispatchProps & TOwnProps

class ArchiveRatesContainer extends Component<ArchiveRatesContainerProps> {

  componentDidMount() {
    const {base, date, service, archiveLoaded, archiveError, archiveRequested} = this.props
    archiveRequested();
    service
      .getArchiveByBase(base, date)
      .then((rates: [string, number][]) => archiveLoaded(rates))
      .catch((error: Error) => archiveError(error))
  }

  handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const base = e.target.value
    localStorage.setItem('base', base)
    this.props.setArchiveBase(base)
  }

  handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    this.props.setArchiveDate(date)
  }

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const {base, date, service, archiveLoaded, archiveError, archiveRequested } = this.props

    archiveRequested();
    service
      .getArchiveByBase(base, date)
      .then((rates: [string, number][]) => archiveLoaded(rates))
      .catch((error: Error) => archiveError(error));
  };

  render() {
    const {base, date, service, showTable, loading, error, arhiveRates} = this.props
    const currentDate = service.getCurrentDate()

    if (loading) return <Spinner />
    if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

    const options = renderSelect(arhiveRates)
    const items = showTable ? renderTable(base, arhiveRates) : null

    return (
      <ArchiveRates
        date={date}
        currentDate={currentDate}
        base={base}
        items={items} 
        options={options} 
        handleFormSubmit={this.handleFormSubmit} 
        handleSelectChange={this.handleSelectChange} 
        handleDateChange={this.handleDateChange} />
    );
  }
};

const mapStateToProps = (
  { archiveReducer: { base, date, showTable, arhiveRates, loading, error }}:
  { archiveReducer: TArchiveReducer }): TArchiveReducer => {
  return { base, date, showTable, arhiveRates, loading, error };
};

const mapDispatchToProps: TDispatchProps = {
  archiveRequested,
  archiveLoaded,
  archiveError,
  setArchiveBase,
  setArchiveDate,
};

export default withCurrencyService()(
  connect(mapStateToProps, mapDispatchToProps)(ArchiveRatesContainer)
)