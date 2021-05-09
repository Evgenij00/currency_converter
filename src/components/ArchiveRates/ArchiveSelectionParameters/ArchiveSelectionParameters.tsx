import React from "react";
import { Col, Form, Button } from "react-bootstrap";
import { TRate } from "../../../services/currency-service";
import { renderSelect } from "../../../utils";

type ArchiveSelectionParametersProps = {
  date: string;
  currentDate: string;
  base: string;
  arhiveRates: TRate[];
  getArchiveRates: () => void;
  setBaseCurrency: (base: string) => void;
  setDate: (date: string) => void;
};

const ArchiveSelectionParameters: React.FC<ArchiveSelectionParametersProps> = (
  props
) => {
  const {
    date,
    currentDate,
    base,
    arhiveRates,
    getArchiveRates,
    setBaseCurrency,
    setDate,
  } = props;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getArchiveRates();
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const body = e.target.value;
    setBaseCurrency(body);
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const body = e.target.value;
    setDate(body);
  };

  const options = renderSelect(arhiveRates);

  return (
    <Form className="mt-3" onSubmit={handleFormSubmit}>
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
      <Button type="submit" variant="primary">
        Получить
      </Button>
    </Form>
  );
};

export default ArchiveSelectionParameters;
