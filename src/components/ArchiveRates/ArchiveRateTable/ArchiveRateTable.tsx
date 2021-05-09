import React from "react";
import { Table } from "react-bootstrap";

type ArchiveRateTableProps = {
  items: JSX.Element[] | null;
  // items: JSX.Element[] | null;
};

const ArchiveRateTable: React.FC<ArchiveRateTableProps> = ({ items }) => {
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
