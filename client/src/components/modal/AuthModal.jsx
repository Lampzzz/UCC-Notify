import { IoClose } from "react-icons/io5";

const AuthModal = ({ id, children }) => {
  return (
    <div
      className="modal fade "
      id={id}
      tabIndex="-1"
      aria-hidden="true"
      aria-labelledby={id}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content px-3">
          <div className="modal-header border-0 ">
            <div className="ms-auto">
              <button className="btn border-0" data-bs-dismiss="modal">
                <IoClose size={30} />
              </button>
            </div>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
