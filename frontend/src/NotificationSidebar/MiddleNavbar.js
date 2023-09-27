import React, { useEffect, useContext, useState } from "react";
import NotificationItem from "./NotificationItem";
import PuffLoader from "react-spinners/PuffLoader";
import { ValueContext } from "../LandingPage/MainPage";

const MiddleNavbar = (props) => {
  const showTab = useContext(ValueContext);

  const [originalList, setOriginalList] = useState([]);

  const makeAPICall = async () => {
    let uri = "";
    let uri1 = "";
    let uri2 = "";
    let uri3 = "";
    let pending_prlist = [];
    let pending_polist = [];
    let pending_leave = [];
    let approved_prlist = [];
    let approved_polist = [];
    let approved_leave = [];
    let rejected_prlist = [];
    let rejected_polist = [];
    let rejected_leave = [];
    let it_tickets = [];
    if (props.activeTab === "Pending") {
      uri = "pending_pr_list";
      uri1 = "qpmc_leave_reuqest_sf";
      // uri2 = "qpmc_it_tickets"
      uri2 = "IT_ticket_list";
      uri3 = "pending_po_list";
      try {
        const response = await fetch(`http://localhost:8000/${uri}`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: "ABAPER1",
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        console.log("pending_pr_list", data, data.pending_pr);
        let type = "pending pr";
        if (data) {
          pending_prlist = data.map((data, index) => {
            return {
              type: type,
              value: data,
              description: "PR Request",
            };
          });

          console.log(pending_prlist);
        }

        const response1 = await fetch(`http://localhost:8000/${uri1}`, {
          mode: "cors",
          method: "GET",
        });
        const data1 = await response1.json();
        console.log("qpmc_leav_request_sf", data1);
        let type1 = "pending leave";
        if (data1) {
          pending_leave = data1.map((data, index) => {
            let some = 0;
            let description = "";
            for (const [key, value] of Object.entries(data)) {
              if (key === "Leave Id") {
                some = value;
              }
              if (key === "Leave Type") {
                description = value;
              }
            }
            return {
              type: type1,
              value: "PL " + some,
              description: description,
            };
          });
        }

        const response2 = await fetch(`http://localhost:8000/${uri2}`, {
          mode: "cors",
          method: "GET",
        });
        const data2 = await response2.json();
        console.log("IT_ticket_list", data);
        let type2 = "it ticket";
        if (data2) {
          it_tickets = data2.map((item, index) => ({
            type: type2,
            value: item,
            description: "Ticket",
          }));
        }

        const response3 = await fetch(`http://localhost:8000/${uri3}`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: "Girish",
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data3 = await response3.json();
        console.log("pending_po_list", data3);
        let type3 = "pending po";
        if (data3) {
          pending_polist = data3.map((data, index) => {
            return {
              type: type3,
              value: data,
              description: "PO Request",
            };
          });

          console.log(pending_polist);
        }
        // console.log(it_tickets);
        // console.log(it_tickets.concat(pending_prlist.concat(pending_leave)))
        props.setCards([
          ...it_tickets,
          ...pending_prlist,
          ...pending_leave,
          ...pending_polist,
        ]);
        setOriginalList([
          ...it_tickets,
          ...pending_prlist,
          ...pending_leave,
          ...pending_polist,
        ]);
        // props.setCards(it_tickets.concat(pending_prlist.concat(pending_leave)));
        // setOriginalList(
        //   it_tickets.concat(pending_prlist.concat(pending_leave))
        // );
        showTab.setShowtab(true);
      } catch (e) {
        console.log(e);
      }
    } else if (props.activeTab === "Approved") {
      uri = "ENEC_approved_pr_list_mongo";
      // uri1 = "qpmc_approved_leave_list_mongo";
      uri1 = "qpmc_approved_leave_list_mongo";
      uri2 = "ENEC_approved_po_list_mongo";
      try {
        const response = await fetch(`http://localhost:8000/${uri}`, {
          mode: "cors",
        });
        const data = await response.json();
        console.log(data);
        let type = "approved pr";
        if (data) {
          approved_prlist = data.map((item, index) => ({
            type: type,
            value: item,
            description: "PR Request",
          }));
        }

        const response2 = await fetch(`http://localhost:8000/${uri2}`, {
          mode: "cors",
        });
        const data2 = await response2.json();
        console.log(data2);
        let type2 = "approved po";
        if (data2) {
          approved_polist = data2.map((item, index) => ({
            type: type2,
            value: item,
            description: "PO Request",
          }));
        }
        const response1 = await fetch(`http://localhost:8000/${uri1}`, {
          mode: "cors",
        });
        const data1 = await response1.json();
        console.log(data1);
        let type1 = "approved leave";
        if (data1) {
          approved_leave = data1.approved_leave_dets.map((item, index) => ({
            type: type1,
            value: item["Leave_id"],
            description: item["Leave_Type"],
          }));
        }
        // console.log(approved_prlist.concat(approved_leave));
        // props.setCards(approved_leave.concat(approved_prlist));
        // setOriginalList(approved_leave.concat(approved_prlist));
        props.setCards([
          ...approved_prlist,
          ...approved_polist,
          ...approved_leave,
        ]);
        setOriginalList([
          ...approved_prlist,
          ...approved_polist,
          ...approved_leave,
        ]);
      } catch (e) {
        console.log(e);
      }
    }

    if (props.activeTab === "Rejected") {
      uri = "ENEC_rejected_pr_list_mongo";
      // uri1 = "qpmc_rejected_leave_list_mongo"
      uri1 = "qpmc_rejected_leave_list_mongo";
      uri2 = "ENEC_rejected_po_list_mongo";
      try {
        const response = await fetch(`http://localhost:8000/${uri}`, {
          mode: "cors",
        });
        const data = await response.json();
        console.log(data);
        let type = "rejected pr";
        if (data) {
          rejected_prlist = data.map((item, index) => ({
            type: type,
            value: item,
            description: "PR Request",
          }));
        }
        const response1 = await fetch(`http://localhost:8000/${uri1}`, {
          mode: "cors",
        });
        const data1 = await response1.json();
        console.log(data1);
        let type1 = "rejected leave";
        if (data1) {
          rejected_leave = data1.map((item, index) => ({
            type: type1,
            value: item.Leave_id,
            description: item.Leave_Type,
          }));
        }
        const response2 = await fetch(`http://localhost:8000/${uri2}`, {
          mode: "cors",
        });
        const data2 = await response2.json();
        console.log(data2);
        let type2 = "rejected po";
        if (data2) {
          rejected_polist = data2.map((item, index) => ({
            type: type2,
            value: item,
            description: "PO Request",
          }));
        }
        props.setCards([
          ...rejected_prlist,
          ...rejected_polist,
          ...rejected_leave,
        ]);
        setOriginalList([
          ...rejected_prlist,
          ...rejected_polist,
          ...rejected_leave,
        ]);
        // console.log(approved_prlist.concat(approved_leave));
        // props.setCards(rejected_leave.concat(rejected_prlist));
        // setOriginalList(rejected_leave.concat(rejected_prlist));
      } catch (e) {
        console.log(e);
      }
    }

    // if (props.activeTab == "Pending") uri = "qpmc_pending_pr";
    // if (props.activeTab == "Approved") uri = "qpmc_approved_pr_list_mongo";
    // if (props.activeTab == "Rejected") uri = "qpmc_rejected_pr_list_mongo";
    // if (uri != "") {
    //   try {
    //     const response = await fetch(`http://localhost:8000/${uri}`, {
    //       mode: "cors",
    //     });
    //     const data = await response.json();
    //     let type = "";
    // if (props.activeTab == "Pending") {
    //   type = "Pending Request";
    //   if (data && data.pending_pr) {
    //     props.setCards(
    //       data.pending_pr.map((data, index) => ({
    //         type: type,
    //         value: data,
    //       }))
    //     );
    //   }
    // }
    // if (props.activeTab == "Approved") {
    //   props.setCards(
    //     data.map((item, index) => ({
    //       value: item,
    //     }))
    //   );
    // }
    // if (props.activeTab == "Rejected") {
    //   props.setCards(
    //     data.map((item, index) => ({
    //       value: item,
    //     }))
    //   );
    // }
    // if (data && data.pending_pr) {
    //   props.setCards(
    //     data.pending_pr.map((data, index) => ({
    //       type: "Pending Request",
    //       value: data,
    //     }))
    //   );
    // }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // } else {
    //   // props.setCards([]);
    // }
  };
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    makeAPICall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.activeTab]);

  useEffect(() => {
    if (searchValue === "") {
      props.setCards(originalList);
    } else {
      props.setCards(
        originalList.filter((card) =>
          card.value.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className="middle-sidebar">
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* Your code goes here */}
        <div
          style={{
            width: "100%",
            height: "100%",
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            paddingTop: "1rem",
            borderRight: "1px solid #dfdfdf",
            // boxShadow:
            //   "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          <span className="middle-navbar-heading">
            {props.activeTab === "Pending"
              ? "Inbox"
              : props.activeTab === "Approved"
              ? "Approved"
              : "Rejected"}
          </span>
          <input
            className="search-input"
            style={{ outline: "none" }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search here..."
          />
          <div className="middle-navbar-filter-container"></div>
          {/* {isSearchMode ? (
            <Form className="nosubmit">
              <input
                className="nosubmit mr-sm-2 search-box"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
              />
            </Form>
          ) : (
            <span className="Notification" onClick={handleClick}>
              Notifications
              
            </span>
          )} */}
          {props.cards.length === 0 ? (
            <div
              style={{
                height: "75%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PuffLoader
                color="#936C29"
                loading={true}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <NotificationItem
              cardItems={props.cards}
              updateIt={props.updateValues}
              // leaveDetail={props.leaveItem}
              tab={props.activeTab}
              setCurrentContent={props.setCurrentContent}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MiddleNavbar;
