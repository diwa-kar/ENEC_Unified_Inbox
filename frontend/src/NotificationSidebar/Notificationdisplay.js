import React, { useEffect, useState } from "react";
import EmptyIcon from "./inbox-default.png";
import "./NotificationDisplay.css";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Card, Chip, Grid, TextareaAutosize } from "@mui/material";
import CustomSnackbar from "../ReusableComponents/CustomSnackbar/CustomSnackbar";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { FcExpand } from "react-icons/fc";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notificationdisplay = ({
  selectedItem,
  isSidebarOpen,
  tab,
  cards,
  setCards,
  displayShow,
  setDisplayShow,
  currentContent,
  setCurrentContent,
}) => {
  const [loader, setLoader] = useState(true);
  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({
    duration: 5000,
    type: "error",
    infomation: "Invalid credentials!!",
  });
  const [opensnack, setOpensnack] = useState(false);
  const [opensnackr, setOpensnackr] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [leaveDetail, setLeaveDetail] = useState([]);
  const [ticketdetail, setTicketdetail] = useState([]);
  const [invoicedetail, setInvoicedetail] = useState([]);
  const [sesdetail, setSesDetail] = useState([]);
  const [leavetype, setLeavetype] = useState("");
  const [leaveduration, setLeaveduration] = useState("");
  const [leavename, setLeavename] = useState("");
  const handleClosesnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpensnack(false);
    setOpensnackr(false);
  };
  const getDetails = async () => {
    setDisplayShow(true);
    setDetailData([]);
    setLoader(true);
    let uri = "";
    let leavedets = [];
    let ticketdets = [];
    console.log(selectedItem);

    if (
      selectedItem.type === "pending pr" ||
      selectedItem.type === "approved pr" ||
      selectedItem.type === "rejected pr"
    ) {
      if (tab === "Approved") {
        uri = "approved_pr_item_info";
        try {
          const response = await fetch(`http://localhost:8000/${uri}`, {
            method: "POST",
            body: JSON.stringify({
              prno: selectedItem.value.split(" ")[1],
              username: JSON.parse(sessionStorage.getItem("email")).value,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          const data = await response.json();
          console.log("PR Response Data", data);

          const tempData = [];
          Object.keys(data).map((key, index) => {
            tempData.push(data[key]);
          });
          console.log(tempData);
          setLoader(false);
          setDetailData(tempData);
        } catch (e) {
          console.log(e);
        }
      } else if (tab === "Rejected") {
        uri = "rejected_pr_item_info";
        try {
          const response = await fetch(`http://localhost:8000/${uri}`, {
            method: "POST",
            body: JSON.stringify({
              prno: selectedItem.value.split(" ")[1],
              username: JSON.parse(sessionStorage.getItem("email")).value,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          const data = await response.json();
          console.log("PR Response Data", data);

          const tempData = [];
          Object.keys(data).map((key, index) => {
            tempData.push(data[key]);
          });
          console.log(tempData);
          setLoader(false);
          setDetailData(tempData);
        } catch (e) {
          console.log(e);
        }
      } else {
        uri = "pending_pr_item_info";
        try {
          const response = await fetch(`http://localhost:8000/${uri}`, {
            method: "POST",
            body: JSON.stringify({
              prno: selectedItem.value.split(" ")[1],
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          const data = await response.json();
          console.log("PR Response Data", data);

          const tempData = [];
          Object.keys(data).map((key, index) => {
            tempData.push(data[key]);
          });
          console.log(tempData);
          setLoader(false);
          setDetailData(tempData);
        } catch (e) {
          console.log(e);
        }
      }
    } else if (
      selectedItem.type === "pending po" ||
      selectedItem.type === "approved po" ||
      selectedItem.type === "rejected po"
    ) {
      if (tab === "Approved") {
        try {
          uri = "approved_po_item_info";
          const response = await fetch(`http://localhost:8000/${uri}`, {
            method: "POST",
            body: JSON.stringify({
              pono: selectedItem.value.split(" ")[1],
              username: JSON.parse(sessionStorage.getItem("email")).value,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          const data = await response.json();
          console.log("PO Response Data", data);
          const tempData = [];
          Object.keys(data).map((key, index) => {
            tempData.push(data[key]);
          });
          console.log(tempData);
          setLoader(false);
          setDetailData(tempData);
        } catch (e) {
          console.log(e);
        }
      } else if (tab === "Rejected") {
        try {
          uri = "rejected_po_item_info";
          const response = await fetch(`http://localhost:8000/${uri}`, {
            method: "POST",
            body: JSON.stringify({
              pono: selectedItem.value.split(" ")[1],
              username: JSON.parse(sessionStorage.getItem("email")).value,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          const data = await response.json();
          console.log("PO Response Data", data);
          const tempData = [];
          Object.keys(data).map((key, index) => {
            tempData.push(data[key]);
          });
          console.log(tempData);
          setLoader(false);
          setDetailData(tempData);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          uri = "pending_po_item_info";
          const response = await fetch(`http://localhost:8000/${uri}`, {
            method: "POST",
            body: JSON.stringify({
              pono: selectedItem.value.split(" ")[1],
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          const data = await response.json();
          console.log("PO Response Data", data);
          const tempData = [];
          Object.keys(data).map((key, index) => {
            tempData.push(data[key]);
          });
          console.log(tempData);
          setLoader(false);
          setDetailData(tempData);
        } catch (e) {
          console.log(e);
        }
      }
    } else if (selectedItem.type === "pending leave") {
      setDisplayShow(true);
      setLeaveDetail([]);
      setLoader(true);
      uri = "qpmc_leave_reuqest_sf";
      console.log(selectedItem);
      try {
        axios
          .get(`http://localhost:8000/${uri}`)
          .then((response) => {
            const data = response.data;
            console.log(data);
            data.map((data) => {
              for (const [key, value] of Object.entries(data)) {
                if (
                  key === "Leave Id" &&
                  value === selectedItem.value.split(" ")[1]
                ) {
                  console.log(key, value);
                  leavedets.push(data);
                  console.log(leavedets);
                  setLeavename(data["Employee Name"]);
                  setLeaveduration(data["Leave Duration"]);
                  setLeavetype(data["Leave Type"]);
                }
              }
              return null;
            });
            setLeaveDetail(leavedets);
            setLoader(false);
          })
          .catch((error) => console.log(`Error in Axios ${error}`));
      } catch (e) {
        console.log(e);
      }
    } else if (selectedItem.type === "it ticket") {
      setDisplayShow(true);
      setLeaveDetail([]);
      setLoader(true);
      uri = "It_tickets_details";
      console.log(selectedItem);
      try {
        axios
          .get(`http://localhost:8000/${uri}`)
          .then((response) => {
            const data = response.data;
            console.log(data);
            data.map((data) => {
              for (const [key, value] of Object.entries(data)) {
                if (key === "Ticket id" && value === selectedItem.value) {
                  ticketdets.push(data);
                  console.log(ticketdets);
                }
              }
              return null;
            });
            setTicketdetail(ticketdets);
            setLoader(false);
          })
          .catch((error) => console.log(`Error in Axios ${error}`));
      } catch (e) {
        console.log(e);
      }
    } else if (selectedItem.type === "pending invoice") {
      setDisplayShow(true);
      setInvoicedetail([]);
      setLoader(true);
      uri = "Pending_invoice_item_info";
      console.log(selectedItem);
      try {
        const response = await fetch(`http://localhost:8000/${uri}`, {
          method: "POST",
          body: JSON.stringify({
            inv_no: selectedItem.value.split(" ")[1],
            // username: JSON.parse(sessionStorage.getItem("email")).value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        console.log("data", data);

        console.log("on If", data);

        setInvoicedetail([{ ...data }]);
        setLoader(false);
      } catch (e) {
        console.log(e);
      }
    } else if (selectedItem.type === "approved invoice") {
      setDisplayShow(true);
      setInvoicedetail([]);
      setLoader(true);
      uri = "ENEC_approved_invoice_item_info";
      console.log(selectedItem);
      try {
        const response = await fetch(`http://localhost:8000/${uri}`, {
          method: "POST",
          body: JSON.stringify({
            inv_no: selectedItem.value.split(" ")[1],
            username: JSON.parse(sessionStorage.getItem("email")).value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        console.log(data);
        setInvoicedetail([{ ...data }]);
        setLoader(false);
      } catch (e) {
        console.log(e);
      }
    } else if (selectedItem.type === "rejected invoice") {
      setDisplayShow(true);
      setLeaveDetail([]);
      setLoader(true);
      uri = "ENEC_rejected_invoice_item_info";
      console.log(selectedItem);
      try {
        const response = await fetch(`http://localhost:8000/${uri}`, {
          method: "POST",
          body: JSON.stringify({
            inv_no: selectedItem.value.split(" ")[1],
            username: JSON.parse(sessionStorage.getItem("email")).value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        console.log(data);
        setInvoicedetail([{ ...data }]);
        setLoader(false);
      } catch (e) {
        console.log(e);
      }
    } else if (selectedItem.type === "pending SES") {
      setDisplayShow(true);
      setSesDetail([]);
      setLoader(true);
      uri = "ENEC_SES_DETAILS";
      try {
        const response = await fetch(`http://localhost:8000/${uri}`, {
          method: "POST",
          body: JSON.stringify({
            ses_no: selectedItem.value.split(" ")[1],
            username: JSON.parse(sessionStorage.getItem("email")).value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();

        setSesDetail([{ ...data }]);
        setLoader(false);
      } catch (e) {
        console.log(e);
      }
    } else if (selectedItem.type === "approved leave") {
      setDisplayShow(true);
      setLeaveDetail([]);
      setLoader(true);
      uri = "qpmc_approved_leave_list_mongo";
      console.log(selectedItem);
      try {
        axios
          .get(`http://localhost:8000/${uri}`)
          .then(async (response) => {
            console.log(response);
            const data = response.data;
            console.log(data.approved_leave_dets);
            data.approved_leave_dets.map((data) => {
              for (const [key, value] of Object.entries(data)) {
                if (key === "Leave_id" && value === selectedItem.value) {
                  console.log(key, value);
                  leavedets.push(data);
                  console.log(leavedets);
                  setLeavename(data["Employee_Name"]);
                  setLeaveduration(data["Leave_Duration"]);
                  setLeavetype(data["Leave_Type"]);
                }
              }
              return null;
            });
            setLeaveDetail(leavedets);
            setLoader(false);
          })
          .catch((error) => console.log(`Error in Axios ${error}`));
      } catch (e) {
        console.log(e);
      }
    } else if (selectedItem.type === "rejected leave") {
      setDisplayShow(true);
      setLeaveDetail([]);
      setLoader(true);
      uri = "qpmc_rejected_leave_list_mongo";
      console.log(selectedItem);
      try {
        axios
          .get(`http://localhost:8000/${uri}`)
          .then((response) => {
            const data = response.data;
            console.log(data.rejected_leave_dets);
            data.rejected_leave_dets.map((data) => {
              for (const [key, value] of Object.entries(data)) {
                if (key === "Leave_id" && value === selectedItem.value) {
                  console.log(key, value);
                  leavedets.push(data);
                  console.log(leavedets);
                  setLeavename(data["Employee Name"]);
                  setLeaveduration(data["Leave Duration"]);
                  setLeavetype(data["Leave_Type"]);
                }
              }
              return null;
            });
            setLeaveDetail(leavedets);
            setLoader(false);
          })
          .catch((error) => console.log(`Error in Axios ${error}`));
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    getDetails();
  }, [selectedItem]);

  useEffect(() => {
    setDetailData([]);
    setDisplayShow(false);
    setLeaveDetail([]);
    setTicketdetail([]);
    setInvoicedetail([]);
  }, [tab]);

  // Dialog Handler
  const [openDialog, setOpenDialog] = React.useState({
    open: false,
    type: "",
    comment: "",
  });
  const approveRequest = async (username, value, comment) => {
    if (value?.split(" ")[0] === "PR") {
      detailData.length = 0;
      try {
        const response = await fetch(
          "http://localhost:8000/pending_pr_approval",
          {
            method: "POST",
            body: JSON.stringify({
              username: username,
              prno: value.split(" ")[1],
              comment: comment,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setCards(cards.filter((card) => card.value !== selectedItem.value));
        setDisplayShow(false);
        setDetailData([]);
        setsnackbarValue({
          ...snackbarValue,
          type: "success",
          infomation: data,
        });
        setsnackbarOpen(true);
      } catch (e) {
        console.log(e);
      }
    } else {
      detailData.length = 0;
      try {
        const response = await fetch(
          "http://localhost:8000/pending_po_approval",
          {
            method: "POST",
            body: JSON.stringify({
              username: username,
              pono: value.split(" ")[1],
              comment: comment,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setCards(cards.filter((card) => card.value !== selectedItem.value));
        setDisplayShow(false);
        setDetailData([]);
        setsnackbarValue({
          ...snackbarValue,
          type: "success",
          infomation: data,
        });
        setsnackbarOpen(true);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const approvePendingLeave = () => {
    leaveDetail.length = 0;
    try {
      axios
        .get(
          `http://localhost:8000/qpmc_accept_leave_reuqest_sf?WfRequestId=${selectedItem.value}L&name=${leavename}&type=${leavetype}&duration=${leaveduration}`
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          // if (data.result.ExStatus == "ERROR") toast.error(data.text);
          // if (data.result.ExStatus == "APPROVED") toast.success(data.text);
          console.log(
            cards.filter((card) => card.value !== selectedItem.value)
          );
          setCards(cards.filter((card) => card.value !== selectedItem.value));
          setDisplayShow(false);
          setDetailData([]);
          setOpensnack(true);
        })
        .catch((error) => console.log(`Error in Axios ${error}`));
    } catch (e) {
      console.log(e);
    }
  };
  const rejectPendingLeave = () => {
    leaveDetail.length = 0;
    try {
      axios
        .get(
          `http://localhost:8000/qmpc_reject_leave_request_sf?WfRequestId=${selectedItem.value}L&name=${leavename}&type=${leavetype}&duration=${leaveduration}`
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          // if (data.result.ExStatus == "ERROR") toast.error(data.text);
          // if (data.result.ExStatus == "APPROVED") toast.success(data.text);
          setCards(cards.filter((card) => card.value !== selectedItem.value));
          console.log(
            cards.filter((card) => card.value !== selectedItem.value)
          );
          setDisplayShow(false);
          setDetailData([]);
          setOpensnackr(true);
        })
        .catch((error) => console.log(`Error in Axios ${error}`));
    } catch (e) {
      console.log(e);
    }
  };
  const rejectRequest = async (username, value, comment) => {
    if (value?.split(" ")[0] === "PR") {
      detailData.length = 0;
      try {
        const response = await fetch(
          "http://localhost:8000/pending_pr_rejection",
          {
            method: "POST",
            body: JSON.stringify({
              username: username,
              prno: value.split(" ")[1],
              comment: comment,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setCards(cards.filter((card) => card.value !== selectedItem.value));
        setDisplayShow(false);
        setDetailData([]);
        setsnackbarValue({
          ...snackbarValue,
          type: "success",
          infomation: data,
        });
        setsnackbarOpen(true);
      } catch (error) {
        console.log(error);
      }
    }
    detailData.length = 0;
    try {
      const response = await fetch(
        "http://localhost:8000/pending_po_rejection",
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            pono: value.split(" ")[1],
            comment: comment,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setCards(cards.filter((card) => card.value !== selectedItem.value));
      setDisplayShow(false);
      setDetailData([]);
      setsnackbarValue({
        ...snackbarValue,
        type: "success",
        infomation: data,
      });
      setsnackbarOpen(true);
    } catch (e) {
      console.log(e);
    }
  };
  const approveInvoice = async (username, value, comment) => {
    try {
      const response = await fetch(
        "http://localhost:8000/pending_invoice_approval",
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            inv_no: value.split(" ")[1],
            comment: comment,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setCards(cards.filter((card) => card.value !== selectedItem.value));
      setDisplayShow(false);
      setInvoicedetail([]);
      setsnackbarValue({
        ...snackbarValue,
        type: "success",
        infomation: data,
      });
      setsnackbarOpen(true);
    } catch (e) {
      console.log(e);
    }
  };
  const approveSES = async (username, value, comment) => {
    try {
      const response = await fetch("http://localhost:8000/ENEC_SES_Approval", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          ses_no: value.split(" ")[1],
          comment: comment,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      console.log(data);
      setCards(cards.filter((card) => card.value !== selectedItem.value));
      setDisplayShow(false);
      setSesDetail([]);
      setsnackbarValue({
        ...snackbarValue,
        type: "success",
        infomation: data,
      });
      setsnackbarOpen(true);
    } catch (e) {
      console.log(e);
    }
  };
  const rejectSES = async (username, value, comment) => {
    try {
      const response = await fetch("http://localhost:8000/ENEC_SES_Rejection", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          ses_no: value.split(" ")[1],
          comment: comment,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      console.log(data);
      setCards(cards.filter((card) => card.value !== selectedItem.value));
      setDisplayShow(false);
      setSesDetail([]);
      setsnackbarValue({
        ...snackbarValue,
        type: "success",
        infomation: data,
      });
      setsnackbarOpen(true);
    } catch (e) {
      console.log(e);
    }
  };
  const rejectInvoice = async (username, value, comment) => {
    const response = await fetch(
      "http://localhost:8000/pending_invoice_rejection",
      {
        method: "POST",
        body: JSON.stringify({
          username: username,
          inv_no: value.split(" ")[1],
          comment: comment,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setCards(cards.filter((card) => card.value !== selectedItem.value));
    setDisplayShow(false);
    setInvoicedetail([]);
    setsnackbarValue({
      ...snackbarValue,
      type: "error",
      infomation: data,
    });
    setsnackbarOpen(true);
  };

  const [expanded, setExpanded] = React.useState("panel0");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div
      // className="Notificataion-display"
      style={{
        width: "100%",
        // height: "70vh",
        overflow: "auto",
      }}
    >
      {detailData.length > 0 ||
      leaveDetail.length > 0 ||
      ticketdetail.length > 0 ||
      invoicedetail.length > 0 ||
      sesdetail.length > 0 ? (
        <div className="Notificataion-display-title">
          {/* <span>{tab} Notification</span> */}
          <span>{selectedItem.value}</span>
        </div>
      ) : (
        <></>
      )}

      {detailData.length > 0 &&
      (selectedItem.type === "pending pr" ||
        selectedItem.type === "approved pr" ||
        selectedItem.type === "rejected pr" ||
        selectedItem.type === "pending po" ||
        selectedItem.type === "approved po" ||
        selectedItem.type === "rejected po") ? (
        // <div className="Notificataion-display-content">
        <Card
          data-aos="zoom-in-up"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "20px",
            padding: "12px",
            margin: "15px",
            boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
          }}
        >
          {detailData.map((data, index) => {
            console.log(data);
            return (
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{ width: "100%", border: "none", boxShadow: "none" }}
              >
                <AccordionSummary
                  expandIcon={<FcExpand />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      fontWeight: 500,
                      fontSize: "1.025rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {selectedItem.type === "pending pr" ||
                    selectedItem.type === "approved pr" ||
                    selectedItem.type === "rejected pr"
                      ? data?.Purchase_Requisition_Number
                      : data?.Purchase_Order_Number}
                  </Typography>
                  <Typography sx={{ width: "33%", color: "text.secondary" }}>
                    {selectedItem.type === "pending pr" ||
                    selectedItem.type === "approved pr" ||
                    selectedItem.type === "rejected pr"
                      ? data.Purchase_Requisition_Item_Text
                      : data.CreatedByUser}
                  </Typography>
                  <Chip
                    label={
                      selectedItem.type === "pending pr" ||
                      selectedItem.type === "approved pr" ||
                      selectedItem.type === "rejected pr"
                        ? data.Creation_Date.slice(0, 10)
                        : data.CreationDate.slice(0, 10)
                    }
                    size="small"
                    sx={{
                      backgroundColor: "#D4EFFE",
                      color: "#00A4FF",
                      // width: "33%",
                      borderRadius: "6px",
                      pl: "3px",
                      pr: "3px",
                    }}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={0}>
                    {Object.keys(data).map((key, keyIndex) => {
                      return (
                        <Grid item xs={12} md={6} display="flex">
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 500,
                                fontSize: "0.875rem",
                                lineHeight: "1.5",
                                wordWrap: "break-word",
                                py: 1,
                                color: key === "Comment" ? "#a89566" : "black",
                              }}
                            >
                              {" "}
                              {key?.replace(/_/g, " ")}
                            </Typography>
                            {/* <span
                                style={{
                                  wordWrap: "break-word",
                                  color:
                                    key === "Comment" ? "#a89566" : "black",
                                }}
                              >
                                {key?.replace(/_/g, " ")}
                              </span> */}
                          </Grid>
                          <Grid item xs={12} md={1}>
                            <span
                              style={{
                                margin: "0px 4px",
                                color: "darkblue",
                              }}
                            >
                              :
                            </span>
                          </Grid>
                          <Grid item xs={12} md={5}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 400,
                                fontSize: "0.875rem",
                                lineHeight: "1.5",
                                wordWrap: "break-word",
                                py: 1,
                                color: key === "Comment" ? "#a89566" : "black",
                              }}
                            >
                              {data[key] ? data[key] : "-"}
                            </Typography>
                            {/* <span
                                style={{
                                  color:
                                    key === "Comment" ? "#a89566" : "black",
                                }}
                              >
                                {data[key] ? data[key] : "-"}
                              </span> */}
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                  {/* {Object.keys(data).map((key, keyIndex) => (
                      <>
                        <span
                          style={{
                            wordWrap: "break-word",
                            color: key === "Comment" ? "#a89566" : "black",
                          }}
                        >
                          {key?.replace(/_/g, " ")}
                        </span>
                        <span
                          style={{
                            margin: "0px 4px",
                            color: "darkblue",
                          }}
                        >
                          :
                        </span>
                        <span
                          style={{
                            color: key === "Comment" ? "#a89566" : "black",
                          }}
                        >
                          {data[key] ? data[key] : "-"}
                        </span>
                      </>
                    ))} */}
                </AccordionDetails>
              </Accordion>

              // <div
              //   className={`Notificataion-display-detail ${
              //     currentContent !== index ? "collapsable" : ""
              //   }`}
              //   key={index}
              //   onClick={() => setCurrentContent(index)}
              // >
              // {Object.keys(data).map((key, keyIndex) => (
              //   <div>
              //     <span
              //       style={{
              //         wordWrap: "break-word",
              //         color: key === "Comment" ? "#a89566" : "black",
              //       }}
              //     >
              //       {key?.replace(/_/g, " ")}
              //     </span>
              //     <span
              //       style={{
              //         margin: "0px 4px",
              //         color: "darkblue",
              //       }}
              //     >
              //       :
              //     </span>
              //     <span
              //       style={{
              //         color: key === "Comment" ? "#a89566" : "black",
              //       }}
              //     >
              //       {data[key] ? data[key] : "-"}
              //     </span>
              //   </div>
              // ))}
              // </div>
            );
          })}
          {(selectedItem.type === "pending pr" ||
            selectedItem.type === "pending po") && (
            <div className="Notificataion-display-buttons">
              <Button
                variant={"contained"}
                size="medium"
                sx={{
                  backgroundColor: "#17C964",
                  fontWeight: "bold",
                }}
                style={{
                  display: "inline-flex",
                  gap: "var(--8, 0.5rem)",
                  margin: "5px 0px",
                  textTransform: "capitalize",
                  letterSpacing: "1px",
                  fontSize: "11px",
                  fontWeight: "550",
                  marginRight: "20px",
                  padding: "0.625rem var(--16, 1rem)",
                }}
                color="success"
                onClick={() =>
                  setOpenDialog({
                    ...openDialog,
                    open: true,
                    type: "approve",
                  })
                }
              >
                Approve
              </Button>
              <Button
                variant={"contained"}
                size="medium"
                sx={{
                  backgroundColor: "#F31260",
                }}
                style={{
                  display: "inline-flex",
                  gap: "var(--8, 0.5rem)",
                  margin: "5px 0px",
                  textTransform: "capitalize",
                  letterSpacing: "1px",
                  fontSize: "11px",
                  fontWeight: "550",
                  marginRight: "20px",
                  padding: "0.625rem var(--16, 1rem)",
                }}
                color="error"
                onClick={() =>
                  setOpenDialog({ ...openDialog, open: true, type: "reject" })
                }
              >
                Reject
              </Button>
            </div>
          )}
        </Card>
      ) : (
        // </div>
        <></>
      )}
      {leaveDetail.length > 0 &&
      (selectedItem.type === "pending leave" ||
        selectedItem.type === "approved leave" ||
        selectedItem.type === "rejected leave") ? (
        <Card
          data-aos="zoom-in-up"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "20px",
            padding: "12px",
            margin: "15px",
            boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
          }}
        >
          {console.log(leaveDetail)}
          {leaveDetail.map((data, index) => {
            return (
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{ width: "100%", border: "none", boxShadow: "none" }}
              >
                <AccordionSummary
                  expandIcon={<FcExpand />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{
                      width: "50%",
                      flexShrink: 0,
                      fontWeight: 500,
                      fontSize: "1.025rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {data[Object.keys(data)[1]]}
                  </Typography>

                  <Chip
                    label={data[Object.keys(data)[3]]}
                    size="small"
                    sx={{
                      backgroundColor: "#D4EFFE",
                      color: "#00A4FF",
                      // width: "33%",
                      borderRadius: "6px",
                      pl: "3px",
                      pr: "3px",
                    }}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={0}>
                    {Object.keys(data).map((key, keyIndex) => {
                      return (
                        <Grid item xs={12} md={6} display="flex">
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 500,
                                fontSize: "0.875rem",
                                lineHeight: "1.5",
                                wordWrap: "break-word",
                                py: 1,
                                color: key === "Comment" ? "#a89566" : "black",
                              }}
                            >
                              {key?.replace(/_/g, " ")}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={1}>
                            <span
                              style={{
                                margin: "0px 4px",
                                color: "darkblue",
                              }}
                            >
                              :
                            </span>
                          </Grid>
                          <Grid item xs={12} md={5}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 400,
                                fontSize: "0.875rem",
                                lineHeight: "1.5",
                                wordWrap: "break-word",
                                py: 1,
                                color: key === "Comment" ? "#a89566" : "black",
                              }}
                            >
                              {data[key] ? data[key] : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              // <div
              //   className="Notificataion-display-detail-leave"
              //   key={index}
              //   style={
              //     {
              //       // background: tab=='Pending' ? "#EBF2F4": tab=='Approved'?"#EFFFEE":"#FFEEEE",
              //       // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
              //       // marginBottom: detailData.length == index + 1 ? "20px" : "0px",
              //     }
              //   }
              // >
              //   {Object.keys(data).map((key, keyIndex) => (
              //     <div>
              //       <span
              //         style={{
              //           // color: "#002D62",
              //           wordWrap: "break-word",
              //           color: key === "Comment" ? "#a89566" : "black",
              //         }}
              //       >
              //         {key?.replace(/_/g, " ")}
              //       </span>
              //       <span
              //         style={{
              //           margin: "0px 4px",
              //           color: "darkblue",
              //         }}
              //       >
              //         :
              //       </span>
              //       <span
              //         style={{
              //           color: key === "Comment" ? "#a89566" : "black",
              //         }}
              //       >
              //         {data[key] ? data[key] : "-"}
              //       </span>
              //     </div>
              //   ))}
              // </div>
            );
          })}
          {selectedItem.type === "pending leave" && (
            <div className="Notificataion-display-buttons-leave">
              <Button
                variant={"contained"}
                size="medium"
                sx={{
                  backgroundColor: "#17C964",
                  fontWeight: "bold",
                }}
                style={{
                  display: "inline-flex",
                  gap: "var(--8, 0.5rem)",
                  margin: "5px 0px",
                  textTransform: "capitalize",
                  letterSpacing: "1px",
                  fontSize: "11px",
                  fontWeight: "550",
                  marginRight: "20px",
                  padding: "0.625rem var(--16, 1rem)",
                }}
                color="success"
                onClick={() => approvePendingLeave()}
              >
                Approve
              </Button>
              <Button
                variant={"contained"}
                size="medium"
                sx={{
                  backgroundColor: "#F31260",
                }}
                style={{
                  display: "inline-flex",
                  gap: "var(--8, 0.5rem)",
                  margin: "5px 0px",
                  textTransform: "capitalize",
                  letterSpacing: "1px",
                  fontSize: "11px",
                  fontWeight: "550",
                  marginRight: "20px",
                  padding: "0.625rem var(--16, 1rem)",
                }}
                color="error"
                onClick={() => rejectPendingLeave()}
              >
                Reject
              </Button>
            </div>
          )}
        </Card>
      ) : (
        <></>
      )}
      <Snackbar
        open={opensnack}
        autoHideDuration={1500}
        onClose={handleClosesnack}
      >
        <Alert
          onClose={handleClosesnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          Request is Approved
        </Alert>
      </Snackbar>
      <Snackbar
        open={opensnackr}
        autoHideDuration={1500}
        onClose={handleClosesnack}
      >
        <Alert
          onClose={handleClosesnack}
          severity="error"
          sx={{ width: "100%" }}
        >
          Request is Rejected
        </Alert>
      </Snackbar>

      {ticketdetail.length > 0 && selectedItem.type === "it ticket" ? (
        <Card
          data-aos="zoom-in-up"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "20px",
            padding: "12px",
            margin: "15px",
            boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
          }}
        >
          {ticketdetail.map((data, index) => {
            console.log(data);
            return (
              // <div className="Notificataion-display-detail-leave" key={index}>
              // {Object.keys(data).map((key, keyIndex) => (
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{ width: "100%", border: "none", boxShadow: "none" }}
              >
                <AccordionSummary
                  expandIcon={<FcExpand />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{
                      width: "50%",
                      flexShrink: 0,
                      fontWeight: 500,
                      fontSize: "1.025rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {data[Object.keys(data)[0]]}
                  </Typography>

                  <Chip
                    label={data[Object.keys(data)[1]]}
                    size="small"
                    sx={{
                      backgroundColor: "#D4EFFE",
                      color: "#00A4FF",
                      // width: "33%",
                      borderRadius: "6px",
                      pl: "3px",
                      pr: "3px",
                    }}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={0}>
                    {Object.keys(data).map((key, keyIndex) => {
                      return (
                        <Grid item xs={12} md={6} display="flex">
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 500,
                                fontSize: "0.875rem",
                                lineHeight: "1.5",
                                wordWrap: "break-word",
                                py: 1,
                                color: key === "Comment" ? "#a89566" : "black",
                              }}
                            >
                              {key?.replace(/_/g, " ")}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={1}>
                            <span
                              style={{
                                margin: "0px 4px",
                                color: "darkblue",
                              }}
                            >
                              :
                            </span>
                          </Grid>
                          <Grid item xs={12} md={5}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 400,
                                fontSize: "0.875rem",
                                lineHeight: "1.5",
                                wordWrap: "break-word",
                                py: 1,
                                color: key === "Comment" ? "#a89566" : "black",
                              }}
                            >
                              {data[key] ? data[key] : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              // <div>
              //   <span
              //     style={{
              //       wordWrap: "break-word",
              //       color: key === "Comment" ? "#a89566" : "black",
              //     }}
              //   >
              //     {key?.replace(/_/g, " ")}
              //   </span>
              //   <span
              //     style={{
              //       margin: "0px 4px",
              //       color: "darkblue",
              //     }}
              //   >
              //     :
              //   </span>
              //   <span
              //     style={{
              //       color: key === "Comment" ? "#a89566" : "black",
              //     }}
              //   >
              //     {data[key] ? data[key] : "-"}
              //   </span>
              // </div>
              // ))}
              // </div>
            );
          })}
          {/* {selectedItem.type === "it ticket" && (
            <div className="Notificataion-display-buttons-leave">
              <Button
                variant={"contained"}
                size="medium"
                sx={{
                  backgroundColor: "#17C964",
                  fontWeight: "bold",
                }}
                style={{
                  display: "inline-flex",
                  gap: "var(--8, 0.5rem)",
                  margin: "5px 0px",
                  textTransform: "capitalize",
                  letterSpacing: "1px",
                  fontSize: "11px",
                  fontWeight: "550",
                  marginRight: "20px",
                  padding: "0.625rem var(--16, 1rem)",
                }}
                color="success"
                // onClick={() => approveRequest()}
              >
                Approve
              </Button>
              <Button
                variant={"contained"}
                size="medium"
                sx={{
                  backgroundColor: "#F31260",
                }}
                style={{
                  display: "inline-flex",
                  gap: "var(--8, 0.5rem)",
                  margin: "5px 0px",
                  textTransform: "capitalize",
                  letterSpacing: "1px",
                  fontSize: "11px",
                  fontWeight: "550",
                  marginRight: "20px",
                  padding: "0.625rem var(--16, 1rem)",
                }}
                color="error"
                // onClick={() => rejectRequest()}
              >
                Reject
              </Button>
            </div>
          )} */}
        </Card>
      ) : (
        <></>
      )}
      {invoicedetail.length > 0 &&
      (selectedItem.type === "pending invoice" ||
        selectedItem.type === "approved invoice" ||
        selectedItem.type === "rejected invoice") ? (
        <Card
          data-aos="zoom-in-up"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "20px",
            padding: "12px",
            margin: "15px",
            boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
          }}
        >
          {invoicedetail.map((data, index) => {
            console.log(data);
            return (
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{ width: "100%", border: "none", boxShadow: "none" }}
              >
                <AccordionSummary
                  expandIcon={<FcExpand />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      fontWeight: 500,
                      fontSize: "1.025rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {data["Invocie_no"]}
                  </Typography>
                  <Typography
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      fontWeight: 500,
                      fontSize: "1.025rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {data["user_name"]}
                  </Typography>

                  <Chip
                    label={data["Document_Date"]}
                    size="small"
                    sx={{
                      backgroundColor: "#D4EFFE",
                      color: "#00A4FF",
                      // width: "33%",
                      borderRadius: "6px",
                      pl: "3px",
                      pr: "3px",
                    }}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={0}>
                    {Object.keys(data).map((key, keyIndex) => {
                      return (
                        <Grid item xs={12} md={6} display="flex">
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 500,
                                fontSize: "0.875rem",
                                lineHeight: "1.5",
                                wordWrap: "break-word",
                                py: 1,
                                color: key === "Comment" ? "#a89566" : "black",
                              }}
                            >
                              {key?.replace(/_/g, " ")}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={1}>
                            <span
                              style={{
                                margin: "0px 4px",
                                color: "darkblue",
                              }}
                            >
                              :
                            </span>
                          </Grid>
                          <Grid item xs={12} md={5}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 400,
                                fontSize: "0.875rem",
                                lineHeight: "1.5",
                                wordWrap: "break-word",
                                py: 1,
                                color: key === "Comment" ? "#a89566" : "black",
                              }}
                            >
                              {data[key] ? data[key] : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              // <div className="Notificataion-display-detail-leave" key={index}>
              //   {Object.keys(data).map((key, keyIndex) => (
              //     <div>
              //       <span
              //         style={{
              //           wordWrap: "break-word",
              //           color: key === "Comment" ? "#a89566" : "black",
              //         }}
              //       >
              //         {key?.replace(/_/g, " ")}
              //       </span>
              //       <span
              //         style={{
              //           margin: "0px 4px",
              //           color: "darkblue",
              //         }}
              //       >
              //         :
              //       </span>
              //       <span
              //         style={{
              //           color: key === "Comment" ? "#a89566" : "black",
              //         }}
              //       >
              //         {data[key] ? data[key] : "-"}
              //       </span>
              //     </div>
              //   ))}
              // </div>
            );
          })}
          {selectedItem.type === "pending invoice" && (
            <div className="Notificataion-display-buttons-leave">
              <Button
                variant={"contained"}
                size="medium"
                sx={{
                  backgroundColor: "#17C964",
                  fontWeight: "bold",
                }}
                style={{
                  display: "inline-flex",
                  gap: "var(--8, 0.5rem)",
                  margin: "5px 0px",
                  textTransform: "capitalize",
                  letterSpacing: "1px",
                  fontSize: "11px",
                  fontWeight: "550",
                  marginRight: "20px",
                  padding: "0.625rem var(--16, 1rem)",
                }}
                color="success"
                onClick={() =>
                  setOpenDialog({
                    ...openDialog,
                    open: true,
                    type: "approve invoice",
                  })
                }
              >
                Approve
              </Button>
              <Button
                variant={"contained"}
                size="medium"
                sx={{
                  backgroundColor: "#F31260",
                }}
                style={{
                  display: "inline-flex",
                  gap: "var(--8, 0.5rem)",
                  margin: "5px 0px",
                  textTransform: "capitalize",
                  letterSpacing: "1px",
                  fontSize: "11px",
                  fontWeight: "550",
                  marginRight: "20px",
                  padding: "0.625rem var(--16, 1rem)",
                }}
                color="error"
                onClick={() =>
                  setOpenDialog({
                    ...openDialog,
                    open: true,
                    type: "reject invoice",
                  })
                }
              >
                Reject
              </Button>
            </div>
          )}
        </Card>
      ) : (
        <></>
      )}

      {sesdetail.length > 0 && selectedItem.type === "pending SES" ? (
        // ||   selectedItem.type === "approved invoice" ||
        //   selectedItem.type === "rejected invoice"
        <Card
          data-aos="zoom-in-up"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "20px",
            padding: "12px",
            margin: "15px",
            boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
          }}
        >
          {sesdetail.map((data, index) => {
            return (
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{ width: "100%", border: "none", boxShadow: "none" }}
              >
                <AccordionSummary
                  expandIcon={<FcExpand />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      fontWeight: 500,
                      fontSize: "1.025rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {data["SHEET_NO"]}
                  </Typography>
                  <Typography
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      fontWeight: 500,
                      fontSize: "1.025rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {data["CREATED_BY"]}
                  </Typography>

                  <Chip
                    label={data["CREATED_ON"]}
                    size="small"
                    sx={{
                      backgroundColor: "#D4EFFE",
                      color: "#00A4FF",
                      // width: "33%",
                      borderRadius: "6px",
                      pl: "3px",
                      pr: "3px",
                    }}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={0}>
                    {Object.keys(data).map((key, keyIndex) => {
                      return (
                        <Grid item xs={12} md={6} display="flex">
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 500,
                                fontSize: "0.875rem",
                                lineHeight: "1.5",
                                wordWrap: "break-word",
                                py: 1,
                                color: key === "Comment" ? "#a89566" : "black",
                              }}
                            >
                              {key?.replace(/_/g, " ")}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={1}>
                            <span
                              style={{
                                margin: "0px 4px",
                                color: "darkblue",
                              }}
                            >
                              :
                            </span>
                          </Grid>
                          <Grid item xs={12} md={5}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 400,
                                fontSize: "0.875rem",
                                lineHeight: "1.5",
                                wordWrap: "break-word",
                                py: 1,
                                color: key === "Comment" ? "#a89566" : "black",
                              }}
                            >
                              {data[key] ? data[key] : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              // <div className="Notificataion-display-detail-leave" key={index}>
              //   {Object.keys(data).map((key, keyIndex) => (
              //     <div>
              //       <span
              //         style={{
              //           wordWrap: "break-word",
              //           color: key === "Comment" ? "#a89566" : "black",
              //         }}
              //       >
              //         {key?.replace(/_/g, " ")}
              //       </span>
              //       <span
              //         style={{
              //           margin: "0px 4px",
              //           color: "darkblue",
              //         }}
              //       >
              //         :
              //       </span>
              //       <span
              //         style={{
              //           color: key === "Comment" ? "#a89566" : "black",
              //         }}
              //       >
              //         {data[key] ? data[key] : "-"}
              //       </span>
              //     </div>
              //   ))}
              // </div>
            );
          })}
          {selectedItem.type === "pending SES" && (
            <div className="Notificataion-display-buttons-leave">
              <Button
                variant={"contained"}
                size="medium"
                sx={{
                  backgroundColor: "#17C964",
                  fontWeight: "bold",
                }}
                style={{
                  display: "inline-flex",
                  gap: "var(--8, 0.5rem)",
                  margin: "5px 0px",
                  textTransform: "capitalize",
                  letterSpacing: "1px",
                  fontSize: "11px",
                  fontWeight: "550",
                  marginRight: "20px",
                  padding: "0.625rem var(--16, 1rem)",
                }}
                color="success"
                onClick={() =>
                  setOpenDialog({
                    ...openDialog,
                    open: true,
                    type: "approve SES",
                  })
                }
              >
                Approve
              </Button>
              <Button
                variant={"contained"}
                size="medium"
                sx={{
                  backgroundColor: "#F31260",
                }}
                style={{
                  display: "inline-flex",
                  gap: "var(--8, 0.5rem)",
                  margin: "5px 0px",
                  textTransform: "capitalize",
                  letterSpacing: "1px",
                  fontSize: "11px",
                  fontWeight: "550",
                  marginRight: "20px",
                  padding: "0.625rem var(--16, 1rem)",
                }}
                color="error"
                onClick={() =>
                  setOpenDialog({
                    ...openDialog,
                    open: true,
                    type: "reject SES",
                  })
                }
              >
                Reject
              </Button>
            </div>
          )}
        </Card>
      ) : (
        <></>
      )}
      {detailData.length === 0 && displayShow === false ? (
        <div
          style={{
            width: "100%",
            height: "80%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src={EmptyIcon}
            alt="Inbox Default Icon"
            style={{
              width: "20%",
              marginTop: "100px",
            }}
          />
          <span
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              letterSpacing: "0.5px",
              textAlign: "center",
            }}
          >
            Select an item to make action
          </span>
          <span
            style={{
              fontSize: "15px",
              letterSpacing: "0.5px",
              textAlign: "center",
            }}
          >
            Nothing is selected
          </span>
        </div>
      ) : (
        <></>
      )}
      <div
        style={{
          height: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PuffLoader
          color="#936C29"
          loading={loader}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>

      {openDialog.open && (
        <Dialog
          open={openDialog.open}
          TransitionComponent={Transition}
          keepMounted
          fullWidth={"sm"}
          PaperProps={{
            style: { borderRadius: "10px", padding: "10px" },
          }}
          maxWidth={"sm"}
          // onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ fontSize: "18px", fontWeight: 600 }}>
            {`Want to add comment while ${
              openDialog.type === "approve"
                ? "Approving"
                : openDialog.type === "reject"
                ? "Rejecting"
                : openDialog.type === "approve invoice"
                ? "Approving Invoice"
                : openDialog.type === "reject invoice"
                ? "Rejecting Invoice"
                : openDialog.type === "approve SES"
                ? "Approving SES"
                : openDialog.type === "reject SES"
                ? "Rejecting SES"
                : ""
            } ${selectedItem.value}?`}
          </DialogTitle>
          <hr style={{ margin: 0, padding: 0 }} />
          <DialogContent>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Enter Comment"
              style={{ width: "100%", padding: "6px", borderRadius: "5px" }}
              minRows={3}
              value={openDialog.comment}
              onChange={(e) =>
                setOpenDialog({ ...openDialog, comment: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ fontSize: "14px", textTransform: "capitalize" }}
              onClick={() => setOpenDialog({ ...openDialog, open: false })}
            >
              Close
            </Button>
            <Button
              sx={{
                fontSize: "14px",
                width: "fit-content",
                textTransform: "capitalize",
                color: "#FFF",
                bgcolor: "#a89566",
                "&:hover": { bgcolor: "#a89566" },
              }}
              onClick={() => {
                if (openDialog.type === "approve") {
                  approveRequest(
                    JSON.parse(sessionStorage.getItem("email")).value,
                    selectedItem.value,
                    openDialog.comment
                  );
                  setOpenDialog({
                    open: false,
                    type: "",
                    comment: "",
                  });
                } else if (openDialog.type === "reject") {
                  rejectRequest(
                    JSON.parse(sessionStorage.getItem("email")).value,
                    selectedItem.value,
                    openDialog.comment
                  );
                  setOpenDialog({
                    open: false,
                    type: "",
                    comment: "",
                  });
                } else if (openDialog.type === "approve invoice") {
                  approveInvoice(
                    JSON.parse(sessionStorage.getItem("email")).value,
                    selectedItem.value,
                    openDialog.comment
                  );
                  setOpenDialog({
                    open: false,
                    type: "",
                    comment: "",
                  });
                } else if (openDialog.type === "approve SES") {
                  approveSES(
                    JSON.parse(sessionStorage.getItem("email")).value,
                    selectedItem.value,
                    openDialog.comment
                  );
                  setOpenDialog({
                    open: false,
                    type: "",
                    comment: "",
                  });
                } else if (openDialog.type === "reject SES") {
                  rejectSES(
                    JSON.parse(sessionStorage.getItem("email")).value,
                    selectedItem.value,
                    openDialog.comment
                  );
                  setOpenDialog({
                    open: false,
                    type: "",
                    comment: "",
                  });
                } else {
                  rejectInvoice(
                    JSON.parse(sessionStorage.getItem("email")).value,
                    selectedItem.value,
                    openDialog.comment
                  );
                  setOpenDialog({
                    open: false,
                    type: "",
                    comment: "",
                  });
                }
              }}
            >
              Add Comment
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <CustomSnackbar
        open={snackbarOpen}
        setOpen={setsnackbarOpen}
        snackbarValue={snackbarValue}
      />
    </div>
  );
};

export default Notificationdisplay;
