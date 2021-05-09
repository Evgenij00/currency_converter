import React from "react";
import { Table } from "react-bootstrap";
import { TRate } from "../../../services/currency-service";
import { renderTable } from "../../../utils";

type ArchiveRateTableProps = {
  arhiveRates: TRate[];
  showTable: boolean;
  base: string;
};

const ArchiveRateTable: React.FC<ArchiveRateTableProps> = (props) => {
  const { showTable, base, arhiveRates } = props;

  const items = showTable ? renderTable(base, arhiveRates) : null;

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
