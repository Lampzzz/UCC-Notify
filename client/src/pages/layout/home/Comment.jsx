import { IoContrastOutline, IoSend } from "react-icons/io5";
import { useState } from "react";
import ActionButton from "@Components/button/ActionButton";
import OpenModalButton from "@Components/button/OpenModalButton";
import { fetchComments } from "@Services/api/fetchComments";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "@Services/redux/api/commentApiSlice";

const Comment = ({ userID, announcementID }) => {
  const [createCommet, { isLoading }] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const { comments, refetch } = fetchComments(announcementID);
  const [comment, setComment] = useState("");

  const handleCommet = async (e) => {
    e.preventDefault();

    try {
      if (userID) {
        const response = await createCommet({
          userID,
          announcementID,
          comment,
        });

        console.log(response);

        refetch();
        setComment("");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment({ userID, announcementID });
      refetch();
      console.log("Delete Comment");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h5>Comment</h5>
      <hr />
      <div className="d-flex align-items-center mb-3">
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
      {comments.map((comm, index) => (
        <div className="row mb-3 align-items-center" key={index}>
          <div className="col-1">
            <img
              src={`http://localhost:3000/image/${comm.user.avatar}`}
              style={{ width: "40px", height: "40px" }}
              className="rounded-circle"
            />
          </div>
          <div className="col-11">
            <div className="d-flex flex-column">
              <small>{comm.user.username}</small>
              <input
                type="text"
                value={comm.comment}
                disabled
                className="form-control"
              />
            </div>
            <button className="btn text-danger" onClick={handleDeleteComment}>
              <small>Delete</small>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Comment;
