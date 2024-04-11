import defaultPic from "@Assets/image/default.jpg";
import ActionButton from "@Components/button/ActionButton";
import { IoSend } from "react-icons/io5";

const Comment = () => {
  return (
    <>
      <h5>Comment</h5>
      <hr />
      <div className="d-flex align-items-center ">
        {/* <img
          // src={`http://localhost:3000/images/${user.avatar}`}
          src={defaultPic}
          style={{ width: "45px", height: "45px" }}
          className="rounded-circle me-2 "
        /> */}
        <form className="d-flex align-items-center w-100">
          <input
            type="text"
            className="form-control shadow-none me-3 text-black-50 "
            placeholder="Enter comment"
          />
          <ActionButton
            style={"btn border-0 main--button"}
            type={"submit"}
            label={<IoSend />}
            // isLoading={isLoading}
          />
        </form>
      </div>
    </>
  );
};

export default Comment;
