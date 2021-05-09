import React from "react";
import { TRate } from "../../services/currency-service";

import CurrencySelection from "./CurrencySelection/CurrencySelection";
import RateTable from "./RateTable/RateTable";

type CurrencyRatesProps = {
  base: string;
  currencyRates: TRate[];
  setBaseCurrency: (base: string) => void;
};

const CurrencyRates: React.FC<CurrencyRatesProps> = (props) => {
  const { base, currencyRates, setBaseCurrency } = props;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const body = e.target.value;
    setBaseCurrency(body);
  };

  return (
    <>
      <CurrencySelection
        base={base}
        currencyRates={currencyRates}
        handleSelectChange={handleSelectChange}
      />
      <RateTable currencyRates={currencyRates} base={base} />
    </>
  );
};

export default CurrencyRates;
