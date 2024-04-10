const InputContainer = ({ label, children }) => {
  return (
    <div className="mb-2">
      <label>{label}</label>
      {children}
    </div>
  );
};

export default InputContainer;
