import React from "react";
import { Col, Form } from "react-bootstrap";
import { TRate } from "../../../currency-service";
import SelectionItem from "./SelectionItem";

type CurrencySelectionProps = {
  base: string;
  currencyRates: TRate[];
  setBaseCurrency: (base: string) => void;
};

const CurrencySelection: React.FC<CurrencySelectionProps> = (props) => {
  const { currencyRates, base, setBaseCurrency } = props;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const body = e.target.value;
    setBaseCurrency(body);
  };

  const options = currencyRates.map((item) => (
    <SelectionItem key={item[0]} name={item[0]} />
  ));
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
      </Form.Row>
    </Form>
  );
};

export default CurrencySelection;
