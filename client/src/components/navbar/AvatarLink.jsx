import { LuUser2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "@Services/redux/api/authApiSlice";
import { logout } from "@Services/redux/slice/authSlice";

const AvatarLink = ({ to }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutAPICall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutAPICall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <ul className="dropdown-menu" id="userDropdown">
      <div className="line"></div>
      <li>
        <Link to={to} className="text-decoration-none">
          <button className="dropdown-item">
            <p className="mb-0">Profile</p>
          </button>
        </Link>
      </li>
      <li>
        <button onClick={handleLogout} className="dropdown-item">
          <p className="mb-0">Logout</p>
        </button>
      </li>
    </ul>
  );
};

export default AvatarLink;
