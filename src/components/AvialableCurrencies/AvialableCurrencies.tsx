import React from "react";
import { Table } from "react-bootstrap";
import { TCurrency } from "../../services/currency-service";

type AvialableCurrenciesProps = {
  avialableCurrencies: TCurrency[];
};

const AvialableCurrencies: React.FC<AvialableCurrenciesProps> = (props) => {
  const { avialableCurrencies } = props;

  const renderTabels = (item: TCurrency): JSX.Element => {
    return (
      <tr key={item[0]}>
        <td>{item[0]}</td>
        <td>
          <span>{item[1]}</span>
        </td>
      </tr>
    );
  };

  const items = avialableCurrencies.map(renderTabels);

  return (
    <Table className="mt-3" striped bordered hover size="sm">
      <caption>
        Доступные валюты. Данные обновляются каждый рабочий день около 16:00 по
        центральноевропейскому времени.
      </caption>
      <thead>
        <tr>
          <th>Аббревиатура</th>
          <th>Полное название</th>
        </tr>
      </thead>
      <tbody>{items}</tbody>
    </Table>
  );
};

export default AvialableCurrencies;
