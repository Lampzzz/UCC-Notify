import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { fetchUserDetail } from "@Services/api/fetchUserDetail";
import NavbarLink from "./NavbarLink";
import AuthModal from "../modal/AuthModal";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import AvatarLink from "./AvatarLink";
import logo from "../../assets/image/logo.png";
import SideNavbar from "./SideNavbar";

const Navbar = () => {
  const { userInfo, user } = fetchUserDetail();

  return (
    <>
      <div className="container-fluid px-5 border-bottom sticky-top top-0 shadow-sm bg-white ">
        <nav className="navbar navbar-expand-lg py-3">
          <div className="navbar-brand fw-bold fs-4" href="#">
            <img src={logo} alt="UCC Notify Logo" className="logo" />
          </div>
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#siderBar"
            aria-controls="offcanvasExample"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mx-auto mb-lg-0 gap-3">
              <NavbarLink link="/" label="Home" />
              <NavbarLink
                link="/announcements"
                label="Announcement"
                dropdownItems={[
                  { label: "News", link: "/announcements/news" },
                  { label: "Events", link: "/announcements/events" },
                ]}
              />
              <NavbarLink link="/about" label="About" />
              <NavbarLink link="/contact" label="Contact" />
            </ul>
            <div className="d-flex align-items-center column-gap-1 ">
              <Link to="/search">
                <button className="bg-transparent border-0 ">
                  <CiSearch size={30} />
                </button>
              </Link>
              {userInfo ? (
                <div className="dropdown navbar__dropdown">
                  <div
                    className="btn p-0 border-0 dropdown-toggle"
                    role="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={`http://localhost:3000/image/${user.avatar}`}
                      style={{ width: "40px", height: "40px" }}
                      className="rounded-circle"
                    />
                  </div>
                  <AvatarLink to="/user/profile" />
                </div>
              ) : (
                <button
                  className="btn border-0"
                  data-bs-toggle="modal"
                  data-bs-target="#login"
                >
                  <GoPerson size={30} />
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>

      <SideNavbar />

      <AuthModal id="login">
        <Login />
      </AuthModal>

      <AuthModal id="register">
        <Register />
      </AuthModal>
    </>
  );
};

export default Navbar;
