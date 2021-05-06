import React from "react";
import { TRate } from "./services/currency-service";

export const renderSelect = (array: TRate[]): JSX.Element[] => {
  return array.map((item) => {
    return (
      <option key={item[0]} value={item[0]}>
        {item[0]}
      </option>
    );
  });
};

export const renderTable = (base: string, array: TRate[]): JSX.Element[] => {
  return array.map((item) => {
    return (
      <tr key={item[0]}>
        <td>
          {base}/{item[0]}
        </td>
        <td>
          <span>{item[1]}</span>
        </td>
      </tr>
    );
  });
};
