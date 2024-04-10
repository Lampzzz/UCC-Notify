import { useNavigate } from "react-router-dom";

export const ContentLink = (id) => {
  const navigate = useNavigate();
  navigate(`/content/${id}`);
};
