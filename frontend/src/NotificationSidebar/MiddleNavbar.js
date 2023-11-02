import React, { useEffect, useContext, useState } from "react";
import NotificationItem from "./NotificationItem";
import PuffLoader from "react-spinners/PuffLoader";
import { ValueContext } from "../LandingPage/MainPage";
import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { FiFilter } from "react-icons/fi";

const MiddleNavbar = (props) => {
  console.log("Cards", props.cards);
  const showTab = useContext(ValueContext);
  const [originalList, setOriginalList] = useState([]);
  const [type, setType] = useState("All");
  const [filterUser, setFilterUser] = useState("All");
  const [filterDate, setFilterDate] = useState("");

  const [anchorEl3, setAnchorEl3] = useState(null);
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const makeAPICall = async () => {
    const dates = [
      "2023-10-16",
      "2023-10-17",
      "2023-10-18",
      "2023-10-19",
      "2023-10-20",
    ];
    const users = ["ABAPER", "GIRISH", "ABAPER1"];
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
    let uri5 = "";
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
    let pending_ses_list = [];
    let approved_ses = [];
    let rejected_ses = [];
    if (props.activeTab === "Pending") {
      uri = "pending_pr_list";
      uri1 = "qpmc_leave_reuqest_sf";
      uri2 = "IT_ticket_list";
      uri3 = "pending_po_list";
      uri4 = "Pending_invoice_list";
      uri5 = "ENEC_Pending_SES_List";

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
              value: data.PR_NO,
              description: "PR Request",
              date: data.CH_ON,
              createdBy: data.CREATED_BY,
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
              date: data["Leave Duration"],
              createdBy: data["Employee Name"],
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
            type: item["Ticket type"],
            value: item["Ticket id"],
            description: "Ticket",
            date: item["Created_date"],
            createdBy: users[Math.floor(Math.random() * users.length)],
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
              value: data.PO_NO,
              description: "PO Request",
              date: data.CREATED_ON,
              createdBy: data.CREATED_BY,
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
              value: data.INVOICE_NO,
              description: "Invoice Request",
              date: data.CREATED_DATE,
              createdBy: data.CREATED_BY,
            };
          });
      } catch (error) {
        console.log(error.message);
      }
      /* --------------------------(Pending Invoice List)----------------------------------------- */

      /* --------------------------(Pending SES List)----------------------------------------- */
      try {
        const response5 = await fetch(`http://localhost:8000/${uri5}`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: username,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data5 = await response5.json();
        console.log("pending_SES_list", data5);
        let type5 = "pending SES";

        pending_ses_list =
          data5 &&
          data5?.map((data, index) => {
            return {
              type: type5,
              value: data?.ENTRYSHEET_NO,
              description: "SES Request",
              date: data.CREATED_ON,
              createdBy: data.CREATED_BY,
            };
          });
      } catch (error) {
        console.log(error.message);
      }
      /* --------------------------(Pending SES List)----------------------------------------- */

      props.setCards([
        ...it_tickets,
        ...pending_prlist,
        ...pending_leave,
        ...pending_polist,
        ...pending_invoice_list,
        ...pending_ses_list,
      ]);
      setOriginalList([
        ...it_tickets,
        ...pending_prlist,
        ...pending_leave,
        ...pending_polist,
        ...pending_invoice_list,
        ...pending_ses_list,
      ]);

      showTab.setShowtab(true);
    } else if (props.activeTab === "Approved") {
      uri = "ENEC_approved_pr_list_mongo";
      uri1 = "qpmc_approved_leave_list_mongo";
      uri2 = "ENEC_approved_po_list_mongo";
      uri3 = "ENEC_approved_invoice_list_mongo";
      uri4 = "ENEC_approved_ses_list_mongo";

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
            date: dates[Math.floor(Math.random() * dates.length)],
            createdBy: users[Math.floor(Math.random() * users.length)],
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
            date: dates[Math.floor(Math.random() * dates.length)],
            createdBy: users[Math.floor(Math.random() * users.length)],
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
            date: dates[Math.floor(Math.random() * dates.length)],
            createdBy: users[Math.floor(Math.random() * users.length)],
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
            date: dates[Math.floor(Math.random() * dates.length)],
            createdBy: users[Math.floor(Math.random() * users.length)],
          }));
      } catch (error) {
        console.log(error);
      }
      /* --------------------------(Approved Invoice List)----------------------------------------- */

      /* --------------------------(Approved SES List)----------------------------------------- */

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
        console.log("data4", data4);
        let type4 = "approved SES";

        approved_ses =
          data4 &&
          data4?.map((item, index) => ({
            type: type4,
            value: item.SES_No,
            description: "SES",
            date: item.Date_of_approval,
            createdBy: item.Approved_by,
          }));
      } catch (error) {
        console.log(error);
      }
      /* --------------------------(Approved SES List)----------------------------------------- */

      props.setCards([
        ...approved_prlist,
        ...approved_polist,
        ...approved_leave,
        ...approved_invoice,
        ...approved_ses,
      ]);
      setOriginalList([
        ...approved_prlist,
        ...approved_polist,
        ...approved_leave,
        ...approved_invoice,
        ...approved_ses,
      ]);
    } else if (props.activeTab === "Rejected") {
      uri = "ENEC_rejected_pr_list_mongo";
      uri1 = "qpmc_rejected_leave_list_mongo";
      uri2 = "ENEC_rejected_po_list_mongo";
      uri3 = "ENEC_rejected_invoice_list_mongo";
      uri4 = "ENEC_rejected_ses_list_mongo";

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
            date: dates[Math.floor(Math.random() * dates.length)],
            createdBy: users[Math.floor(Math.random() * users.length)],
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
            date: dates[Math.floor(Math.random() * dates.length)],
            createdBy: users[Math.floor(Math.random() * users.length)],
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
            date: dates[Math.floor(Math.random() * dates.length)],
            createdBy: users[Math.floor(Math.random() * users.length)],
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
            date: dates[Math.floor(Math.random() * dates.length)],
            createdBy: users[Math.floor(Math.random() * users.length)],
          }));
      } catch (error) {
        console.log(error);
      }
      /* --------------------------(Rejected Invoice List)----------------------------------------- */

      /* --------------------------(Rejected SES List)----------------------------------------- */

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
        console.log("Rejected SES", data4);
        let type4 = "rejected SES";

        rejected_ses =
          data4 &&
          data4?.map((item, index) => ({
            type: type4,
            value: item.SES_No,
            description: "SES",
            date: item.Date_of_rejection,
            createdBy: item.Rejected_by,
          }));
      } catch (error) {
        console.log(error);
      }
      /* --------------------------(Rejected SES List)----------------------------------------- */
      props.setCards([
        ...rejected_prlist,
        ...rejected_polist,
        ...rejected_leave,
        ...rejected_invoice,
        ...rejected_ses,
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

  const [choose, setChoose] = useState("none");
  const [filterSort, setFilterSort] = useState("none");
  const [value, setValue] = React.useState("ascending");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function compareAscending(a, b) {
    if (filterSort === "choosesortbyname") {
      if (a.value < b.value) {
        return -1;
      }
      if (a.value > b.value) {
        return 1;
      }
    } else if (filterSort === "choosesortbydate") {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
    } else if (filterSort === "choosesortcreatedby") {
      if (a.createdBy < b.createdBy) {
        return -1;
      }
      if (a.createdBy > b.createdBy) {
        return 1;
      }
    }
    return 0;
  }

  function compareDescending(a, b) {
    if (filterSort === "choosesortbyname") {
      if (a.value > b.value) {
        return -1;
      }
      if (a.value < b.value) {
        return 1;
      }
    } else if (filterSort === "choosesortbydate") {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
    } else if (filterSort === "choosesortcreatedby") {
      if (a.createdBy > b.createdBy) {
        return -1;
      }
      if (a.createdBy < b.createdBy) {
        return 1;
      }
    }
    return 0;
  }

  useEffect(() => {
    let sortedCards = [...props.cards];
    // if (filterSort !== "choosesortbynone") {
    if (value === "ascending") {
      sortedCards.sort(compareAscending);
    } else if (value === "descending") {
      sortedCards.sort(compareDescending);
    }

    if (!areArraysEqual(props.cards, sortedCards)) {
      props.setCards(sortedCards);
    }
  }, [value, props.cards, filterSort]);
  function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  }

  useEffect(() => {
    // Perform initial sorting when the component loads
    let sortedCards = [...props.cards];
    // if (filterSort !== "choosesortbynone") {
    if (value === "ascending") {
      sortedCards.sort(compareAscending);
    } else if (value === "descending") {
      sortedCards.sort(compareDescending);
    }

    props.setCards([...sortedCards]);
    // }
    // else {
    //   props.setCards([...sortedCards]);
    // }
  }, []);

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
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ my: 1, px: 2 }}
          >
            <span className="middle-navbar-heading">
              {props.activeTab === "Pending"
                ? "Inbox"
                : props.activeTab === "Approved"
                ? "Approved"
                : "Rejected"}
            </span>
            <IconButton size="small" onClick={handleClick3} color="primary">
              <FiFilter />
            </IconButton>

            <Menu
              id="msgs-menu"
              anchorEl={anchorEl3}
              keepMounted
              open={Boolean(anchorEl3)}
              onClose={handleClose3}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              transformOrigin={{ horizontal: "left", vertical: "top" }}
              sx={{
                "& .MuiMenu-paper": {
                  width: "250px",
                  right: 0,
                  top: "70px ",
                },
                "& .MuiList-padding": {
                  p: "15px",
                },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <FormControl sx={{ borderBottom: "1px solid black", pb: 1 }}>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    sx={{ p: 0, m: 0 }}
                  >
                    Filter
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={choose}
                    onChange={(e) => setChoose(e.target.value)}
                  >
                    <FormControlLabel
                      value="chooseid"
                      control={<Radio />}
                      label="ID"
                    />
                    <FormControlLabel
                      value="choosetype"
                      control={<Radio />}
                      label="Type"
                    />
                    <FormControlLabel
                      value="choosedate"
                      control={<Radio />}
                      label="Date"
                    />
                    <FormControlLabel
                      value="choosename"
                      control={<Radio />}
                      label="Created By"
                    />
                    <FormControlLabel
                      value="none"
                      control={<Radio />}
                      label="None"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl sx={{ borderBottom: "1px solid black", pb: 1 }}>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    sx={{ my: 1, mx: 0 }}
                  >
                    Sort
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={filterSort}
                    onChange={(e) => setFilterSort(e.target.value)}
                  >
                    <FormControlLabel
                      value="choosesortbyname"
                      control={<Radio />}
                      label="ID"
                    />
                    <FormControlLabel
                      value="choosesortcreatedby"
                      control={<Radio />}
                      label="Created By"
                    />
                    <FormControlLabel
                      value="choosesortbydate"
                      control={<Radio />}
                      label="Date"
                    />
                    <FormControlLabel
                      value="chsoosesortbynone"
                      control={<Radio />}
                      label="None"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              {filterSort !== "chsoosesortbynone" &&
                (filterSort === "choosesortbyname" ||
                filterSort === "choosesortbydate" ||
                filterSort === "choosesortcreatedby" ? (
                  <Box display="flex" flexDirection={"column"}>
                    <FormLabel sx={{ py: 1, m: 0 }}>
                      Sort By{" "}
                      {filterSort === "choosesortbyname"
                        ? "Name"
                        : filterSort === "choosesortbydate"
                        ? "Date"
                        : filterSort === "choosesortcreatedby"
                        ? "Created By"
                        : ""}
                      :
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="ascending"
                          control={<Radio />}
                          label="Ascending"
                        />
                        <FormControlLabel
                          value="descending"
                          control={<Radio />}
                          label="Descending"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                ) : (
                  ""
                ))}

              {/* <FormLabel sx={{ py: 1, m: 0 }}>Choose Type:</FormLabel>
              <FormControl sx={{ width: "100%" }} size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={type}
                  autoWidth
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"PO"}>Purchase Order</MenuItem>
                  <MenuItem value={"PL"}>Leave Request</MenuItem>
                  <MenuItem value={"PR"}>Purchase Requisition</MenuItem>
                  <MenuItem value={"IN"}>Invoice</MenuItem>
                  <MenuItem value={"TCK"}>Ticket</MenuItem>
                </Select>
              </FormControl>
              <Box display="flex" flexDirection={"column"}>
                <FormLabel sx={{ py: 1, m: 0 }}>Sort By:</FormLabel>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="ascending"
                      control={<Radio />}
                      label="Ascending"
                    />
                    <FormControlLabel
                      value="descending"
                      control={<Radio />}
                      label="Descending"
                    />
                  </RadioGroup>
                </FormControl>
              </Box> */}
            </Menu>
          </Box>

          {choose === "choosetype" ? (
            <Box sx={{ px: 2 }}>
              <Autocomplete
                value={type}
                onChange={(event, newValue) => {
                  setType(newValue);
                }}
                id="controllable-states-demo"
                options={[
                  "All",
                  "Purchase Order",
                  "Leave Request",
                  "Purchase Requisition",
                  "Invoice",
                  "Ticket",
                ]}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Choose Type"
                    sx={{ width: "100%" }}
                  />
                )}
              />
            </Box>
          ) : choose === "chooseid" ? (
            <Box sx={{ px: 2 }}>
              <TextField
                className="search-input"
                type="text"
                size="small"
                sx={{ width: "100%", my: 1 }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search here..."
              />
            </Box>
          ) : choose === "choosedate" ? (
            <Box sx={{ px: 2 }}>
              <TextField
                className="search-input"
                size="small"
                type="date"
                sx={{ width: "100%", my: 1 }}
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                placeholder="Search by date"
              />
            </Box>
          ) : choose === "choosename" ? (
            <Box sx={{ px: 2 }}>
              <Autocomplete
                value={filterUser}
                onChange={(event, newValue) => {
                  setFilterUser(newValue);
                }}
                id="controllable-states-demo"
                options={["All", "ABAPER", "ABAPER1", "GIRISH"]}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Choose User"
                    sx={{ width: "100%", border: "1px solid #00A885" }}
                  />
                )}
              />
            </Box>
          ) : choose === "choosesort" ? (
            <Box
              display="flex"
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <FormLabel sx={{ py: 1, m: 0 }}>Sort By:</FormLabel>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="ascending"
                    control={<Radio />}
                    label="Ascending"
                  />
                  <FormControlLabel
                    value="descending"
                    control={<Radio />}
                    label="Descending"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          ) : (
            ""
          )}

          {/* <input
            className="search-input"
            style={{ outline: "none" }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search here..."
          /> */}
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
              cardItems={
                // props.cards
                choose === "none" || choose === "chooseid"
                  ? props.cards
                  : props.cards.filter((e) =>
                      choose === "choosetype"
                        ? e.value.includes(
                            type === "Purchase Order"
                              ? "PO"
                              : type === "Leave Request"
                              ? "PL"
                              : type === "Purchase Requisition"
                              ? "PR"
                              : type === "Invoice"
                              ? "IN"
                              : type === "Ticket"
                              ? "TCK"
                              : ""
                          ) || type === "All"
                        : choose === "choosedate"
                        ? e.date.includes(filterDate)
                        : choose === "choosename"
                        ? e.createdBy === filterUser || filterUser === "All"
                        : ""
                    )
              }
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
