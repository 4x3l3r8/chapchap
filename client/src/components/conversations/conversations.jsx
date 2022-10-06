import axios from "axios";
import { useEffect, useState } from "react";
import "./conversations.css";

const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const friendId = conversation.members.find((m) => m !== currentUser._id);

      const getUser = async () => {
        let baseUrl = process.env.REACT_APP_API_URL;
        const res = await axios.get(baseUrl + `users?userId=${friendId}`);

        setUser(res.data.data);
      };

      getUser();
    } catch (e) {
      console.log(e);
      alert("An error Occurred");
    }
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        src={user?.profilePicture ? user?.profilePicture : `https://via.placeholder.com/750/4e3fd3/ffffff?text=${user?.username}`}
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversations;
