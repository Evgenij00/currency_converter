import React from "react";
import { Table } from "react-bootstrap";
import { TCurrency } from "../../currency-service";
import AvialableCurrency from "./AvialableCurrency";

type AvialableCurrenciesProps = {
  avialableCurrencies: TCurrency[];
};

const AvialableCurrencies: React.FC<AvialableCurrenciesProps> = (props) => {
  const { avialableCurrencies } = props;

  const items = avialableCurrencies.map((item) => (
    <AvialableCurrency key={item[0]} name={item[0]} fullName={item[1]} />
  ));

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
