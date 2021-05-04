import Form from "react-bootstrap/Form";

import { Button, Col } from "react-bootstrap";
import React from "react";

import { Link } from "react-router-dom";

type ConverterProps = {
  text: string
  general: string
  inputValid: boolean
  date: string
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Converter: React.FC<ConverterProps> = ({ text, general, inputValid, date, handleFormSubmit, handleInputChange, handleDateChange }) => {
  return (
    <>
      <Form className='mt-5 mb-2' onSubmit={handleFormSubmit}>
        <Form.Row>
          <Form.Group as={Col} md='5'>
            <Form.Label>Что вы хотите конвертировать?</Form.Label>
            <Form.Control type="text" value={text} onChange={handleInputChange} placeholder="10 usd in rub" />
            <Form.Text className="text-muted">
              Убедитесь, что вы правильно ввели данные (должны быть в формате ISO). Регистр не имеет значения.
              Пример: 10 usd in rub
          </Form.Text>
          </Form.Group>

          <Form.Group as={Col} md='4'>
            <Form.Label>Выберите день</Form.Label>
            <Form.Control type="date" value={date} onChange={handleDateChange}/>
          </Form.Group>
        </Form.Row>
        <Button type='submit' className='mr-2' variant="primary" disabled={inputValid}>Конвертировать</Button>
        <span>{general}</span>
      </Form>
      <Link to='/available-currencies'>Посмотреть список доступных валют</Link>
    </>
  );
};

export default Converter