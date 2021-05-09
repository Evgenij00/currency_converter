import React from "react";
import { Table } from "react-bootstrap";
import { TRate } from "../../../currency-service";
import TableItem from "./TableItem";

type ArchiveRateTableProps = {
  arhiveRates: TRate[];
  base: string;
};

const ArchiveRateTable: React.FC<ArchiveRateTableProps> = (props) => {
  const { base, arhiveRates } = props;

  const items = arhiveRates.map((item) => (
    <TableItem key={item[0]} base={base} target={item[0]} price={item[1]} />
  ));

  return (
    <Table striped bordered hover size="sm">
      <caption>Архив:</caption>
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

export default ArchiveRateTable;
