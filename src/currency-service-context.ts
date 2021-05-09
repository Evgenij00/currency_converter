import React from "react";
import CurrencyService, { ICurrencyService } from "./currency-service";

const {
  Provider: CurrencyServiceProvider,
  Consumer: CurrencyServiceConsumer,
} = React.createContext<ICurrencyService>(new CurrencyService());

export { CurrencyServiceProvider, CurrencyServiceConsumer };
