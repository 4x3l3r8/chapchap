import { Link } from "react-router-dom";

const FollowingFriends = ({ user }) => {
  return (
    <Link to={"/profile/" + user.username} style={{ textDecoration: "none" }}>
      <div className="rightbarFollowing">
        <img
          src={user.profilePicture !== "" ? user.profilePicture : `https://via.placeholder.com/25/4e3fd3/ffffff?text=${user.username}`}
          alt=""
          className="rightbarFollowingImg"
        />
        <span className="rightbarFollowingName">{user.username}</span>
      </div>
    </Link>
  );
};

export default FollowingFriends;
