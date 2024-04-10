import React from "react";

const SectionContainer = ({ style, children }) => {
  return <div className={`py-5 ${style}`}>{children}</div>;
};

export default SectionContainer;
