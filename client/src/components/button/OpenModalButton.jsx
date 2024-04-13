const OpenModalButton = ({ children, target, style }) => {
  return (
    <button
      className={`${style} btn border-0`}
      data-bs-toggle="modal"
      data-bs-target={`#${target}`}
    >
      {children}
    </button>
  );
};

export default OpenModalButton;
