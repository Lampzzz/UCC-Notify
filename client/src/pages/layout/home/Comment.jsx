import ActionButton from "@Components/button/ActionButton";
import OpenModalButton from "@Components/button/OpenModalButton";

import { IoSend } from "react-icons/io5";

const Comment = ({ user }) => {
  return (
    <>
      <h5>Comment</h5>
      <hr />
      <div className="d-flex align-items-center ">
        <form className="d-flex align-items-center w-100">
          <input
            type="text"
            className="form-control shadow-none me-3 text-black-50 "
            placeholder="Enter comment"
          />
          {user && (
            <ActionButton
              style={"btn border-0 main--button"}
              type={"submit"}
              label={<IoSend />}
              // isLoading={isLoading}
            />
          )}
        </form>
        {!user && (
          <OpenModalButton target={"loginRequiredModal"} style={"main--button"}>
            <IoSend />
          </OpenModalButton>
        )}
      </div>
    </>
  );
};

export default Comment;
