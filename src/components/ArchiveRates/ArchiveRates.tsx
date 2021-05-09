import React from "react";
import { TRate } from "../../services/currency-service";
import ArchiveRateTable from "./ArchiveRateTable/ArchiveRateTable";
import ArchiveSelectionParameters from "./ArchiveSelectionParameters/ArchiveSelectionParameters";

type ArchiveRatesProps = {
  date: string;
  currentDate: string;
  base: string;
  arhiveRates: TRate[];
  showTable: boolean;
  getArchiveRates: () => void;
  setBaseCurrency: (base: string) => void;
  setDate: (date: string) => void;
};

const ArchiveRates: React.FC<ArchiveRatesProps> = ({
  date,
  currentDate,
  base,
  arhiveRates,
  showTable,
  getArchiveRates,
  setBaseCurrency,
  setDate,
}) => {
  return (
    <>
      <ArchiveSelectionParameters
        date={date}
        currentDate={currentDate}
        base={base}
        arhiveRates={arhiveRates}
        getArchiveRates={getArchiveRates}
        setDate={setDate}
        setBaseCurrency={setBaseCurrency}
      />
      <ArchiveRateTable
        arhiveRates={arhiveRates}
        showTable={showTable}
        base={base}
      />
    </>
  );
};

export default ArchiveRates;
