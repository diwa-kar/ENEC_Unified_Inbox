import React, { useEffect, useState } from "react";
import EmptyIcon from "./inbox-default.png";
import "./NotificationDisplay.css";
import axios from "axios";
import { toast } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Divider, TextareaAutosize } from "@mui/material";
import CustomSnackbar from "../ReusableComponents/CustomSnackbar/CustomSnackbar";

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
  const [detailData, setDetailData] = useState([
    // {
    //   "Purchase Requisition Number": "1000005421",
    //   "Purchase Requisition Item Number": "10",
    //   "Purchase Requisition Release Status": "05",
    //   Purchase_Requisition_Item_Text: "TEST KIROA 005",
    //   Purchase_Requisition_Material_Group: "20001",
    //   Requested_Quantity: "2.000",
    //   Base_Unit: "PC",
    //   Purchase_Requisition_Price: "2543.84",
    //   Plant: "2000",
    //   Company_Code: "2000",
    //   Processing_Status: "N",
    //   Delivery_Date: "2022-07-01T00:00:00",
    //   Creation_Date: "2022-06-30T00:00:00",
    // },
  ]);
  const [leaveDetail, setLeaveDetail] = useState([]);
  const [ticketdetail, setTicketdetail] = useState([]);
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
    // selectedItem.type &&
    // selectedItem.type == "Pending Request"
    if (
      selectedItem.type === "pending pr" ||
      selectedItem.type === "approved pr" ||
      selectedItem.type === "rejected pr"
    ) {
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
        // .then((response) => {
        //   const data = response.data;
        //   console.log("PR Response Data", data);
        const tempData = [];
        // eslint-disable-next-line array-callback-return
        Object.keys(data).map((key, index) => {
          tempData.push(data[key]);
        });
        console.log(tempData);
        setLoader(false);
        setDetailData(tempData);
        // })
        // .catch((error) => console.log(`Error in Axios ${error}`));
      } catch (e) {
        console.log(e);
      }
    } else if (
      selectedItem.type === "pending po" ||
      selectedItem.type === "approved po" ||
      selectedItem.type === "rejected po"
    ) {
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
    } else if (selectedItem.type === "approved leave") {
      setDisplayShow(true);
      setLeaveDetail([]);
      setLoader(true);
      uri = "qpmc_leave_req_accepted_list";
      console.log(selectedItem);
      try {
        axios
          .get(`http://localhost:8000/${uri}`)
          .then(async (response) => {
            console.log(response);
            const data = response.data;
            console.log(data.approved_leave_dets);
            data.map((data) => {
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
                if (key === "Leave Id" && value === selectedItem.value) {
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
    }
  };
  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  useEffect(() => {
    setDetailData([]);
    setDisplayShow(false);
    setLeaveDetail([]);
    setTicketdetail([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // setOpensnack(true);
        // axios
        //   .get(
        //     `http://localhost:8000/qpmc_pending_pr_approval?prno=${
        //       selectedItem.value.split(" ")[1]
        //     }`
        //   )
        //   .then((response) => {
        //     const data = response.data;
        //     console.log(data);
        //     if (data.result.ExStatus === "ERROR") toast.error(data.text);
        //     if (data.result.ExStatus === "APPROVED") toast.success(data.text);
        //     setCards(cards.filter((card) => card.value !== selectedItem.value));
        //     setDisplayShow(false);
        //     setDetailData([]);
        //     setOpensnack(true);
        //   })
        //   .catch((error) => console.log(`Error in Axios ${error}`));
      } catch (e) {
        console.log(e);
      }
    } else {
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
    }
    // setLoader(true);
    // if (selectedItem.type === "pending pr") {
    // detailData.length = 0;
    // try {
    //   axios
    //     .get(
    //       `http://localhost:8000/qpmc_pending_pr_approval?prno=${
    //         selectedItem.value.split(" ")[1]
    //       }`
    //     )
    //     .then((response) => {
    //       const data = response.data;
    //       console.log(data);
    //       if (data.result.ExStatus === "ERROR") toast.error(data.text);
    //       if (data.result.ExStatus === "APPROVED") toast.success(data.text);
    //       setCards(cards.filter((card) => card.value !== selectedItem.value));
    //       setDisplayShow(false);
    //       setDetailData([]);
    //       setOpensnack(true);
    //     })
    //     .catch((error) => console.log(`Error in Axios ${error}`));
    // } catch (e) {
    //   console.log(e);
    // }
    // } else if (selectedItem.type === "pending leave") {
    // leaveDetail.length = 0;
    // try {
    //   axios
    //     .get(
    //       `http://localhost:8000/qpmc_accept_leave_reuqest_sf?WfRequestId=${selectedItem.value}L&name=${leavename}&type=${leavetype}&duration=${leaveduration}`
    //     )
    //     .then((response) => {
    //       const data = response.data;
    //       console.log(data);
    //       // if (data.result.ExStatus == "ERROR") toast.error(data.text);
    //       // if (data.result.ExStatus == "APPROVED") toast.success(data.text);
    //       console.log(
    //         cards.filter((card) => card.value !== selectedItem.value)
    //       );
    //       setCards(cards.filter((card) => card.value !== selectedItem.value));
    //       setDisplayShow(false);
    //       setDetailData([]);
    //       setOpensnack(true);
    //     })
    //     .catch((error) => console.log(`Error in Axios ${error}`));
    // } catch (e) {
    //   console.log(e);
    // }
    // }
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

  function rejectRequest(username, value, comment) {
    console.log("Console from Reject", username, value, comment);
    if (value?.split(" ")[1] === "PR") {
    } else {
    }
    // setLoader(true);
    // if (selectedItem.type === "pending pr") {
    //   detailData.length = 0;
    //   try {
    //     axios
    //       .get(
    //         `http://localhost:8000/qpmc_pending_pr_reject?prno=${
    //           selectedItem.value.split(" ")[1]
    //         }`
    //       )
    //       .then((response) => {
    //         const data = response.data;
    //         console.log(data);
    //         if (data.result.ExStatus === "ERROR") toast.error(data.text);
    //         if (data.result.ExStatus === "REJECTED") toast.warning(data.text);
    //         setCards(cards.filter((card) => card.value !== selectedItem.value));
    //         setDisplayShow(false);
    //         setDetailData([]);
    //         setOpensnackr(true);
    //       })
    //       .catch((error) => console.log(`Error in Axios ${error}`));
    //   } catch (e) {
    //     console.log(e);
    //   }
    // } else if (selectedItem.type === "pending leave") {
    // leaveDetail.length = 0;
    // try {
    //   axios
    //     .get(
    //       `http://localhost:8000/qmpc_reject_leave_request_sf?WfRequestId=${selectedItem.value}L&name=${leavename}&type=${leavetype}&duration=${leaveduration}`
    //     )
    //     .then((response) => {
    //       const data = response.data;
    //       console.log(data);
    //       // if (data.result.ExStatus == "ERROR") toast.error(data.text);
    //       // if (data.result.ExStatus == "APPROVED") toast.success(data.text);
    //       setCards(cards.filter((card) => card.value !== selectedItem.value));
    //       console.log(
    //         cards.filter((card) => card.value !== selectedItem.value)
    //       );
    //       setDisplayShow(false);
    //       setDetailData([]);
    //       setOpensnackr(true);
    //     })
    //     .catch((error) => console.log(`Error in Axios ${error}`));
    // } catch (e) {
    //   console.log(e);
    // }
    // }
  }

  return (
    <div
      className="Notificataion-display"
      style={{
        width: "100%",
      }}
    >
      {detailData.length > 0 ||
      leaveDetail.length > 0 ||
      ticketdetail.length > 0 ? (
        <div className="Notificataion-display-title">
          {/* <span>{tab} Notification</span> */}
          <span>{selectedItem.value}</span>
        </div>
      ) : (
        <></>
      )}

      {/* {(detailData.length > 0) && tab == "Pending" ? (
        <></>
      ) : (
        <></>
      )} */}
      {detailData.length > 0 &&
      (selectedItem.type === "pending pr" ||
        selectedItem.type === "approved pr" ||
        selectedItem.type === "rejected pr" ||
        selectedItem.type === "pending po" ||
        selectedItem.type === "approved po" ||
        selectedItem.type === "rejected po") ? (
        <div className="Notificataion-display-content">
          {detailData.map((data, index) => {
            return (
              <div
                className={`Notificataion-display-detail ${
                  currentContent !== index ? "collapsable" : ""
                }`}
                key={index}
                onClick={() => setCurrentContent(index)}
                style={
                  {
                    // background: tab=='Pending' ? "#fffdf6": tab=='Approved'?"#EFFFEE":"#FFEEEE",
                    // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                    // marginBottom: detailData.length == index + 1 ? "20px" : "0px",
                  }
                }
              >
                {Object.keys(data).map((key, keyIndex) => (
                  <div>
                    <span
                      style={{
                        // color: "#820000",
                        wordWrap: "break-word",
                      }}
                    >
                      {key}
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
                        color: "black",
                      }}
                    >
                      {data[key] ? data[key] : "-"}
                    </span>
                  </div>
                ))}
              </div>
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
                  setOpenDialog({ ...openDialog, open: true, type: "approve" })
                }
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
                onClick={() =>
                  setOpenDialog({ ...openDialog, open: true, type: "reject" })
                }
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
      {leaveDetail.length > 0 &&
      (selectedItem.type === "pending leave" ||
        selectedItem.type === "approved leave" ||
        selectedItem.type === "rejected leave") ? (
        <div className="Notificataion-display-content">
          {console.log(leaveDetail)}
          {leaveDetail.map((data, index) => {
            return (
              <div
                className="Notificataion-display-detail-leave"
                key={index}
                style={
                  {
                    // background: tab=='Pending' ? "#EBF2F4": tab=='Approved'?"#EFFFEE":"#FFEEEE",
                    // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                    // marginBottom: detailData.length == index + 1 ? "20px" : "0px",
                  }
                }
              >
                {Object.keys(data).map((key, keyIndex) => (
                  <div>
                    <span
                      style={{
                        // color: "#002D62",
                        wordWrap: "break-word",
                      }}
                    >
                      {key}
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
                        color: "black",
                      }}
                    >
                      {data[key] ? data[key] : "-"}
                    </span>
                  </div>
                ))}
              </div>
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
        </div>
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
      {/* {(leaveDetail.length > 0) && tab == "Pending" ? (
        <div className="Notificataion-display-buttons-leave">
          <Button
            variant={"contained"}
            size="medium"
            sx={{
              backgroundColor: "#1b5e20",
              fontWeight: "bold",
            }}
            style={{
              margin: "5px 0px",
              textTransform: "capitalize",
              letterSpacing: "1px",
              fontSize: "11px",
              fontWeight: "550",
              width: "12%",
              fontWeight: "700",
              marginRight: "20px",
            }}
            color="success"
            onClick={() => approveRequest()}
          >
            Approve
          </Button>
          <Button
            variant={"contained"}
            size="medium"
            sx={{
              backgroundColor: "#c62828",
            }}
            style={{
              margin: "5px 0px",
              textTransform: "capitalize",
              letterSpacing: "1px",
              fontSize: "11px",
              fontWeight: "550",
              width: "12%",
              fontWeight: "700",
            }}
            color="error"
            onClick={() => rejectRequest()}
          >
            Reject
          </Button>
        </div>
      ) : (
        <></>
      )} */}
      {ticketdetail.length > 0 && selectedItem.type === "it ticket" ? (
        <div className="Notificataion-display-content">
          {ticketdetail.map((data, index) => {
            return (
              <div
                className="Notificataion-display-detail-leave"
                key={index}
                style={
                  {
                    // background: tab=='Pending' ? "#E9E9DF": tab=='Approved'?"#f3fffc":"#fff7f7",
                    // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                    // marginBottom: detailData.length == index + 1 ? "20px" : "0px",
                  }
                }
              >
                {Object.keys(data).map((key, keyIndex) => (
                  <div>
                    <span
                      style={{
                        // color: "#5A5A21",
                        wordWrap: "break-word",
                      }}
                    >
                      {key}
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
                        color: "black",
                      }}
                    >
                      {data[key]}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
          {selectedItem.type === "it ticket" && (
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
          )}
        </div>
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
              openDialog.type === "approve" ? "Approving" : "Rejecting"
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
            {/* <TextareaAutosize aria-label="empty textarea" placeholder="Empty" /> */}
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
                } else {
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
