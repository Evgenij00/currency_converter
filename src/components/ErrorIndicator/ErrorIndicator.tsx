import React from "react";

import "./ErrorIndicator.css";
import icon from "./dollars.svg";

const Error: React.FC = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="error icon" />
      <span className="boom">Упс!</span>
      <span>Что-то пошло не так</span>
      <span>(Попробуйте позже)</span>
    </div>
  );
};

export default Error;
