import { Component } from "react";

import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from "./components/Header";

import 'bootstrap/dist/css/bootstrap.min.css'
import CurrencyRates from "./components/CurrencyRates";
import ArchiveRates from "./components/ArchiveRates";
import AvailableCurrencies from "./components/AvialableCurrencies/AvialableCurrencies";
import ConverterContainer from "./containers/ConverterContainer";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <Header />
      <Container fluid='sm'>
        <Switch>
          <Route path='/' exact component={CurrencyRates} />
          <Route path='/convert' component={ConverterContainer} />
          <Route path='/course-archive' component={ArchiveRates} />
          <Route path='/available-currencies' component={AvailableCurrencies} />
        </Switch>
      </Container>
    </BrowserRouter>
    );
  }
}

export default App;
