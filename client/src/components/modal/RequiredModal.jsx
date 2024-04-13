import OpenModalButton from "@Components/button/OpenModalButton";

const RequiredModal = () => {
  return (
    <div
      className="modal fade "
      id="loginRequiredModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content px-3">
          <div className="modal-header border-0 ">
            <h5>Login Required</h5>
          </div>
          <div className="modal-body">
            <p>You need to be logged in first.</p>
          </div>
          <div className="modal-footer border-0 ">
            <button
              type="button"
              class="btn border-0 text-black"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <OpenModalButton target={"login"} style={"main--button"}>
              Login
            </OpenModalButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequiredModal;
