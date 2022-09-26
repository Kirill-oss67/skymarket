import React from "react";
import CommentList from "../commentList/CommentList";
import CommentForm from "../comentForm/CommentForm";

function CommentContainer({
  comments,
  addComment,
  setComments,
  user
}) {
  return (
    <div className="commentContainer">
      <h2 className="commentContainer__title">Отзывы</h2>
      <CommentList
        comments={comments}
        setComments={setComments}
        user={user}
      />
      <CommentForm addComment={addComment} />
    </div>
  );
}

export default CommentContainer;
