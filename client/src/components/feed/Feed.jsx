import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios";
import "./feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        let baseUrl = process.env.REACT_APP_API_URL;
        return axios.get(baseUrl + "posts/timelineposts/63057db0d66927c3bfb70992");
      };

      fetchPosts().then((res) => setPosts(res.data.data));
    } catch (e) {}
  }, []);

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
