import { FaGreaterThan } from "react-icons/fa";

const FooterLinks = ({ title, links }) => {
  return (
    <div>
      <h5 className="mt-2 mb-3 text-white ">{title}</h5>
      <ul className="list-unstyled">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} className="link__footer text-decoration-none">
              <FaGreaterThan color="#f7770f" size={10} /> {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
