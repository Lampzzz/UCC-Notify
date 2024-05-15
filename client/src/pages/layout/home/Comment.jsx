import { IoSend } from "react-icons/io5";
import { useState } from "react";
import ActionButton from "@Components/button/ActionButton";
import OpenModalButton from "@Components/button/OpenModalButton";
import { fetchComments } from "@Services/api/fetchComments";
import { useCreateCommentMutation } from "@Services/redux/api/commentApiSlice";

const Comment = ({ userID, announcementID }) => {
  const [createCommet, { isLoading }] = useCreateCommentMutation();
  const { comments, refetch } = fetchComments(announcementID);
  const [comment, setComment] = useState("");

  // console.log(`Comments: ${comments}`);

  const handleCommet = async (e) => {
    e.preventDefault();

    try {
      if (userID) {
        await createCommet({ userID, announcementID, comment });
        refetch();
        setComment("");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h5>Comment</h5>
      <hr />
      <div className="d-flex align-items-center">
        <form
          className="d-flex align-items-center w-100"
          onSubmit={handleCommet}
        >
          <input
            type="text"
            className="form-control shadow-none me-3 text-black-50 "
            placeholder="Enter comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          {userID && (
            <ActionButton
              style={"btn border-0 main--button"}
              type={"submit"}
              label={<IoSend />}
              isLoading={isLoading}
            />
          )}
        </form>
        {!userID && (
          <OpenModalButton target={"loginRequiredModal"} style={"main--button"}>
            <IoSend />
          </OpenModalButton>
        )}
      </div>
    </>
  );
};

export default Comment;
