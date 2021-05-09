import React from "react";
import { Table } from "react-bootstrap";
import { TRate } from "../../../services/currency-service";
import { renderTable } from "../../../utils";

type RateTableProps = {
  base: string;
  currencyRates: TRate[];
};

const RateTable: React.FC<RateTableProps> = ({ base, currencyRates }) => {
  const items = renderTable(base, currencyRates);
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
