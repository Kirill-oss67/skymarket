import React, { useState, useEffect, useContext } from "react";
import MainContext from "../../context/MainContext";
import AuthContext from "../../context/AuthContext";
import Buttons from "../buttons/Buttons";
import EditCommentPopup from "../editCommentPopup/EditCommentPopup";
import defaultImg from "../../images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg";

function Comment(comment, { setComments }) {
  const [getComm, setGetComm] = useState({});
  const [isComPopupOpen, setIsComPopupOpen] = useState(false);
  const { getComment, deleteComment, editComment } = useContext(MainContext);
  const { user } = useContext(AuthContext);
  const currentCommentid = comment.commentId;

  useEffect(() => {
    getComment(comment.adId, comment.commentId)
      .then((res) => {
        setGetComm(res.data);
      })
      .catch((error) => console.log("error", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment.adId, comment.commentId, comment]);

  const handleEditComment = (data) => {
    editComment(comment.adId, comment.commentId, data)
      .then((res) => {
        window.location.reload();
        setGetComm(res.data);
      })
      .catch((error) => console.log("error", error));
  };

  const onDelete = (e) => {
    e.preventDefault();
    deleteComment(comment.adId, comment.commentId)
      .then(() => {
        window.location.reload();
        setComments((comments) =>
          comments.filter((i) => i.id !== comment.commentId)
        );
      })
      .catch((error) => console.log("error", error));
  };

  const handleEditCommPopupOpen = () => {
    setIsComPopupOpen(true);
  };

  const closePopup = () => {
    setIsComPopupOpen(false);
  };

  return (
    <li className="comment" key={comment.commentId}>
      <div className="comment-box">
        {comment.img ? (
          <img src={comment.img} alt="user-img" className="comment-img" />
        ) : (
          <img src={defaultImg} alt="user-img" className="comment-img" />
        )}
        <p className="comment-text comment__author-text">
          {comment.authorName}
        </p>
      </div>
      <div className="commentBox">
        <p className="comment-text comment-message">{comment.text}</p>
        {user.user_id === comment.userId ? (
          <Buttons
            className="comment-buttons"
            classButton="comment-button"
            onOpen={
              currentCommentid === getComm.pk ? handleEditCommPopupOpen : null
            }
            onSubmit={onDelete}
            key={comment.pk}
          />
        ) : null}
        <EditCommentPopup
          onClose={closePopup}
          isOpen={isComPopupOpen}
          id={comment.adId}
          getComm={getComm}
          handleEdit={handleEditComment}
          userId={user.user_id}
          commentUserId={comment.userId}
          commentId={comment.commentId}
          currentComId={getComm.pk}
          key={comment.pk}
        />
      </div>
    </li>
  );
}

export default Comment;
