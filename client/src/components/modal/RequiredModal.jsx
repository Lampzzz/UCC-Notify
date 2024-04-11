import { IoClose } from "react-icons/io5";

const RequiredModal = ({ id }) => {
  return (
    <div className="modal fade " id={id} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content px-3">
          <div className="modal-header border-0 ">
            <h1>Login Required</h1>
            <div className="ms-auto">
              <button className="btn border-0" data-bs-dismiss="modal">
                <IoClose size={30} />
              </button>
            </div>
          </div>
          <div className="modal-body">
            <p>You need to be logged in first.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequiredModal;
