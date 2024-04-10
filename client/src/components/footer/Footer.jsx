import FooterLogo from "./FooterLogo";
import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  const quickLinks = [
    { label: "Home", url: "/" },
    { label: "News", url: "/announcement/news" },
    { label: "Events", url: "/announcement/events" },
    { label: "About", url: "/about" },
    { label: "Contact", url: "/contact" },
  ];

  return (
    <footer className="container-fluid mt-5 pt-5 pb-3 footer__content">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-3 d-flex justify-content-start justify-content-lg-center mb-3 mb-lg-0">
            <FooterLogo />
          </div>
          <div className="col-6 col-lg-3 d-flex justify-content-start justify-content-lg-center">
            <FooterLinks title="Quick Links" links={quickLinks} />
          </div>
          <div className="col-12 col-lg-3 d-flex justify-content-start justify-content-lg-center">
            <FooterContact />
          </div>
        </div>
        <hr className="text-white-50 mb-3" />
        <div className="text-center">
          <p className="mb-0 text-white-50">
            © 2024 <span className="main--color">UCC Notify</span>. All right
            reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
