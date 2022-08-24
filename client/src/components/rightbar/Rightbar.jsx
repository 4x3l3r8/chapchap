import { Users } from "../../dummyData";
import FriendsRow from "./OnlineFriendsRow";
import "./rightbar.css";

const Rightbar = () => {
  const onlineUsers = Users.filter((u) => u.username.includes("e"));
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img src="assets/gift.png" className="birthdayImg" alt="" />
          <span className="birthdayText">
            <b>Jane Doe</b> and <b>3 other friends</b> have birthdays today.
          </span>
        </div>
        <img src="assets/ad.png" className="rightbarAd" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {onlineUsers.map((user) => (
            <FriendsRow key={user.id} friend={user} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rightbar;
