import React, { useEffect, useState, createContext } from "react";
import "../App.css";
import Sidebar from "../Sidebar/Sidebar";
import MiddleNavbar from "../NotificationSidebar/MiddleNavbar";
import Notificationdisplay from "../NotificationSidebar/Notificationdisplay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Profile.png";
import ProfileDown from "./profile-down.png";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Dashboard from "../Dashboard/Dashboard";
import { AiFillBell } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import Overdue from "./overdue.png";
import { MdOutlineClose } from "react-icons/md";
export const ValueContext = createContext(null);

function MainPage(props) {
  const [anchorEl3, setAnchorEl3] = useState(null);
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };
  const [selectedItem, setSelectedItem] = useState([]);
  const [activeTab, setActiveTab] = useState("Pending");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [displayShow, setDisplayShow] = useState(false);
  const [showTab, setShowtab] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentContent, setCurrentContent] = useState(0);
  useEffect(() => {
    setCards([]);
    setDisplayShow(false);
  }, [activeTab]);

  const messages = [
    {
      id: "1",
      avatar: Overdue,
      title: "Overdue - The ticket is now overdue.",
      subtitle: "TCKT82132",
      time: "5/10/2023",
      status: "success",
    },
    {
      id: "2",
      avatar: Overdue,
      title: "Overdue - The ticket is now overdue.",
      subtitle: "TCKT82132",
      time: "5/10/2023",
      status: "success",
    },
    {
      id: "3",
      avatar: Overdue,
      title: "Overdue - The ticket is now overdue.",
      subtitle: "TCKT82132",
      time: "5/10/2023",
      status: "success",
    },
    {
      id: "3",
      avatar: Overdue,
      title: "Overdue - The ticket is now overdue.",
      subtitle: "TCKT82132",
      time: "5/10/2023",
      status: "success",
    },
  ];

  const [showDrawer, setShowDrawer] = useState(false);
  const [state, setState] = useState(false);
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
              {/* <IconButton
                size="large"
                aria-label="menu"
                color="inherit"
                aria-controls="notification-menu"
                aria-haspopup="true"
                onClick={handleClick3}
              >
                <Badge variant="dot" color="secondary">
                  <BsFillBellFill />
                </Badge>
              </IconButton> */}
              <Menu
                id="msgs-menu"
                anchorEl={anchorEl3}
                keepMounted
                open={Boolean(anchorEl3)}
                onClose={handleClose3}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                sx={{
                  "& .MuiMenu-paper": {
                    width: "385px",
                    right: 0,
                    top: "70px ",
                  },
                  "& .MuiList-padding": {
                    p: "15px",
                  },
                }}
              >
                <Box sx={{ mb: 1 }}>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 500,
                        fontSize: "1.125rem",
                        lineHeight: "1.5",
                      }}
                    >
                      Notifications
                    </Typography>
                    <Box sx={{ ml: 2 }}>
                      <Chip
                        size="small"
                        label={`${messages.length} new`}
                        sx={{
                          borderRadius: "6px",
                          pl: "5px",
                          pr: "5px",
                          background: (theme) => theme.palette.secondary.main,
                          color: "#fff",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  {messages.map((message) => {
                    return (
                      <Box key={message.id}>
                        <MenuItem sx={{ pt: 1, pb: 1, borderRadius: "0px" }}>
                          <Box display="flex" alignItems="center">
                            <Badge variant="dot" color="success">
                              <img
                                src={message.avatar}
                                height="45px"
                                width="45px"
                              />
                              {/* <Image
                                src={message.avatar}
                                alt={message.title}
                                width="45px"
                                height="45px"
                                style={{ borderRadius: "50%" }}
                              /> */}
                            </Badge>
                            <Box sx={{ ml: 2 }}>
                              <Typography
                                variant="h5"
                                sx={{
                                  fontWeight: 500,
                                  fontSize: "1rem",
                                  lineHeight: "1.5",
                                  width: "240px",
                                }}
                                noWrap
                              >
                                {message.subtitle}
                              </Typography>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 500,
                                  fontSize: "0.875rem",
                                  lineHeight: "1.5",
                                  width: "100%",
                                }}
                                noWrap
                              >
                                {message.title}
                              </Typography>
                              <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                  width: "100%",
                                  fontSize: "10px",
                                  fontWeight: 500,
                                  fontSize: "0.875rem",
                                  lineHeight: "1.5",
                                  color: "#ccc",
                                }}
                              >
                                {message.time}
                              </Typography>
                            </Box>
                          </Box>
                        </MenuItem>
                        <Divider />
                      </Box>
                    );
                  })}
                  <Button
                    onClick={() => {
                      setAnchorEl3(null);
                      setState(true);
                    }}
                  >
                    See More
                  </Button>
                </Box>
              </Menu>
              <Drawer
                anchor="right"
                open={state}
                onClose={() => {
                  setState(false);
                }}
                sx={{
                  "& .MuiDrawer-paper": {
                    width: {
                      xs: "100%",
                      sm: "395px",
                    },
                    padding: "10px",
                  },
                }}
              >
                <Box display="flex" alignItems="center" sx={{ pt: 1, px: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 500,
                      fontSize: "0.975rem",
                      lineHeight: "1.5",
                    }}
                  >
                    All Notifications
                  </Typography>
                  <Box sx={{ ml: "auto" }}>
                    <IconButton
                      onClick={() => {
                        setState(false);
                      }}
                      sx={{
                        color: "#000",
                      }}
                    >
                      <MdOutlineClose />
                    </IconButton>
                  </Box>
                </Box>
                {messages.map((message) => {
                  return (
                    <Box
                      display="flex"
                      flexDirection="column"
                      sx={{ pt: 1, px: 2, my: 1 }}
                    >
                      <Box display="flex">
                        <img src={message.avatar} height="40" width="40" />
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          sx={{ ml: 2 }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 500,
                              fontSize: "0.875rem",
                              lineHeight: "1.5",
                            }}
                          >
                            {message.subtitle}
                          </Typography>
                          <Typography variant="caption">
                            {message.time}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          borderRadius: "6px",
                          my: 1,
                          p: 1,
                          background: "#f6f6f6",
                        }}
                      >
                        {message.title}
                      </Box>
                    </Box>
                  );
                })}
              </Drawer>
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
          {activeTab === "Dashboard" ? (
            <div
              // className="main-content"
              style={{ overflowY: "scroll", height: "100vh" }}
            >
              <Dashboard />
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </ValueContext.Provider>
  );
}

export default MainPage;
