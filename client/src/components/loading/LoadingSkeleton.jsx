const LoadingSkeleton = () => {
  const boxSize = {
    height: "200px",
    width: "100%",
  };

  const firstText = {
    height: "20px",
    width: "90%",
  };

  const secondText = {
    height: "20px",
    width: "80%",
  };

  return (
    <div className="row">
      <div className="col-12 col-md-3">
        <div className="bg-light p-5 mb-2" style={boxSize}></div>
        <div className="bg-light mb-2" style={firstText}></div>
        <div className="bg-light" style={secondText}></div>
      </div>
      <div className="col-12 col-md-3">
        <div className="bg-light p-5 mb-2" style={boxSize}></div>
        <div className="bg-light mb-2" style={firstText}></div>
        <div className="bg-light" style={secondText}></div>
      </div>
      <div className="col-12 col-md-3">
        <div className="bg-light p-5 mb-2" style={boxSize}></div>
        <div className="bg-light mb-2" style={firstText}></div>
        <div className="bg-light" style={secondText}></div>
      </div>
      <div className="col-12 col-md-3">
        <div className="bg-light p-5 mb-2" style={boxSize}></div>
        <div className="bg-light mb-2" style={firstText}></div>
        <div className="bg-light" style={secondText}></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
