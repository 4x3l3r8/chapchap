import "./topbar.css";
import { MdSearch, MdPerson, MdChat, MdNotifications } from "react-icons/md";

const Topbar = () => {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">ChapChap</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <MdSearch className="searchIcon"/>

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
            <MdPerson className="topbarIcon"/>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <MdChat className="topbarIcon"/>
            <span className="topbarIconBadge">4</span>
          </div>
          <div className="topbarIconItem">
            <MdNotifications className="topbarIcon"/>
            <span className="topbarIconBadge">2</span>
          </div>
        </div>
        <img src="./assets/person/1.jpeg" alt="" className="topbarImg" />
      </div>
    </div>
  );
};

export default Topbar;
