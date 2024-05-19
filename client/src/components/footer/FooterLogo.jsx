import logo from "../../assets/image/logo_footer.png";

const FooterLogo = () => {
  return (
    <div>
      <img src={logo} alt="UCC Notify Logo" className="logo" />
      <p className="mb-0 text-white-50 ">
        Experience an elevated sleep journey through state-of-the-art
        monitoring, promoting holistic well-being.
      </p>
    </div>
  );
};

export default FooterLogo;
