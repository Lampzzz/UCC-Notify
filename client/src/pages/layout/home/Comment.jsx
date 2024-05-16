import { IoSend } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
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
        await createCommet({
          userID,
          announcementID,
          comment,
        });

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
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h5>Comment</h5>
      <hr className="text-black-50" />
      <div className="d-flex align-items-center mb-4">
        <form
          className="d-flex align-items-center w-100"
          onSubmit={handleCommet}
        >
          <input
            type="text"
            className="form-control shadow-none me-3 text-black-50"
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
      <div className="comment__container">
        {comments.map((comm, index) => (
          <div className="d-flex align-items-start mb-2" key={index}>
            <img
              src={`http://localhost:3000/image/${comm.user.avatar}`}
              style={{ width: "40px", height: "40px" }}
              className="rounded-circle me-2"
            />
            <div className="d-flex flex-column">
              <div className="d-flex flex-column bg-light rounded-3 py-1 px-2 text-start">
                <small>{comm.user.username}</small>
                <p
                  className="mb-0"
                  style={{ wordWrap: "break-word", maxWidth: "250px" }}
                >
                  {comm.comment}
                </p>
              </div>
              {userID && userID === comm.user._id && (
                <div className="text-danger px-2">
                  <small
                    style={{ fontSize: "0.75rem", cursor: "pointer" }}
                    onClick={handleDeleteComment}
                  >
                    Delete
                  </small>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comment;
