const Categories = ({ category }) => {
  return (
    <small
      className="px-3 py-1 rounded-2 fw-light "
      style={{ background: "#F7770F", color: "#fff" }}
    >
      {category}
    </small>
  );
};

export default Categories;
