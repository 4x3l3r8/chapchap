import moment from "moment";
import "./message.css";

export default function Message({ own, message }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className={`messageTop ${own && "own"}`}>
        <img src="https://via.placeholder.com/750/4e3fd3/ffffff?text=owner" alt="" className={own ? "messageImg own" : "messageImg"} />
        <p className="messageText">{message?.text}</p>
      </div>
      <div className="messageBottom">{moment(message?.createdAt).fromNow()}</div>
    </div>
  );
}
