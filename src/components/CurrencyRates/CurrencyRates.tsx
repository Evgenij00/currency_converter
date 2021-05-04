import { Form, Table } from "react-bootstrap";

type CurrencyRatesProps = {
  options: any
  items: any
  base: string
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const CurrencyRates: React.FC<CurrencyRatesProps> = ({ options, items, base, handleSelectChange }) => {
  // console.log(base)
  return (
    <>
      <Form>
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
        <caption>КУРСЫ В РЕЖИМЕ РЕАЛЬНОГО ВРЕМЕНИ</caption>
        <thead>
          <tr>
            <th>Основные пары</th>
            <th>Покупка</th>
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