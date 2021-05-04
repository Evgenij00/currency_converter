import Form from "react-bootstrap/Form";

import { Button, Col } from "react-bootstrap";
import React from "react";

import { Link } from "react-router-dom";

const Converter = () => {
  return (
    <>
      <Form className='mt-5 mb-2'>
        <Form.Row>
          <Form.Group as={Col} md='5'>
            <Form.Label>Что вы хотите конвертировать?</Form.Label>
            <Form.Control type="text" placeholder="10 usd in rub" />
            <Form.Text className="text-muted">
              Убедитесь, что вы правильно ввели данные (должны быть в формате ISO). Регистр не имеет значения.
              Пример: 10 usd in rub
          </Form.Text>
          </Form.Group>

          <Form.Group as={Col} md='4'>
            <Form.Label>Выберите день</Form.Label>
            <Form.Control type="date"/>
          </Form.Group>
        </Form.Row>
        <Button type='submit' className='mr-2' variant="primary">Конвертировать</Button>
        <span>1.0325</span>
      </Form>
      <Link to='/available-currencies'>Посмотреть список доступных валют</Link>
    </>
  );
};

export default Converter