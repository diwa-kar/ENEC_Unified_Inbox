import React, { useState, useContext } from "react";
import Logo from "./RCMC-Logo.png";
import GWCLogo from "./gwc-logo.png";
import InboxLogo from "./Email.png";
import ApproveLogo from "./Ok.png";
import RejectLogo from "./Cancel.png";
import Logout from "./Logout.png";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, useNavigate } from "react-router-dom";
import { ValueContext } from "../LandingPage/MainPage";
import { Snackbar, Alert } from "@mui/material";

const Sidebar = ({ setTab, tab, setIsOpen, isOpen }) => {
  const [open, setOpen] = useState(false);
  const showTab = useContext(ValueContext);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img
          src={
            "https://media.licdn.com/dms/image/C4D0BAQF5--sx9bcpVA/company-logo_200_200/0/1652781524472?e=2147483647&v=beta&t=LETyKk97tPZ8egJ1PfV3pxl0I7UBF900-qWk7hDbFeU"
          }
          alt="Logo"
        />
      </div>
      <div className="sidebar-content">
        {/* <div
          className="sidebar-items"
          style={{
            color: tab == "Home" ? "#820000" : "#000",
          }}
          onClick={() => setTab("Home")}
        >
          <i class="fa-solid fa-house"></i>
          <span>HOME</span>
        </div> */}
        <div
          className={`sidebar-items ${
            tab === "Pending" ? "sidebar-items-active" : ""
          }`}
          onClick={() => setTab("Pending")}
        >
          <img src={InboxLogo} alt="Inbox"></img>
          {/* <i class="fa-solid fa-circle-stop"></i> */}
          <span>Inbox</span>
        </div>
        <div
          className={`sidebar-items ${
            tab === "Approved" ? "sidebar-items-active" : ""
          }`}
          onClick={
            showTab.showTab === true
              ? () => setTab("Approved")
              : () => setOpen(true)
          }
        >
          <img src={ApproveLogo} alt="Approve" />
          {/* <i class="fa-solid fa-check-to-slot"></i> */}
          <span>Approved</span>
        </div>
        <div
          className={`sidebar-items ${
            tab === "Rejected" ? "sidebar-items-active" : ""
          }`}
          onClick={
            showTab.showTab === true
              ? () => setTab("Rejected")
              : () => setOpen(true)
          }
        >
          <img src={RejectLogo} alt="Reject" />
          {/* <i class="fa-solid fa-rectangle-xmark"></i> */}
          {/* <svg
            fill={tab == "Rejected" ? "#820000" : "#000"}
            width="80%"
            height="60%"
            viewBox="0 0 64 64"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            xmlnsSerif="http://www.serif.com/"
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              strokeLinejoin: "round",
              strokeMiterlimit: 2,
            }}
          >
            <rect
              id="Icons"
              x="-256"
              y="-256"
              width="1280"
              height="800"
              style={{ fill: "none" }}
            />

            <g id="Icons1" serifId="Icons">
              <g id="Strike"></g>

              <g id="H1"></g>

              <g id="H2"></g>

              <g id="H3"></g>

              <g id="list-ul"></g>

              <g id="hamburger-1"></g>

              <g id="hamburger-2"></g>

              <g id="list-ol"></g>

              <g id="list-task"></g>

              <g id="trash"></g>

              <g id="vertical-menu"></g>

              <g id="horizontal-menu"></g>

              <g id="sidebar-2"></g>

              <g id="Pen"></g>

              <g id="Pen1" serifId="Pen"></g>

              <g id="clock"></g>

              <g id="external-link"></g>

              <g id="hr"></g>

              <g id="info"></g>

              <g id="warning"></g>

              <g id="plus-circle"></g>

              <path
                id="denied"
                d="M32.266,7.951c13.246,0 24,10.754 24,24c0,13.246 -10.754,24 -24,24c-13.246,0 -24,-10.754 -24,-24c0,-13.246 10.754,-24 24,-24Zm-15.616,11.465c-2.759,3.433 -4.411,7.792 -4.411,12.535c0,11.053 8.974,20.027 20.027,20.027c4.743,0 9.102,-1.652 12.534,-4.411l-28.15,-28.151Zm31.048,25.295c2.87,-3.466 4.596,-7.913 4.596,-12.76c0,-11.054 -8.974,-20.028 -20.028,-20.028c-4.847,0 -9.294,1.726 -12.76,4.596l28.192,28.192Z"
              />

              <g id="minus-circle"></g>

              <g id="vue"></g>

              <g id="cog"></g>

              <g id="logo"></g>

              <g id="radio-check"></g>

              <g id="eye-slash"></g>

              <g id="eye"></g>

              <g id="toggle-off"></g>

              <g id="shredder"></g>

              <g
                id="spinner--loading--dots-"
                serifId="spinner [loading, dots]"
              ></g>

              <g id="react"></g>

              <g id="check-selected"></g>

              <g id="turn-off"></g>

              <g id="code-block"></g>

              <g id="user"></g>

              <g id="coffee-bean"></g>

              <g id="coffee-beans">
                <g id="coffee-bean1" serifId="coffee-bean"></g>
              </g>

              <g id="coffee-bean-filled"></g>

              <g id="coffee-beans-filled">
                <g id="coffee-bean2" serifId="coffee-bean"></g>
              </g>

              <g id="clipboard"></g>

              <g id="clipboard-paste"></g>

              <g id="clipboard-copy"></g>

              <g id="Layer1"></g>
            </g>
          </svg> */}
          <span>Rejected</span>
        </div>
      </div>
      <div
        className="sidebar-logout"
        onClick={() => {
          sessionStorage.clear();
          navigate("/login");
        }}
      >
        <img src={Logout} alt="Logout" />
        <span>Logout</span>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="warning"
          elevation={6}
          sx={{ width: "100%" }}
        >
          Loading, Just a moment
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Sidebar;

/*

*/
