import React, { useEffect, useState } from "react";
import EmptyIcon from "./inbox-default.png";
import "./NotificationDisplay.css";
import axios from "axios";
import { toast } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
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
  setCurrentContent
}) => {
  const [loader, setLoader] = useState(true);
  const [opensnack,setOpensnack] = useState(false);
  const [opensnackr,setOpensnackr] = useState(false);
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
  const [leaveDetail,setLeaveDetail]=useState([]);
  const [ticketdetail,setTicketdetail]=useState([]);
  const [leavetype,setLeavetype]=useState("");
  const [leaveduration,setLeaveduration]=useState("");
  const [leavename,setLeavename]=useState("");
  const handleClosesnack = (event, reason) => {
    if (reason === 'clickaway') {
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
    let leavedets=[];
    let ticketdets=[];
    console.log(selectedItem)
    // selectedItem.type &&
    // selectedItem.type == "Pending Request"
    if (selectedItem.type==="pending pr"|| selectedItem.type === "approved pr" || selectedItem.type === "rejected pr" ){
      uri = "qmpc_pending_pr_item_info"
      try {
        axios
          .get(
            `http://localhost:8000/${uri}?prno=${
              selectedItem.value.split(" ")[1]
            }`
          )
          .then((response) => {
            const data = response.data;
            const tempData = [];
            // eslint-disable-next-line array-callback-return
            Object.keys(data).map((key, index) => {
              tempData.push(data[key]);
            });
            console.log(tempData)
            setLoader(false);
            setDetailData(tempData);
          })
          .catch((error) => console.log(`Error in Axios ${error}`));
      } catch (e) {
        console.log(e);
      }
    }else if (selectedItem.type==="pending leave"){
      setDisplayShow(true);
      setLeaveDetail([]);
      setLoader(true);
      uri="qpmc_leave_reuqest_sf"
      console.log(selectedItem)
      try {
        axios
          .get(
            `http://localhost:8000/${uri}`
          )
          .then((response) => {
            const data = response.data;
            console.log(data)
            data.map((data) => {
              for (const [key, value] of Object.entries(data)) {
                if (key === "Leave Id" && value === selectedItem.value.split(" ")[1]) {
                  console.log(key,value);
                  leavedets.push(data)
                  console.log(leavedets)
                  setLeavename(data["Employee Name"]);
                  setLeaveduration(data["Leave Duration"]);
                  setLeavetype(data["Leave Type"]);
                }
              }
              return null
            })
            setLeaveDetail(leavedets);
            setLoader(false);
          })
          .catch((error) => console.log(`Error in Axios ${error}`));
      } catch (e) {
        console.log(e);
      }
    }else if (selectedItem.type === "it ticket"){
      setDisplayShow(true);
      setLeaveDetail([]);
      setLoader(true);
      uri="qpmc_it_tickets_details"
      console.log(selectedItem)
      try {
        axios
          .get(
            `http://localhost:8000/${uri}`
          )
          .then((response) => {
            const data = response.data;
            console.log(data)
            data.map((data) => {
              for (const [key, value] of Object.entries(data)) {
                if (key === "Ticket id" && value === selectedItem.value) {
                  ticketdets.push(data)
                  console.log(ticketdets)
                }
              }
              return null
            })
            setTicketdetail(ticketdets);
            setLoader(false);
          })
          .catch((error) => console.log(`Error in Axios ${error}`));
      } catch (e) {
        console.log(e);
      }
    } else if (selectedItem.type==="approved leave"){
      setDisplayShow(true);
      setLeaveDetail([]);
      setLoader(true);
      uri="qpmc_leave_req_accepted_list"
      console.log(selectedItem)
      try {
        axios
          .get(
            `http://localhost:8000/${uri}`
          )
          .then(async (response) => {
            console.log(response)
            const data = response.data;
            console.log(data.approved_leave_dets)
            data.map((data) => {
              for (const [key, value] of Object.entries(data)) {
                if (key === "Leave_id" && value === selectedItem.value) {
                  console.log(key,value);
                  leavedets.push(data)
                  console.log(leavedets)
                  setLeavename(data["Employee_Name"]);
                  setLeaveduration(data["Leave_Duration"]);
                  setLeavetype(data["Leave_Type"]);
                }
              }
              return null
            })
            setLeaveDetail(leavedets);
            setLoader(false);
          })
          .catch((error) => console.log(`Error in Axios ${error}`));
      } catch (e) {
        console.log(e);
      }
    } else if (selectedItem.type==="rejected leave"){
      setDisplayShow(true);
      setLeaveDetail([]);
      setLoader(true);
      uri="qpmc_rejected_leave_list_mongo"
      console.log(selectedItem)
      try {
        axios
          .get(
            `http://localhost:8000/${uri}`
          )
          .then((response) => {
            const data = response.data;
            console.log(data.rejected_leave_dets)
            data.rejected_leave_dets.map((data) => {
              for (const [key, value] of Object.entries(data)) {
                if (key === "Leave Id" && value === selectedItem.value) {
                  console.log(key,value);
                  leavedets.push(data)
                  console.log(leavedets)
                  setLeavename(data["Employee Name"]);
                  setLeaveduration(data["Leave Duration"]);
                  setLeavetype(data["Leave Type"]);
                }
              }
              return null
            })
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

  function approveRequest() {
    setLoader(true);
    if(selectedItem.type==="pending pr"){
      detailData.length = 0;
      try {
        axios
          .get(
            `http://localhost:8000/qpmc_pending_pr_approval?prno=${
              selectedItem.value.split(" ")[1]
            }`
          )
          .then((response) => {
            const data = response.data;
            console.log(data);
            if (data.result.ExStatus === "ERROR") toast.error(data.text);
            if (data.result.ExStatus === "APPROVED") toast.success(data.text);
            setCards(cards.filter((card) => card.value !== selectedItem.value));
            setDisplayShow(false);
            setDetailData([]);
            setOpensnack(true);
          })
          .catch((error) => console.log(`Error in Axios ${error}`));
      } catch (e) {
        console.log(e);
      }
    }else if (selectedItem.type==="pending leave"){
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
            console.log(cards.filter((card) => card.value !== selectedItem.value));
            setCards(cards.filter((card) => card.value !== selectedItem.value));
            setDisplayShow(false);
            setDetailData([]);
            setOpensnack(true);
          })
          .catch((error) => console.log(`Error in Axios ${error}`));
      } catch (e) {
        console.log(e);
      }
    }
  }

  function rejectRequest() {
    setLoader(true);
    if(selectedItem.type === "pending pr"){
      detailData.length = 0;
      try {
        axios
          .get(
            `http://localhost:8000/qpmc_pending_pr_reject?prno=${
              selectedItem.value.split(" ")[1]
            }`
          )
          .then((response) => {
            const data = response.data;
            console.log(data);
            if (data.result.ExStatus === "ERROR") toast.error(data.text);
            if (data.result.ExStatus === "REJECTED") toast.warning(data.text);
            setCards(cards.filter((card) => card.value !== selectedItem.value));
            setDisplayShow(false);
            setDetailData([]);
            setOpensnackr(true);
          })
          .catch((error) => console.log(`Error in Axios ${error}`));
      } catch (e) {
        console.log(e);
      }
    } else if (selectedItem.type==="pending leave"){
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
            console.log(cards.filter((card) => card.value !== selectedItem.value));
            setDisplayShow(false);
            setDetailData([]);
            setOpensnackr(true);
          })
          .catch((error) => console.log(`Error in Axios ${error}`));
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div
      className="Notificataion-display"
      style={{
        width: "100%",
      }}
    >
      {detailData.length > 0 || leaveDetail.length > 0 || ticketdetail.length > 0 ? (
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
      {detailData.length > 0 && (selectedItem.type==="pending pr" || selectedItem.type==="approved pr" || selectedItem.type==="rejected pr") ? (
        <div className="Notificataion-display-content">
          {detailData.map((data, index) => {
            console.log(currentContent !== index);
            console.log(index);
            return (
              <div
                className={`Notificataion-display-detail ${currentContent !== index ? "collapsable" : ""}`}
                key={index}
                onClick={() => setCurrentContent(index)}
                style={{
                  // background: tab=='Pending' ? "#fffdf6": tab=='Approved'?"#EFFFEE":"#FFEEEE",
                  // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                  // marginBottom: detailData.length == index + 1 ? "20px" : "0px",
                }}
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
                      {data[key]}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
          {selectedItem.type === "pending pr" && <div className="Notificataion-display-buttons">
          <Button
            variant={"contained"}
            size="medium"
            sx={{
              backgroundColor: "#17C964",
              fontWeight: "bold",
            }}
            style={{
              display: 'inline-flex',
              gap: 'var(--8, 0.5rem)',
              margin: "5px 0px",
              textTransform: "capitalize",
              letterSpacing: "1px",
              fontSize: "11px",
              fontWeight: "550",
              marginRight: "20px",
              padding: "0.625rem var(--16, 1rem)"
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
              backgroundColor: "#F31260"
            }}
            style={{
              display: 'inline-flex',
              gap: 'var(--8, 0.5rem)',
              margin: "5px 0px",
              textTransform: "capitalize",
              letterSpacing: "1px",
              fontSize: "11px",
              fontWeight: "550",
              marginRight: "20px",
              padding: "0.625rem var(--16, 1rem)"
            }}
            color="error"
            onClick={() => rejectRequest()}
          >
            Reject
          </Button>
        </div>}
        </div>
      ) : (
        <></>
      )}
      {leaveDetail.length > 0 && (selectedItem.type==="pending leave" || selectedItem.type==="approved leave" || selectedItem.type==="rejected leave")? (
        <div className="Notificataion-display-content">
          {console.log(leaveDetail)}
          {leaveDetail.map((data, index) => {
            return (
              <div
                className="Notificataion-display-detail-leave"
                key={index}
                style={{
                  // background: tab=='Pending' ? "#EBF2F4": tab=='Approved'?"#EFFFEE":"#FFEEEE",
                  // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                  // marginBottom: detailData.length == index + 1 ? "20px" : "0px",
                }}
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
                      {data[key]}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
          {selectedItem.type==="pending leave" && 
        <div className="Notificataion-display-buttons-leave">
          <Button
            variant={"contained"}
            size="medium"
            sx={{
              backgroundColor: "#17C964",
              fontWeight: "bold",
            }}
            style={{
              display: 'inline-flex',
              gap: 'var(--8, 0.5rem)',
              margin: "5px 0px",
              textTransform: "capitalize",
              letterSpacing: "1px",
              fontSize: "11px",
              fontWeight: "550",
              marginRight: "20px",
              padding: "0.625rem var(--16, 1rem)"
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
              backgroundColor: "#F31260",
            }}
            style={{
              display: 'inline-flex',
              gap: 'var(--8, 0.5rem)',
              margin: "5px 0px",
              textTransform: "capitalize",
              letterSpacing: "1px",
              fontSize: "11px",
              fontWeight: "550",
              marginRight: "20px",
              padding: "0.625rem var(--16, 1rem)"
            }}
            color="error"
            onClick={() => rejectRequest()}
          >
            Reject
          </Button>
        </div>
        }
        </div>
        
      ) : (
        <></>
      )}
      <Snackbar open={opensnack} autoHideDuration={1500} onClose={handleClosesnack}>
        <Alert onClose={handleClosesnack} severity="success" sx={{ width: '100%' }}>
          Request is Approved
        </Alert>
      </Snackbar>
      <Snackbar open={opensnackr} autoHideDuration={1500} onClose={handleClosesnack}>
        <Alert onClose={handleClosesnack} severity="error" sx={{ width: '100%' }}>
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
      {ticketdetail.length > 0 && selectedItem.type==="it ticket" ? (
        <div className="Notificataion-display-content">
          {ticketdetail.map((data, index) => {
            return (
              <div
                className="Notificataion-display-detail-leave"
                key={index}
                style={{
                  // background: tab=='Pending' ? "#E9E9DF": tab=='Approved'?"#f3fffc":"#fff7f7",
                  // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                  // marginBottom: detailData.length == index + 1 ? "20px" : "0px",
                }}
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
           {selectedItem.type==="it ticket" && 
        <div className="Notificataion-display-buttons-leave">
          <Button
            variant={"contained"}
            size="medium"
            sx={{
              backgroundColor: "#17C964",
              fontWeight: "bold",
            }}
            style={{
              display: 'inline-flex',
              gap: 'var(--8, 0.5rem)',
              margin: "5px 0px",
              textTransform: "capitalize",
              letterSpacing: "1px",
              fontSize: "11px",
              fontWeight: "550",
              marginRight: "20px",
              padding: "0.625rem var(--16, 1rem)"
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
              backgroundColor: "#F31260",
            }}
            style={{
              display: 'inline-flex',
              gap: 'var(--8, 0.5rem)',
              margin: "5px 0px",
              textTransform: "capitalize",
              letterSpacing: "1px",
              fontSize: "11px",
              fontWeight: "550",
              marginRight: "20px",
              padding: "0.625rem var(--16, 1rem)"
            }}
            color="error"
            onClick={() => rejectRequest()}
          >
            Reject
          </Button>
        </div>
        }
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
    </div>
  );
};

export default Notificationdisplay;
