const AboutContent = ({ title, children }) => {
  return (
    <div className="mb-4">
      <h4 className="fw-bold">{title}</h4>
      <p className="mb-0 text-black-50">{children}</p>
    </div>
  );
};

export default AboutContent;
