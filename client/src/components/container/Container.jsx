import { useLocation } from "react-router-dom";
import Navbar from "@Components/navbar/Navbar";
import Footer from "@Components/footer/Footer";
import Banner from "./Banner";

const Container = ({ children }) => {
  const location = useLocation();

  const renderBanner = () => {
    if (location.pathname === "/about") {
      return <Banner link="about" />;
    } else if (location.pathname === "/contact") {
      return <Banner link="contact" />;
    } else if (location.pathname === "/announcements/news") {
      return <Banner link="news" />;
    } else if (location.pathname === "/announcements/events") {
      return <Banner link="events" />;
    } else {
      return null;
    }
  };
  return (
    <>
      <Navbar />
      {renderBanner()}
      <div className="container">{children}</div>
      <Footer />
    </>
  );
};

export default Container;
