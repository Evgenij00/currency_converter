import React from "react";

type TableItemProps = {
  base: string;
  target: string;
  price: number;
};

const TableItem: React.FC<TableItemProps> = ({ base, target, price }) => {
  return (
    <tr>
      <td>
        {base}/{target}
      </td>
      <td>{price}</td>
    </tr>
  );
};

export default TableItem;
