import "./post.css";
import { MdMoreVert } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [owner, setOwner] = useState({});

  const { user } = useContext(AuthContext);

  const likeHandler = async () => {
    try {
      let baseUrl = process.env.REACT_APP_API_URL;
      let likePost = await axios.put(baseUrl + `posts/${post._id}/like`, { userId: user._id });
      if (likePost.data.Status === "ok") {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      }
      console.log(likePost);
    } catch (error) {
      alert("An error occurred!");
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        let baseUrl = process.env.REACT_APP_API_URL;
        return axios.get(baseUrl + `users/?userId=${post.userId}`);
      };

      fetchUsers().then((res) => setOwner(res.data.data));
    } catch (e) {}
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${owner.username}`}>
              <img
                src={owner.profilePicture !== "" ? owner.profilePicture : `https://via.placeholder.com/25/4e3fd3/ffffff?text=${owner.username}`}
                className="postProfileImg"
                alt=""
              />
            </Link>
            <span className="postUsername">{owner.username}</span>
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
