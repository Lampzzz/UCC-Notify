import React from "react";

const SelectInput = ({ id, label, value, options, onChange }) => {
  return (
    <div className="d-flex align-items-center me-5">
      <label htmlFor={id} className="me-3 fs-5">
        {label}:
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-0 bg-light p-2"
        style={{ outline: "none" }}
      >
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className="border-0"
            style={{ outline: "none" }}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
