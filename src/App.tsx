import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import ConverterContainer from "./containers/ConverterContainer";
import CurrencyRatesContainer from "./containers/CurrencyRatesContainer";
import ArchiveRatesContainer from "./containers/ArchiveRatesContainer";
import AvialableCurrenciesContainer from "./containers/AvialableCurrenciesContainer";

import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container fluid="sm">
        <Switch>
          <Route path="/" exact component={CurrencyRatesContainer} />
          <Route path="/convert" component={ConverterContainer} />
          <Route path="/course-archive" component={ArchiveRatesContainer} />
          <Route
            path="/available-currencies"
            component={AvialableCurrenciesContainer}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
