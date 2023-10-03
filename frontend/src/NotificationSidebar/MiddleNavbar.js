import React, { useEffect, useContext, useState } from "react";
import NotificationItem from "./NotificationItem";
import PuffLoader from "react-spinners/PuffLoader";
import { ValueContext } from "../LandingPage/MainPage";

const MiddleNavbar = (props) => {
  const showTab = useContext(ValueContext);
  const [originalList, setOriginalList] = useState([]);

  const makeAPICall = async () => {
    let user = sessionStorage?.getItem("email");
    let username = "";

    if (user) {
      username = JSON.parse(user)?.value;
    }
    let uri = "";
    let uri1 = "";
    let uri2 = "";
    let uri3 = "";
    let uri4 = "";
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
    let pending_invoice_list = [];
    let approved_invoice = [];
    let rejected_invoice = [];
    if (props.activeTab === "Pending") {
      uri = "pending_pr_list";
      uri1 = "qpmc_leave_reuqest_sf";
      uri2 = "IT_ticket_list";
      uri3 = "pending_po_list";
      uri4 = "Pending_invoice_list";

      /* --------------------------(Pending PR List)----------------------------------------- */
      try {
        const response = await fetch(`http://localhost:8000/${uri}`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: username,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        console.log("PR Data", data);
        let type = "pending pr";

        pending_prlist =
          data &&
          data?.map((data, index) => {
            return {
              type: type,
              value: data,
              description: "PR Request",
            };
          });
      } catch (error) {
        console.log(error.message);
      }

      /* --------------------------(Pending PR List)----------------------------------------- */

      /* --------------------------(Pending Leave List)----------------------------------------- */
      try {
        const response1 = await fetch(`http://localhost:8000/${uri1}`, {
          mode: "cors",
          method: "GET",
        });
        const data1 = await response1.json();
        console.log("Leave List", data1);
        let type1 = "pending leave";

        pending_leave =
          data1 &&
          data1?.map((data, index) => {
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
      } catch (error) {
        console.log(error.message);
      }

      /* --------------------------(Pending Leave List)----------------------------------------- */

      /* --------------------------(IT Ticket List)----------------------------------------- */
      try {
        const response2 = await fetch(`http://localhost:8000/${uri2}`, {
          mode: "cors",
          method: "GET",
        });
        const data2 = await response2.json();
        console.log("IT Ticket List", data2);
        let type2 = "it ticket";

        it_tickets =
          data2 &&
          data2?.map((item, index) => ({
            type: type2,
            value: item,
            description: "Ticket",
          }));
      } catch (error) {
        console.log(error.message);
      }

      /* --------------------------(IT Ticket List)----------------------------------------- */

      /* --------------------------(Pending PO List)----------------------------------------- */
      try {
        const response3 = await fetch(`http://localhost:8000/${uri3}`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: username,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data3 = await response3.json();
        console.log("pending_po_list", data3);
        let type3 = "pending po";

        pending_polist =
          data3 &&
          data3?.map((data, index) => {
            return {
              type: type3,
              value: data,
              description: "PO Request",
            };
          });
      } catch (error) {
        console.log(error.message);
      }

      /* --------------------------(Pending PO List)----------------------------------------- */

      /* --------------------------(Pending Invoice List)----------------------------------------- */
      try {
        const response4 = await fetch(`http://localhost:8000/${uri4}`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: username,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data4 = await response4.json();
        console.log("pending_invoice_list", data4);
        let type4 = "pending invoice";

        pending_invoice_list =
          data4 &&
          data4?.map((data, index) => {
            return {
              type: type4,
              value: data,
              description: "Invoice Request",
            };
          });
      } catch (error) {
        console.log(error.message);
      }
      /* --------------------------(Pending Invoice List)----------------------------------------- */
      props.setCards([
        ...it_tickets,
        ...pending_prlist,
        ...pending_leave,
        ...pending_polist,
        ...pending_invoice_list,
      ]);
      setOriginalList([
        ...it_tickets,
        ...pending_prlist,
        ...pending_leave,
        ...pending_polist,
        ...pending_invoice_list,
      ]);

      showTab.setShowtab(true);
    } else if (props.activeTab === "Approved") {
      uri = "ENEC_approved_pr_list_mongo";
      uri1 = "qpmc_approved_leave_list_mongo";
      uri2 = "ENEC_approved_po_list_mongo";
      uri3 = "ENEC_approved_invoice_list_mongo";

      /* --------------------------(Approved PR List)----------------------------------------- */
      try {
        const response = await fetch(`http://localhost:8000/${uri}`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: username,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        console.log("Approved PR List", data);
        let type = "approved pr";
        approved_prlist =
          data &&
          data?.map((item, index) => ({
            type: type,
            value: item,
            description: "PR Request",
          }));
      } catch (error) {
        console.log(error.message);
      }

      /* --------------------------(Approved PR List)----------------------------------------- */

      /* --------------------------(Approved PO List)----------------------------------------- */
      try {
        const response2 = await fetch(`http://localhost:8000/${uri2}`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: username,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data2 = await response2.json();
        console.log("Approved PO List", data2);
        let type2 = "approved po";

        approved_polist =
          data2 &&
          data2?.map((item, index) => ({
            type: type2,
            value: item,
            description: "PO Request",
          }));
      } catch (error) {
        console.log(error.message);
      }

      /* --------------------------(Approved PO List)----------------------------------------- */

      /* --------------------------(Approved Leave List)----------------------------------------- */

      try {
        const response1 = await fetch(`http://localhost:8000/${uri1}`, {
          mode: "cors",
        });
        const data1 = await response1.json();
        console.log("Approved Leave", data1);
        let type1 = "approved leave";

        approved_leave =
          data1 &&
          data1?.approved_leave_dets?.map((item, index) => ({
            type: type1,
            value: item["Leave_id"],
            description: item["Leave_Type"],
          }));
      } catch (error) {
        console.log(error);
      }

      /* --------------------------(Approved Leave PR List)----------------------------------------- */

      /* --------------------------(Approved Invoice List)----------------------------------------- */
      try {
        const response3 = await fetch(`http://localhost:8000/${uri3}`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: username,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data3 = await response3.json();
        console.log("Approved Invoice", data3);
        let type3 = "approved invoice";

        approved_invoice =
          data3 &&
          data3?.map((item, index) => ({
            type: type3,
            value: item,
            description: "Invoice",
          }));
      } catch (error) {
        console.log(error);
      }
      /* --------------------------(Approved Invoice List)----------------------------------------- */

      props.setCards([
        ...approved_prlist,
        ...approved_polist,
        ...approved_leave,
        ...approved_invoice,
      ]);
      setOriginalList([
        ...approved_prlist,
        ...approved_polist,
        ...approved_leave,
        ...approved_invoice,
      ]);
    }

    if (props.activeTab === "Rejected") {
      uri = "ENEC_rejected_pr_list_mongo";
      uri1 = "qpmc_rejected_leave_list_mongo";
      uri2 = "ENEC_rejected_po_list_mongo";
      uri3 = "ENEC_rejected_invoice_list_mongo";

      /* --------------------------(Rejected PR List)----------------------------------------- */
      try {
        const response = await fetch(`http://localhost:8000/${uri}`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: username,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        console.log("Rejected PR List", data);
        let type = "rejected pr";

        rejected_prlist =
          data &&
          data?.map((item, index) => ({
            type: type,
            value: item,
            description: "PR Request",
          }));
      } catch (error) {
        console.log(error.message);
      }

      /* --------------------------(Rejected PR List)----------------------------------------- */

      /* --------------------------(Rejected Leave List)----------------------------------------- */
      try {
        const response1 = await fetch(`http://localhost:8000/${uri1}`, {
          mode: "cors",
        });
        const data1 = await response1.json();
        console.log("Rejected Leave List", data1);
        let type1 = "rejected leave";

        rejected_leave =
          data1 &&
          data1?.rejected_leave_dets.map((item, index) => ({
            type: type1,
            value: item.Leave_id,
            description: item.Leave_Type,
          }));
      } catch (error) {
        console.log(error.message);
      }

      /* --------------------------(Rejected Leave List)----------------------------------------- */

      /* --------------------------(Rejected PO List)----------------------------------------- */
      try {
        const response2 = await fetch(`http://localhost:8000/${uri2}`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: username,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data2 = await response2.json();
        console.log("Rejected PO", data2);
        let type2 = "rejected po";

        rejected_polist =
          data2 &&
          data2?.map((item, index) => ({
            type: type2,
            value: item,
            description: "PO Request",
          }));
      } catch (error) {
        console.log(error.message);
      }

      /* --------------------------(Rejected PO List)----------------------------------------- */

      /* --------------------------(Rejected Invoice List)----------------------------------------- */
      try {
        const response3 = await fetch(`http://localhost:8000/${uri3}`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: username,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data3 = await response3.json();
        console.log("Rejected Invoice", data3);
        let type3 = "rejected invoice";

        rejected_invoice =
          data3 &&
          data3?.map((item, index) => ({
            type: type3,
            value: item,
            description: "Invoice",
          }));
      } catch (error) {
        console.log(error);
      }
      /* --------------------------(Rejected Invoice List)----------------------------------------- */
      props.setCards([
        ...rejected_prlist,
        ...rejected_polist,
        ...rejected_leave,
        ...rejected_invoice,
      ]);
      setOriginalList([
        ...rejected_prlist,
        ...rejected_polist,
        ...rejected_leave,
        ...rejected_invoice,
      ]);
    }
  };

  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const emailData = sessionStorage?.getItem("email");
    if (emailData) {
      makeAPICall();
    }
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
  }, [searchValue]);

  return (
    <div className="middle-sidebar">
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
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
