const FriendsRow = ({ user }) => {
  return (
    <li className="sidebarFriend">
      {/* <img className="sidebarFriendImg" src={user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span> */}
      <img className="sidebarFriendImg" src="/assets/person/2.jpeg" alt="" />
      <span className="sidebarFriendName">Jane Doe</span>
    </li>
  );
};

export default FriendsRow;
