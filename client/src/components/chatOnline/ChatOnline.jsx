import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, loggedInUser, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      let baseUrl = process.env.REACT_APP_API_URL;
      const res = await axios.get(baseUrl + `users/${loggedInUser}/following`);
      setFriends(res.data.data);
    };

    fetchFriends();
  }, [loggedInUser]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      let baseUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(baseUrl + `conversation/getConvo/${user._id}`, { userId: loggedInUser });

      setCurrentChat(res.data.data);
    } catch (error) {
      console.log(error);
      alert("An error occurred!!!");
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.length > 0 ? (
        onlineFriends.map((o) => (
          <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
            <div className="chatOnlineImgContainer">
              <img
                src={o.profilePicture === "" ? "https://via.placeholder.com/750/4e3fd3/ffffff?text=owner" : o.profilePicture}
                className="chatOnlineImg"
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{o.username}</span>
          </div>
        ))
      ) : (
        <h3>No online friends</h3>
      )}
    </div>
  );
}
