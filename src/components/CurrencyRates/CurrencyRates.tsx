import { Form, Table } from "react-bootstrap";

import './CurrencyRates.css'

type CurrencyRatesProps = {
  options: any
  items: any
  base: string
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const CurrencyRates: React.FC<CurrencyRatesProps> = ({ options, items, base, handleSelectChange }) => {
  return (
    <>
      <Form className='mt-3'>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Выберите валюту</Form.Label>
          <Form.Control as="select"
            value={base}
            onChange={handleSelectChange}
            custom>
            {options}
          </Form.Control>
        </Form.Group>
      </Form>
      <Table striped bordered hover size="sm">
        <caption>Курсы в режиме реального времени</caption>
        <thead>
          <tr>
            <th>Основные пары</th>
            <th>Курс</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    </>
  )
}

export default CurrencyRates