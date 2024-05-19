import { Link } from "react-router-dom";
import { fetchUserDetail } from "@Services/api/fetchUserDetail";

const SideNavbar = () => {
  const { userInfo } = fetchUserDetail();

  return (
    <nav className="navbar position-absolute">
      <div className="container-fluid">
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="siderBar"
          aria-labelledby="siderBarLabel"
        >
          <div className="offcanvas-header">
            <div className="navbar-brand fw-bold fs-4">
              <span className="main--color">UCC</span> Notify
            </div>
            <button
              type="button"
              data-bs-dismiss="offcanvas"
              className="btn-close border-0 shadow-none "
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link" href="/" aria-current="page">
                  Home
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Announcements
                </a>
                <ul className="dropdown-menu border-0 p-0">
                  <li>
                    <a className="dropdown-item" to="/announcements/news">
                      News
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" to="/announcements/events">
                      Events
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/about" aria-current="page">
                  About
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/contact" aria-current="page">
                  Contact
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/search" aria-current="page">
                  Search
                </a>
              </li>

              {userInfo ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    My Profile
                  </a>
                  <ul className="dropdown-menu border-0 p-0">
                    <li>
                      <a className="dropdown-item" to="/announcements/news">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" to="/announcements/events">
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    role="button"
                    data-bs-toggle="modal"
                    data-bs-target="#login"
                  >
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideNavbar;
