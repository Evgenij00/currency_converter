import React from "react";
import { Col, Form } from "react-bootstrap";
import { TRate } from "../../../currency-service";
import SelectionItem from "./SelectionItem";

type ArchiveSelectionParametersProps = {
  date: string;
  base: string;
  arhiveRates: TRate[];
  setBaseCurrency: (base: string) => void;
  setDate: (date: string) => void;
};

const ArchiveSelectionParameters: React.FC<ArchiveSelectionParametersProps> = (
  props
) => {
  const { date, base, arhiveRates, setBaseCurrency, setDate } = props;

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const body = e.target.value;
    setBaseCurrency(body);
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const body = e.target.value;
    setDate(body);
  };

  const options = arhiveRates.map((item) => (
    <SelectionItem key={item[0]} name={item[0]} />
  ));
  const currentDate = new Date().toLocaleDateString("en-CA");

  return (
    <Form className="mt-3">
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="exampleForm.SelectCustom">
          <Form.Label>Выберите валюту</Form.Label>
          <Form.Control
            as="select"
            value={base}
            onChange={handleSelectChange}
            custom
          >
            {options}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Выберите день</Form.Label>
          <Form.Control
            type="date"
            max={currentDate}
            onChange={handleDateChange}
            value={date}
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default ArchiveSelectionParameters;
