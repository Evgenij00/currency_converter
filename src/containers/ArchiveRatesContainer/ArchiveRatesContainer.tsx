import { connect } from "react-redux";
import { Component } from "react";
import { withCurrencyService } from "../../components/hoc";

import { TFeatchArchiveRequest, TFetchArchiveSuccess, TFetchArchiveError, TArchiveBase, TArchiveDate } from "../../actions/types";
import { TArchiveReducer } from "../../reducers/archive-reducer";
import { ICurrencyService } from "../../services/currency-service";
import {archiveRequested, archiveLoaded, archiveError, setArchiveBase, setArchiveDate} from '../../actions'

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
    const {base, date, service, archiveLoaded, archiveError} = this.props

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

    const {base, date, service, archiveLoaded, archiveError } = this.props

    // archiveRequested();
    service
      .getArchiveByBase(base, date)
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
    const {base, date, service, loading, error, arhiveRates} = this.props
    const currentDate = service.getCurrentDate()

    if (loading) return <Spinner />
    if (error) return <h1>Что-то пошло не так... Попробуйте в другой раз.</h1>;

    const options = arhiveRates.map(this.renderSelect)
    const items = arhiveRates.map(this.renderTabels)

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