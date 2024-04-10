import { Link } from "react-router-dom";

const Banner = ({ link }) => {
  return (
    <div className="container-fluid banner d-flex align-items-center">
      <div className="banner__content">
        <h1 className="text-capitalize fw-bold">{link}</h1>
        <div className="d-flex">
          <Link to="/" className="text-white text-decoration-none">
            Home
          </Link>
          <span className="mx-1">/</span>
          <Link
            to={`/${link}`}
            className="text-white text-decoration-none text-capitalize"
          >
            {link}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
