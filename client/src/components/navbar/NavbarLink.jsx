import { Link, useLocation } from "react-router-dom";

const NavbarLink = ({ link, label, dropdownItems }) => {
  const location = useLocation();

  return (
    <li className="nav-item py-1 py-lg-0">
      {dropdownItems ? (
        <div className="dropdown navbar__dropdown">
          <Link
            to={link}
            className={`nav-link dropdown-toggle ${
              location.pathname.startsWith(link)
                ? "fw-medium main--color"
                : "text-black"
            }`}
            role="button"
            id="navbarDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {label}
          </Link>
          <ul className="dropdown-menu" id="navbarDropdown">
            {dropdownItems.map((item, index) => (
              <li key={index}>
                <Link to={item.link} className="dropdown-item">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Link
          to={link}
          className={`nav-link ${
            location.pathname === link ? "fw-medium main--color" : "text-black"
          }`}
        >
          {label}
        </Link>
      )}
    </li>
  );
};

export default NavbarLink;
