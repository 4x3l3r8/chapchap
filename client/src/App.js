import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Protected from "./protected";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Protected user={user} />}>
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
