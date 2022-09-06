import "./post.css";
import { MdMoreVert } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        let baseUrl = process.env.REACT_APP_API_URL;
        return axios.get(baseUrl + `users/${post.userId}`);
      };

      fetchUsers().then((res) => setUser(res.data.data));
    } catch (e) {}
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={user.profilePicture !== "" ? user.profilePicture : `https://via.placeholder.com/150/000000/ffffff?Text=${user.username}`}
              className="postProfileImg"
              alt=""
            />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{moment(post.createdAt).fromNow()}</span>
          </div>
          <div className="postTopRight">
            <MdMoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.body}</span>
          <img src={post.img} className="postImg" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" alt="" onClick={likeHandler} />
            <img className="likeIcon" src="assets/heart.png" alt="" onClick={likeHandler} />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{like} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
