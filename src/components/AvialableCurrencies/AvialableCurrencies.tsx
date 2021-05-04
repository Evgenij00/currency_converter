import { Table } from "react-bootstrap";

import './AvialableCurrencies.css'

const AvailableCurrencies = () => {
  return (
    <Table striped bordered hover size="sm">
      <caption>Доступные валюты</caption>
      <thead>
        <tr>
          <th>Валюта</th>
          <th>Покупка</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            USD/RUB
              </td>
          <td>
            <span>1,0325</span>
          </td>
        </tr>
        <tr>
          <td>
            USD/RUB
              </td>
          <td>
            <span>1,0325</span>
          </td>
        </tr>
        <tr>
          <td>
            USD/RUB
              </td>
          <td>
            <span>1,0325</span>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default AvailableCurrencies