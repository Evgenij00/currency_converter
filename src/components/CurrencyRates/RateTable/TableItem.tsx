import React from "react";

type TableItemProps = {
  from: string;
  to: string;
  price: number;
};

const TableItem: React.FC<TableItemProps> = ({ from, to, price }) => {
  return (
    <tr>
      <td>
        {from}/{to}
      </td>
      <td>{price}</td>
    </tr>
  );
};

export default TableItem;
