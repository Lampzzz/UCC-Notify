import { useNavigate } from "react-router-dom";

const ContentButton = ({ id, children }) => {
  const navigate = useNavigate();

  const hadleContent = () => {
    navigate(`/content/${id}`);
  };

  return (
    <button
      className="btn p-0 border-0 text-start d-block"
      onClick={hadleContent}
    >
      <div className="main--hover">{children}</div>
    </button>
  );
};

export default ContentButton;
