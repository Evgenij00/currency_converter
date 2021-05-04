import React from "react";
import { Col, Form, Table, Button } from "react-bootstrap";

import './ArchiveRates'

const ArchiveRates = () => {
  return (
    <>
      <Form className='mt-5'>
        <Form.Row>
          <Form.Group as={Col} md='4' controlId="exampleForm.SelectCustom">
            <Form.Label>Выберите валюту</Form.Label>
            <Form.Control as="select" custom>
              <option value='RUB'>RUB</option>
              <option value='RUB'>RUB</option>
              <option value='RUB'>RUB</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} md='4'>
            <Form.Label>Выберите день</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Form.Row>
        <Button type='submit' variant="primary">Получить</Button>
      </Form>
      <Table striped bordered hover size="sm">
        <caption>Все курсы валют на 01.05.2021:</caption>
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Покупка</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              JPY/RUB
            </td>
            <td>
              <span>1.0325</span>
            </td>
          </tr>
          <tr>
            <td>
              JPY/RUB
            </td>
            <td>
              <span>1.0325</span>
            </td>
          </tr>
          <tr>
            <td>
              JPY/RUB
            </td>
            <td>
              <span>1.0325</span>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
};

export default ArchiveRates