const AboutContent = ({ title, children }) => {
  return (
    <div className="mb-4">
      <h3 className="fw-semibold">{title}</h3>
      <p className="mb-0 text-black-50">{children}</p>
    </div>
  );
};

export default AboutContent;
