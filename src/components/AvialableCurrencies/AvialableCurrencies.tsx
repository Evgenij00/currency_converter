import { Table } from "react-bootstrap";

import './AvialableCurrencies.css'

type AvialableCurrenciesProps = {
  items: [string, string][]
}

const AvialableCurrencies: React.FC<AvialableCurrenciesProps> = ({items}) => {
  // console.log(items)
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
        {items}
      </tbody>
    </Table>
  );
};

export default AvialableCurrencies