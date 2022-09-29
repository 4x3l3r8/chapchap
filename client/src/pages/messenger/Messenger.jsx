import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversations from "../../components/conversations/conversations";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./messenger.css";
import { io } from "socket.io-client";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useContext(AuthContext);

  const scrollRef = useRef();
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("ws://localhost:8800");

    socketRef.current.on("connection", () => {
      console.log("connected to server");
    });

    socketRef.current.on("hey", (arg) => {
      console.log(arg);
    });

    socketRef.current.on("message", (arg) => {
      setMessages([...messages, arg]);
    });

    socketRef.current.emit("hello", "singging");
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      try {
        let baseUrl = process.env.REACT_APP_API_URL;
        const res = await axios.get(baseUrl + `conversation/get/${user._id}`);

        setConversations(res.data.data);
      } catch (e) {
        console.log(e);
        alert("An error Occurred");
      }
    };

    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat !== null) {
          let baseUrl = process.env.REACT_APP_API_URL;
          const res = await axios.get(baseUrl + `message/getMessages/${currentChat._id}`);

          setMessages(res.data.messages);
        }
      } catch (e) {
        console.log(e);
        alert("An error Occurred");
      }
    };

    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };

      let baseUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(baseUrl + `message/`, message);

      // setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      alert("failed to send message!");
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder="Search For friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversations key={c._id} conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.length > 0 ? (
                    messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message key={m._id} message={m} own={m.sender === user._id} />
                      </div>
                    ))
                  ) : (
                    <span className="noConversationText">Start a conversation with this user</span>
                  )}
                </div>

                <div className="chatBoxBottom">
                  <textarea
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    name="chatMessage"
                    className="chatMessageInput"
                    id="chatMessageInput"
                    placeholder="write something..."
                  ></textarea>
                  <button disabled={newMessage === ""} className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">Open a conversation to begin a chat.</span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
