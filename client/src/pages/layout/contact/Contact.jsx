import ActionButton from "@Components/button/ActionButton";
import Container from "@Components/container/Container";
import SectionContainer from "@Components/container/SectionContainer";
import Input from "@Components/form/Input";
import Textarea from "@Components/form/Textarea";

const Contact = () => {
  return (
    <Container>
      <SectionContainer>
        <h4 className="fw-bold mb-3">Get in Touch</h4>
        <div className="row">
          <div className="col-6">
            <form>
              <div className="mb-3">
                <label htmlFor="fullName">Full Name</label>
                <Input type={"text"} name={"fullName"} required={true} />
              </div>
              <div className="row">
                <div className="col-12 col-lg-6 mb-3">
                  <label htmlFor="email">Email</label>
                  <Input type={"text"} name={"email"} required={true} />
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <label htmlFor="subject">Subject</label>
                  <Input type={"text"} name={"subject"} required={true} />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="message">Message</label>
                <Textarea name={"message"} />
              </div>
              <ActionButton
                style={"btn w-25 border-0 main--button"}
                type={"submit"}
                label={"Submit"}
                // isLoading={isLoading}
              />
            </form>
          </div>
          <div className="col-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.2562927726544!2d121.02629647087007!3d14.75458554181945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b1cc9c9c83e9%3A0x303a03298da24ddb!2sUniversity%20of%20Caloocan%20City%20-%20Congressional%20Campus!5e0!3m2!1sen!2sph!4v1711959252876!5m2!1sen!2sph"
              className="border-0 w-100 h-100"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </SectionContainer>
    </Container>
  );
};

export default Contact;
