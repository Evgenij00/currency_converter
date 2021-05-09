import React from "react";
import { Col, Form, Button } from "react-bootstrap";

type ArchiveSelectionParametersProps = {
  date: string;
  currentDate: string;
  base: string;
  options: JSX.Element[];
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ArchiveSelectionParameters: React.FC<ArchiveSelectionParametersProps> = ({
  date,
  currentDate,
  base,
  options,
  handleFormSubmit,
  handleSelectChange,
  handleDateChange,
}) => {
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
