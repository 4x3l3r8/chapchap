const FriendsRow = ({ user }) => {
  return (
    <li className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        src={user.profilePicture !== "" ? user.profilePicture : `https://via.placeholder.com/25/4e3fd3/ffffff?text=${user.username}`}
        alt=""
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default FriendsRow;
