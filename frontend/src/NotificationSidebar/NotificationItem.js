import React, { useEffect } from "react";
import Ticket from "./Ticket.png";
import Leave from "./Leave.png";
import PR from "./PR.png";
import PO from "./online-shop.png";
import Invoice from "./invoice.png";
import Goods from "./goods.png";
import { Box, Chip } from "@mui/material";

const NotificationItem = (props) => {
  useEffect(() => {
    console.log(props.cardItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemClick = (index, card) => {
    if (
      card.type === "pending pr" ||
      card.type === "approved pr" ||
      card.type === "rejected pr"
    ) {
      props.updateIt(props.cardItems[index]);
      props.setCurrentContent(0);
    } else if (
      card.type === "pending po" ||
      card.type === "approved po" ||
      card.type === "rejected po"
    ) {
      props.updateIt(props.cardItems[index]);
      props.setCurrentContent(0);
    } else if (
      card.type === "pending leave" ||
      card.type === "approved leave" ||
      card.type === "rejected leave"
    ) {
      // console.log(card);
      props.updateIt(card);
    } else if (card.type === "it ticket") {
      // console.log(card);
      props.updateIt(card);
    } else if (
      card.type === "pending invoice" ||
      card.type === "approved invoice" ||
      card.type === "rejected invoice"
    ) {
      // console.log(card);
      props.updateIt(card);
    } else if (
      card.type === "pending SES" ||
      card.type === "approved SES" ||
      card.type === "rejected SES"
    ) {
      // console.log(card);
      props.updateIt(card);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%",
        overflowY: "scroll",
      }}
      className="NotificationItem"
    >
      {props.cardItems &&
        props.cardItems.map((card, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(index, card)}
            style={{
              width: "100%",
              height: "100px",
              display: "flex",
              // flexDirection: "column",
              // justifyContent: "space-evenly",
              alignItems: "center",
              background: "white",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              padding: "8px 10px",
              // paddingLeft: "2rem",
              borderTop: "1px solid #dfdfdf",
              // borderLeft: `4px solid ${
              //   props.tab == "Pending"
              //     ? card.type == "pending leave"
              //       ? "#7CB9E8"
              //       : card.type == "pending pr" ?"goldenrod" : "#FFFD9E"
              //     : props.tab == "Approved"
              //     ? "#00ab00"
              //     : "#da2323"
              // }`,
              cursor: "pointer",
            }}
          >
            <div
              className={`notification-logo ${
                card.type === "pending pr" ||
                card.type === "approved pr" ||
                card.type === "rejected pr"
                  ? "notification-pr"
                  : card.type === "pending leave" ||
                    card.type === "approved leave" ||
                    card.type === "rejected leave"
                  ? "notification-leave"
                  : card.type === "it ticket"
                  ? "notification-it"
                  : card.type === "pending invoice"
                  ? "notification-invoice"
                  : card.type === "pending SES"
                  ? "notification-SES"
                  : ""
              }`}
            >
              <img
                height={"45px"}
                width={"45px"}
                style={{ objectFit: "contain" }}
                src={
                  card.type === "pending pr" ||
                  card.type === "approved pr" ||
                  card.type === "rejected pr"
                    ? PR
                    : card.type === "pending po" ||
                      card.type === "approved po" ||
                      card.type === "rejected po"
                    ? PO
                    : card.type === "pending leave" ||
                      card.type === "approved leave" ||
                      card.type === "rejected leave"
                    ? Leave
                    : card.type === "hardware" || card.type === "software"
                    ? Ticket
                    : card.type === "pending invoice" ||
                      card.type === "approved invoice" ||
                      card.type === "rejected invoice"
                    ? Invoice
                    : card.type === "pending SES" ||
                      card.type === "approved SES" ||
                      card.type === "rejected SES"
                    ? Goods
                    : ""
                }
                alt="Ticket"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "15px",
                  width: "100%",
                  margin: "5px 0px",
                }}
              >
                {card.type === "pending leave" ? (
                  <span style={{ fontWeight: "bold" }}>{card.value}</span>
                ) : (
                  <span style={{ fontWeight: "bold" }}>{card.value}</span>
                )}
              </div>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // px: 1,
                }}
              >
                <span
                  class="notification-description"
                  style={{ fontWeight: "bold" }}
                >
                  {card.createdBy}
                </span>
                <Chip
                  sx={{
                    backgroundColor: "#D4EFFE",
                    color: "#00A4FF",
                    borderRadius: "6px",
                    mx: 1,
                    pl: "3px",
                    pr: "3px",
                    width: "fit-content",
                  }}
                  size="small"
                  label={card.date}
                />
              </Box>

              <span class="notification-description">{card.description}</span>
              {/* <span class="notification-description">{card.date}</span> */}

              {/* {card.type ? (
                <span
                  style={{
                    textAlign: "left",
                    width: "fit-content",
                    padding: "1px 4px",
                    letterSpacing: "0.5px",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "6px",
                    background:
                      card.type === "pending leave"
                        ? "#002D62"
                        : card.type === "pending pr"
                        ? "#820000"
                        : card.type === "approved leave" ||
                          card.type === "approved pr"
                        ? "#00ab00"
                        : card.type === "rejected leave" ||
                          card.type === "rejected pr"
                        ? "#da2323"
                        : card.type === "it ticket"
                        ? "#7D7B00"
                        : "#7D7B00",
                    borderRadius: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  {card.type}
                </span>
              ) : (
                <></>
              )} */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default NotificationItem;
