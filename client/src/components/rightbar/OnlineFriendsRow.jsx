const FriendsRow = ({ friend }) => {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img src={friend.profilePicture} className="rightbarProfileImg" alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{friend.username}</span>
    </li>
  );
};

export default FriendsRow;
