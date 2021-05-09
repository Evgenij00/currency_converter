import React from "react";

type SelectionItemProps = {
  name: string;
};

const SelectionItem: React.FC<SelectionItemProps> = ({ name }) => {
  return <option value={name}>{name}</option>;
};

export default SelectionItem;
