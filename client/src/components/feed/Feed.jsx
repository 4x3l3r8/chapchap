import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        let baseUrl = process.env.REACT_APP_API_URL;
        return username ? axios.get(baseUrl + `posts/profile/${username}`) : axios.get(baseUrl + `posts/timelineposts/${user._id}`);
      };

      fetchPosts().then((res) => setPosts(res.data.data));
    } catch (e) {}
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
