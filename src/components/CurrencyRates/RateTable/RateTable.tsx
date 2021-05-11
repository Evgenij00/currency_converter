import React from "react";
import { Table } from "react-bootstrap";
import { TRate } from "../../../currency-service";
import TableItem from "./TableItem";

type RateTableProps = {
  base: string;
  currencyRates: TRate[];
};

const RateTable: React.FC<RateTableProps> = ({ base, currencyRates }) => {
  const items = currencyRates.map((item) => (
    <TableItem key={item[0]} from={base} to={item[0]} price={item[1]} />
  ));
  return (
    <Table striped bordered hover size="sm">
      <caption>Курсы в режиме реального времени</caption>
      <thead>
        <tr>
          <th>Основные пары</th>
          <th>Курс</th>
        </tr>
      </thead>
      <tbody>{items}</tbody>
    </Table>
  );
};

export default RateTable;
