import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import CurrencyRatesContainer from "./components/CurrencyRates";
import ConverterContainer from "./components/Converter";
import ArchiveRatesContainer from "./components/ArchiveRates";
import AvialableCurrenciesContainer from "./components/AvialableCurrencies";

// import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container fluid="sm">
        <Switch>
          <Route path="/" exact component={ConverterContainer} />
          <Route path="/latest-rates" component={CurrencyRatesContainer} />
          <Route path="/archive-rates" component={ArchiveRatesContainer} />
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
