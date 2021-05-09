import React from "react";
import ArchiveRateTable from "./ArchiveRateTable/ArchiveRateTable";
import ArchiveSelectionParameters from "./ArchiveSelectionParameters/ArchiveSelectionParameters";

type ArchiveRatesProps = {
  date: string;
  currentDate: string;
  base: string;
  items: JSX.Element[] | null;
  // items: JSX.Element[] | null;
  options: JSX.Element[];
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ArchiveRates: React.FC<ArchiveRatesProps> = ({
  date,
  currentDate,
  base,
  items,
  options,
  handleFormSubmit,
  handleSelectChange,
  handleDateChange,
}) => {
  return (
    <>
      <ArchiveSelectionParameters
        date={date}
        currentDate={currentDate}
        base={base}
        options={options}
        handleFormSubmit={handleFormSubmit}
        handleDateChange={handleDateChange}
        handleSelectChange={handleSelectChange}
      />
      <ArchiveRateTable items={items} />
    </>
  );
};

export default ArchiveRates;
