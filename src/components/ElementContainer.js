import React from "react";

const ElementContainer = ({ children }) => {
  console.log(children);
  return <div className="timer-group">{children}</div>;
};

export default ElementContainer;
