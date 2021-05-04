import React from "react";
import { Col, Form, Table, Button } from "react-bootstrap";

import './ArchiveRates'

type ArchiveRatesProps = {
  date: string
  base: string
  items: any
  options: any
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleSelectChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ArchiveRates: React.FC<ArchiveRatesProps> = ({ date, base, items, options, handleFormSubmit, handleSelectChange, handleDateChange }) => {
  // console.log(date)
  // console.log(date)
  // console.log(items)
  // console.log(options)
  return (
    <>
      <Form className='mt-5' onSubmit={handleFormSubmit}>
        <Form.Row>
          <Form.Group as={Col} md='4' controlId="exampleForm.SelectCustom">
            <Form.Label>Выберите валюту</Form.Label>
            <Form.Control as="select" value={base} onChange={handleSelectChange} custom>
              {options}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} md='4'>
            <Form.Label>Выберите день</Form.Label>
            <Form.Control type="date" onChange={handleDateChange} value={date} />
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
          {items}
        </tbody>
      </Table>
    </>
  )
};

export default ArchiveRates