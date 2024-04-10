import { PulseLoader } from "react-spinners";

const ActionButton = ({ type, style, label, isLoading, handleClick }) => {
  return (
    <button
      type={type}
      className={style}
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <PulseLoader color="#ffffff" loading={isLoading} size={5} />
      ) : (
        label
      )}
    </button>
  );
};

export default ActionButton;
