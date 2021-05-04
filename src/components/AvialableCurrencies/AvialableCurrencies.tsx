import { Table } from "react-bootstrap";

type AvialableCurrenciesProps = {
  items: [string, string][]
}

const AvialableCurrencies: React.FC<AvialableCurrenciesProps> = ({items}) => {
  return (
    <Table className='mt-3' striped bordered hover size="sm">
      <caption>Доступные валюты. Данные обновляются каждый рабочий день около 16:00 по центральноевропейскому времени.</caption>
      <thead>
        <tr>
          <th>Аббревиатура</th>
          <th>Полное название</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  );
};

export default AvialableCurrencies