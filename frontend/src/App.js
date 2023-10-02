import "./App.css";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import MainPage from "./LandingPage/MainPage";
import ITform from "./Forms/ITform";
import Notificationdisplay from "./NotificationSidebar/Notificationdisplay";
import LandingPageHome from "./LandingPage/LandingPageHome";
import ChatBot from "./ChatBot/ChatBot";
import Login from "./Login/Login";
import { useEffect } from "react";

function App() {
  let location = useLocation();
  console.log(location);

  const navigate = useNavigate();

  // Retrieve email and password from sessionStorage (dummy data)
  const email = sessionStorage.getItem("email");
  const password = sessionStorage.getItem("password");

  // Check if email and password are available in sessionStorage
  const isAuthenticated = email && password;
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="App-container">
      <Routes>
        <Route path="/login" element={<Login />} />

        {isAuthenticated ? (
          <>
            <Route path="/" element={<LandingPageHome />} />
            <Route path="/it-form" element={<ITform />} />
            <Route path="/main-page" element={<MainPage />} />
            <Route
              path="/main-page/notification"
              element={<Notificationdisplay />}
            />
          </>
        ) : null}
      </Routes>
      {isAuthenticated && <ChatBot />}
    </div>
  );
}

export default App;
