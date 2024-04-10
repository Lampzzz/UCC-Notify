const ContentButton = ({ onClick, children }) => {
  return (
    <button className="btn p-0 text-start border-0" onClick={onClick}>
      <div className={`link__content`}>{children}</div>
    </button>
  );
};

export default ContentButton;
