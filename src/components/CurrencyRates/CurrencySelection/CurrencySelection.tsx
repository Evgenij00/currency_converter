import React from "react";
import { Form } from "react-bootstrap";
import { TRate } from "../../../services/currency-service";
import { renderSelect } from "../../../utils";

type CurrencySelectionProps = {
  base: string;
  currencyRates: TRate[];
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const CurrencySelection: React.FC<CurrencySelectionProps> = (props) => {
  const { currencyRates, base, handleSelectChange } = props;

  const options = renderSelect(currencyRates);
  return (
    <Form className="mt-3">
      <Form.Group controlId="exampleForm.SelectCustom">
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
    </Form>
  );
};

export default CurrencySelection;
