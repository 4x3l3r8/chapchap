import axios from "axios";
import { useContext, useRef, useState } from "react";
import { MdCancel, MdEmojiEmotions, MdLabel, MdPermMedia, MdRoom } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";

const Share = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState();

  const desc = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("userId", user._id);
    formData.append("body", desc.current.value);

    if (file) {
      const filename = Date.now() + file.name;
      formData.append("file", file, filename);
      // newPost.pendingFilename = filename;
      // newPost.file = file;
    }
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    // console.log("header", formData.getHeaders());
    try {
      let baseUrl = process.env.REACT_APP_API_URL;
      await axios.post(baseUrl + "posts/create", formData);
      window.location.reload();
    } catch (error) {
      alert("An Error Occurred");
      console.log(e);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={user.profilePicture !== "" ? user.profilePicture : `https://via.placeholder.com/25/4e3fd3/ffffff?text=${user.username}`}
            className="shareProfileImg"
            alt=""
          />
          <textarea ref={desc} placeholder={"What's on your mind, " + user.username + "?"} className="shareInput" />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <MdCancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={(e) => submitHandler(e)}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <MdPermMedia color="gray" className="shareIcon" />
              <span className="shareOptionText">Photo/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                // value={file?.name}
                accept=".png,.jpeg,.jpg"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </label>
            <div className="shareOption">
              <MdLabel color="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <MdRoom color="red" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <MdEmojiEmotions color="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
