import "./sidebar.css";
import { MdRssFeed, MdChat, MdPlayArrow, MdGroups, MdOutlineBookmark, MdHelpOutline, MdWorkOutline, MdOutlineEvent, MdSchool } from "react-icons/md";
import FriendsRow from "./FriendsRow";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersToFollow = () => {
      let baseUrl = process.env.REACT_APP_API_URL;
      return axios.get(baseUrl + `users/getAll`);
    };

    fetchUsersToFollow().then((res) => setUsers(res.data.data));
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <MdRssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <MdChat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <MdPlayArrow className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <MdGroups className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <MdOutlineBookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <MdHelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <MdWorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <MdOutlineEvent className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <MdSchool className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <h4 className="rightbarTitle" id="home">
            People You can follow
          </h4>
          {users.map((u) => (
            <FriendsRow key={u._id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
