import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const contactInfo = [
  {
    icon: <FaLocationDot className="me-2" color="#f7770f" />,
    text: "Paulino Caloocan City",
  },
  {
    icon: <MdEmail className="me-2" color="#f7770f" />,
    text: "sleepwell@gmail.com",
  },
  { icon: <FaPhone className="me-2" color="#f7770f" />, text: "+639300311893" },
];

const FooterContact = () => {
  return (
    <div>
      <h5 className="mt-2 mb-3 text-white">Get in touch</h5>
      <ul className="list-unstyled">
        {contactInfo.map((info, index) => (
          <li key={index} className="link__footer">
            {info.icon}
            {info.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterContact;
