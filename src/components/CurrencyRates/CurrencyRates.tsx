import { Form, Table } from "react-bootstrap";

const CurrencyRates = () => {
  return (
    <>
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Выберите валюту</Form.Label>
          <Form.Control as="select"
            custom>
            <option value='RUB'>RUB</option>
            <option value='RUB'>RUB</option>
            <option value='RUB'>RUB</option>
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
}

export default CurrencyRates