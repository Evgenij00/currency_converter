import React from "react";

type AvialableCurrencyProps = {
  name: string;
  fullName: string;
};

const AvialableCurrency: React.FC<AvialableCurrencyProps> = (props) => {
  const { name, fullName } = props;

  return (
    <tr>
      <td>{name}</td>
      <td>{fullName}</td>
    </tr>
  );
};

export default AvialableCurrency;
