import axios from "axios";
import { useState, useEffect } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useParams } from "react-router";
import "./profile.css";

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        let baseUrl = process.env.REACT_APP_API_URL;
        return axios.get(baseUrl + `users/?username=${params.username}`);
      };

      fetchUsers().then((res) => setUser(res.data.data));
    } catch (e) {}
  }, [params.username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.profilePicture !== "" ? user.profilePicture : `https://via.placeholder.com/750/000000/4e3fd3?Text=${user.username}`}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture !== "" ? user.profilePicture : `https://via.placeholder.com/150/4e3fd3/ffffff?text=${user.username}`}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={params.username} profile />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
