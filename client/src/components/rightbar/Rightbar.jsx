import { Users } from "../../dummyData";
import FollowingFriends from "./FollowingFriends";
import FriendsRow from "./OnlineFriendsRow";
import { ImLocation, ImHome2 } from "react-icons/im";
import { RiUserHeartFill } from "react-icons/ri";
import { BsGenderAmbiguous } from "react-icons/bs";
import "./rightbar.css";

const Rightbar = ({ profile }) => {
  const onlineUsers = Users.filter((u) => u.username.includes("e"));

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/gift.png" className="birthdayImg" alt="" />
          <span className="birthdayText">
            <b>Jane Doe</b> and <b>3 other friends</b> have birthdays today.
          </span>
        </div>
        <img src="assets/ad.png" className="rightbarAd" alt="" />
        <h4 className="rightbarTitle" id="home">
          Online Friends
        </h4>
        <ul className="rightbarFriendList">
          {onlineUsers.map((user) => (
            <FriendsRow key={user.id} friend={user} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle" id="profile">
          User Information
        </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem" id="profile">
            <span className="rightbarInfoKey">
              <ImLocation /> City:
            </span>
            <span className="rightbarInfoValue">Lagos, Nigeria</span>
          </div>
          <div className="rightbarInfoItem" id="profile">
            <span className="rightbarInfoKey">
              <ImHome2 /> From:
            </span>
            <span className="rightbarInfoValue">Ogun, Nigeria</span>
          </div>
          <div className="rightbarInfoItem" id="profile">
            <span className="rightbarInfoKey">
              <RiUserHeartFill /> Relationship Status:
            </span>
            <span className="rightbarInfoValue">Lagos, Nigeria</span>
          </div>
          <div className="rightbarInfoItem" id="profile">
            <span className="rightbarInfoKey">
              <BsGenderAmbiguous /> Gender:
            </span>
            <span className="rightbarInfoValue">Lagos, Nigeria</span>
          </div>
        </div>
        <h4 className="rightbarTitle" id="profile">
          User Friends
        </h4>
        <div className="rightbarFollowings">
          {Users.map((u) => {
            return <FollowingFriends key={u.id} user={u} />;
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">{profile ? <ProfileRightbar /> : <HomeRightbar />}</div>
    </div>
  );
};

export default Rightbar;
