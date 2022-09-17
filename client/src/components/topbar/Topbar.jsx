import "./topbar.css";
import { MdSearch, MdPerson, MdChat, MdNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span className="logo">ChapChap</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <MdSearch className="searchIcon" />

          <input placeholder="Search for friend, post or any media" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <MdPerson className="topbarIcon" />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <MdChat className="topbarIcon" />
            <span className="topbarIconBadge">4</span>
          </div>
          <div className="topbarIconItem">
            <MdNotifications className="topbarIcon" />
            <span className="topbarIconBadge">2</span>
          </div>
        </div>
        <Link to={`profile/${user.username}`}>
          <img
            src={user.profilePicture !== "" ? user.profilePicture : `https://via.placeholder.com/25/4e3fd3/ffffff?text=${user.username}`}
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
