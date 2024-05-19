import Container from "@Components/container/Container";
import SectionContainer from "@Components/container/SectionContainer";
import AboutContent from "./AboutContent";
import uccImage from "@Assets/image/ucc.png";
import mission from "@Assets/image/mission.png";
import vision from "@Assets/image/vision.png";

const About = () => {
  return (
    <>
      <Container>
        <div className="container py-5">
          <div className="row align-items-center ">
            <div
              className="col-6"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <img src={uccImage} alt="ucc" className="img-fluid" />
            </div>
            <div className="col-6">
              <AboutContent title={"About Us"}>
                The University of Caloocan City (abbreviated as UCC) is a
                public-type local university established in 1971 and formerly
                called Caloocan City Community College and Caloocan City
                Polytechnic College. Its south campus is located at Biglang Awa
                St., Grace Park East, 12th Avenue, Caloocan, Metro Manila,
                Philippines (also known as EDSA/Biglang Awa Campus) and the
                north campuses are Camarin Business Campus, Congressional
                Campus, and TechVoc Campus (near Libis, Camarin).
              </AboutContent>
            </div>
          </div>
          <div className="row align-items-center ">
            <div className="col-6">
              <AboutContent title={"Mission"}>
                To foster a sense of community and connection within our school,
                UCC Notify is committed to delivering timely, accurate, and
                engaging news and event updates. We aim to keep students,
                parents, and staff informed, inspired, and united by showcasing
                the diverse achievements, activities, and stories that make our
                school a thriving hub of learning and collaboration.
              </AboutContent>
            </div>
            <div
              className="col-6"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <img src={mission} alt="" className="img-fluid" />
            </div>
          </div>
          <div className="row align-items-center ">
            <div
              className="col-6"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <img src={vision} alt="" className="img-fluid" />
            </div>
            <div className="col-6">
              <AboutContent title={"Vision"}>
                UCC Notify envisions a digital platform that not only serves as
                a central hub for school news and events but also as a dynamic
                space that reflects the spirit and values of our educational
                community. Through innovative storytelling, inclusivity, and a
                commitment to excellence, we strive to become the go-to source
                for staying connected, informed, and inspired within the vibrant
                tapestry of our school life.
              </AboutContent>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default About;
