import React, { FC } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";

type ConverterProps = {
  text: string;
  result: JSX.Element;
  inputValid: boolean;
  date: string;
  getConvertPrice: () => void;
  changeText: (text: string) => void;
  changeDate: (date: string) => void;
};

const ConverterHooks: FC<ConverterProps> = (props) => {
  const {
    text,
    result,
    inputValid,
    date,
    getConvertPrice,
    changeText,
    changeDate,
  } = props;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const body = e.target.value;
    changeText(body);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const body = e.target.value;
    changeDate(body);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getConvertPrice();
  };

  const currentDate = new Date().toLocaleDateString("en-CA");

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
            <Form.Text className="text-primary">
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
          variant="success"
          disabled={!inputValid}
        >
          Конвертировать
        </Button>
        <span>{result}</span>
      </Form>
      <Link to="/available-currencies">Посмотреть список доступных валют</Link>
    </>
  );
};

export default ConverterHooks;
