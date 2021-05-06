import React from "react";

export const renderSelect = (array: [string, number][]): JSX.Element[] => {
  return array.map((item: [string, number]) => {
    return (
      <option key={item[0]} value={item[0]}>
        {item[0]}
      </option>
    );
  });
};

export const renderTable = (
  base: string,
  array: [string, number][]
): JSX.Element[] => {
  return array.map((item: [string, number]) => {
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
