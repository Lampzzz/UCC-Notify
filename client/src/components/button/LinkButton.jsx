const LinkButton = ({ children }) => {
  return (
    <button
      className="btn border-0 "
      data-bs-toggle="modal"
      data-bs-target="#login"
    >
      {children}
    </button>
  );
};

export default LinkButton;
