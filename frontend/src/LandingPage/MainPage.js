import React, { useEffect, useState, createContext } from "react";
import "../App.css";
import Sidebar from "../Sidebar/Sidebar";
import MiddleNavbar from "../NotificationSidebar/MiddleNavbar";
import Notificationdisplay from "../NotificationSidebar/Notificationdisplay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Profile.png";
import ProfileDown from "./profile-down.png";
import { Avatar } from "@mui/material";

export const ValueContext = createContext(null);

function MainPage(props) {
  const [selectedItem, setSelectedItem] = useState([]);
  const [activeTab, setActiveTab] = useState("Pending");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [displayShow, setDisplayShow] = useState(false);
  const [showTab, setShowtab] = useState(false);
  const [cards, setCards] = useState([
    // {
    //   type: "Pending Request",
    //   value: "PR 1000005421",
    // },
    // {
    //   type: "Pending Request",
    //   value: "PR 1000005447",
    // },
    // {
    //   type: "Pending Request",
    //   value: "PR 1000005455",
    // },
    // {
    //   type: "Pending Request",
    //   value: "PR 1000005456",
    // },
    // {
    //   type: "Pending Request",
    //   value: "PR 1000005496",
    // },
  ]);
  const [currentContent, setCurrentContent] = useState(0);
  useEffect(() => {
    setCards([]);
    setDisplayShow(false);
  }, [activeTab]);
  return (
    <ValueContext.Provider value={{ showTab, setShowtab }}>
      <div className="App">
        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
        />
        <Sidebar
          setTab={(value) => setActiveTab(value)}
          tab={activeTab}
          setIsOpen={(value) => setSidebarOpen(value)}
          isOpen={sidebarOpen}
        />
        <div className="navbar-main">
          <div className="navbar-rcmc">
            <div>
              {/* <div
                style={{
                  height: "50px",
                  width: "70px",
                  borderRadius: "50%",
                  background: "linear-gradient(to right, #3e5151, #decba4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontSize: "20px",
                  }}
                >
                  {JSON.parse(
                    sessionStorage?.getItem("email")
                  ).value?.substring(0, 2)}
                </span>
              </div> */}
              <Avatar
                sx={{
                  background: "linear-gradient(to right, #3e5151, #decba4)",
                  fontSize: "18px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {JSON.parse(sessionStorage?.getItem("email")).value?.substring(
                  0,
                  1
                )}
              </Avatar>
              <span>{JSON.parse(sessionStorage?.getItem("email")).value}</span>
              <img alt="" src={ProfileDown} />
            </div>
          </div>
          <div className="main-content">
            <MiddleNavbar
              updateValues={(value) => setSelectedItem(value)}
              // leaveItem={(value)=>console.log(value)}
              activeTab={activeTab}
              setCards={setCards}
              cards={cards}
              setCurrentContent={setCurrentContent}
            />
            <Notificationdisplay
              selectedItem={selectedItem}
              isSidebarOpen={sidebarOpen}
              tab={activeTab}
              setCards={setCards}
              cards={cards}
              displayShow={displayShow}
              setDisplayShow={setDisplayShow}
              currentContent={currentContent}
              setCurrentContent={setCurrentContent}
            />
          </div>
        </div>
      </div>
    </ValueContext.Provider>
  );
}

export default MainPage;
