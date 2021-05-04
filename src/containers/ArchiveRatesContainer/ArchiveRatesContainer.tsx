import { connect } from "react-redux";
import React, { Component } from "react";
import { TFeatchArchiveRequest, TFetchArchiveSuccess, TFetchArchiveError, TArchiveBase, TArchiveDate } from "../../actions/types";
import { withCurrencyService } from "../../components/hoc";
import { TArchiveReducer } from "../../reducers/archive-reducer";
import { ICurrencyService } from "../../services/currency-service";
import {archiveRequested, archiveLoaded, archiveError, setArchiveBase, setArchiveDate} from '../../actions'
import ArchiveRates from '../../components/ArchiveRates'

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
    const {base, date, archiveLoaded, archiveError} = this.props
    this.props.service
      .getHistoryFrom(base, date)
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

    const {base, date, service, archiveLoaded, archiveError } = this.props

    archiveRequested();
    service
      .getHistoryFrom(base, date)
      .then((rates: [string, number][]) => archiveLoaded(rates))
      .catch((error: Error) => archiveError(error));
  };

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
    const {base, date, loading, error, arhiveRates} = this.props

    if (loading) return <h1>Выполняем работу :)</h1>;
    if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

    const options = arhiveRates.map(this.renderSelect)
    const items = arhiveRates.map(this.renderTabels)

    return (
      <ArchiveRates
        date={date}
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
  { archiveReducer: { base, date, arhiveRates, loading, error }}:
  { archiveReducer: TArchiveReducer }): TArchiveReducer => {
  return { base, date, arhiveRates, loading, error };
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