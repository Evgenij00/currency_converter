import React, { FC } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";

type ConverterProps = {
  text: string;
  result: JSX.Element;
  inputValid: boolean;
  date: string;
  currentDate: string;
  getConvertPrice: () => void;
  setText: (text: string) => void;
  setDate: (date: string) => void;
};

const Converter: FC<ConverterProps> = (props) => {
  const {
    text,
    result,
    inputValid,
    date,
    currentDate,
    getConvertPrice,
    setText,
    setDate,
  } = props;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const body = e.target.value;
    setText(body);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const body = e.target.value;
    setDate(body);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getConvertPrice();
  };

  return (
    <>
      <Form className="mt-3 mb-2" onSubmit={handleFormSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="5">
            <Form.Label>Что вы хотите конвертировать?</Form.Label>
            <Form.Control
              type="text"
              value={text}
              onChange={handleInputChange}
              placeholder="Введите текст..."
            />
            <Form.Text className="text-muted">
              Убедитесь, что вы правильно ввели данные (должны быть в формате
              ISO). Регистр не имеет значения. Пример: 10 usd in rub
            </Form.Text>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Выберите день</Form.Label>
            <Form.Control
              type="date"
              value={date}
              max={currentDate}
              onChange={handleDateChange}
            />
          </Form.Group>
        </Form.Row>
        <Button
          type="submit"
          className="mr-2"
          variant="primary"
          disabled={inputValid}
        >
          Конвертировать
        </Button>
        <span>{result}</span>
      </Form>
      <Link to="/available-currencies">Посмотреть список доступных валют</Link>
    </>
  );
};

export default Converter;
