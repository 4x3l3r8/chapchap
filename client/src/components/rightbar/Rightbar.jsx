/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { BsGenderAmbiguous } from "react-icons/bs";
import { ImHome2, ImLocation } from "react-icons/im";
import { RiUserHeartFill } from "react-icons/ri";
import { AuthContext } from "../../context/AuthContext";
import { Users } from "../../dummyData";
import FollowingFriends from "./FollowingFriends";
import FriendsRow from "./OnlineFriendsRow";
import "./rightbar.css";

const Rightbar = ({ user }) => {
  // const onlineUsers = Users.filter((u) => u.username.includes("e"));
  const [onlineUsers, setOnlineUsers] = useState(Users.filter((u) => u.username.includes("e")));
  const [userFollowing, setUserFollowing] = useState([]);

  const { user: loggedInUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(loggedInUser.following.includes(user?._id));

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      try {
        const fetchFollowing = async () => {
          let baseUrl = process.env.REACT_APP_API_URL;
          return axios.get(baseUrl + `users/${user._id}/following`);
        };

        fetchFollowing().then((res) => setUserFollowing(res.data.data));
      } catch (e) {
        alert("An error occurred");
        console.log(e);
      }
    }
  }, [user]);

  const followUser = async () => {
    try {
      let baseUrl = process.env.REACT_APP_API_URL;
      await axios.put(baseUrl + `users/${user._id}/follow`, { userId: loggedInUser._id }).then((res) => {
        setFollowed(true);
        dispatch({ type: "FOLLOW ", payload: user._id });
      });
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };

  const unfollowUser = async () => {
    try {
      let baseUrl = process.env.REACT_APP_API_URL;
      await axios.put(baseUrl + `users/${user._id}/unfollow`, { userId: loggedInUser._id }).then((res) => {
        setFollowed(false);
        dispatch({ type: "UNFOLLOW", payload: user._id });
      });
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };

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
        {user.username !== loggedInUser.username && (
          <button className={followed ? "rightbarUnfollowButton" : "rightbarFollowButton"} onClick={followed ? unfollowUser : followUser}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <AiOutlineUserDelete /> : <AiOutlineUserAdd />}
          </button>
        )}
        <h4 className="rightbarTitle" id="profile">
          User Information
        </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem" id="profile">
            <span className="rightbarInfoKey">
              <ImLocation /> City:
            </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem" id="profile">
            <span className="rightbarInfoKey">
              <ImHome2 /> From:
            </span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem" id="profile">
            <span className="rightbarInfoKey">
              <RiUserHeartFill /> Relationship Status:
            </span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : ""}</span>
          </div>
          <div className="rightbarInfoItem" id="profile">
            <span className="rightbarInfoKey">
              <BsGenderAmbiguous /> Gender:
            </span>
            <span className="rightbarInfoValue">{user.gender}</span>
          </div>
        </div>
        <h4 className="rightbarTitle" id="profile">
          User Friends
        </h4>
        <div className="rightbarFollowings">
          {userFollowing.map((u) => {
            return <FollowingFriends key={u._id} user={u} />;
          })}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">{user ? <ProfileRightbar /> : <HomeRightbar />}</div>
    </div>
  );
};

export default Rightbar;
