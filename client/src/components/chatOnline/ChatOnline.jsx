import "./chatOnline.css";

export default function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img src="https://via.placeholder.com/750/4e3fd3/ffffff?text=owner" className="chatOnlineImg" alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">John Doe</span>
      </div>
    </div>
  );
}
