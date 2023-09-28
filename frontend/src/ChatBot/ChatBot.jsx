import React, { useState, useRef, useEffect } from "react";
import "./ChatBot.css";
import Close from "./Close.png";
import ExternalLink from "./link-light.svg";
import ExternalLinkDark from "./link-dark.svg";
import send from "./Sent-1.png";
import sendDark from "./send-dark.png";
import UserIcon from "./user.png";
import UserIconDark from "./user-dark.png";
import Button from "@mui/material/Button";
import ChatBotLogo from "./chatbot-ui.png";

// Charts
import Chart from "react-apexcharts";

// in all pages
// it request
// main pages
// pending
// approved
// rejected
// view the pr in detailed manner

const ChatBot = () => {
  const [form, setForm] = useState({
    username: JSON.parse(sessionStorage.getItem("email")).value,
  });

  const [chat, setChat] = useState([
    /*    {
      sender: "bot",
      sender_id: "Name",
      msg: "Hi I am a ChatBot. How may I help you?!",
      chat_id: 2,
      actions: ["PR 100001232", "Item No 260"],
      links: [
        {
          link: "https://chat.openai.com/",
          tag: "ChatGPT",
        },
        {
          link: "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Corporate%20Attire%20Policy.pdf?csf=1&web=1&e=nhNR98",
          tag: "Corporate attire",
        },
        {
          link: "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Overtime%20Policy.pdf?csf=1&web=1&e=gy7927",
          tag: "Over-time",
        },
      ],
      details: {
        showButtons: 1,
        data: { "Pending Request Number": "DFUIVFIEVWIF" },
        type: "PL"
      },
      donutChart: {
        "Marketing Expense": 67854,
        "Operational Expense": 99794,
        "Research Expense": 76803,
        "Capital Expense": 557890,
      },
      cards: [
        {
          title: "Commision Revenue",
          year: "2018",
          value: "458790",
        },
      ],
    }, */
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [chatIDCounter, setChatIDCounter] = useState(1);
  const [darkMode] = useState(false);
  const [chatBotOpen, setChatBotOpen] = useState(false);
  const [viewMoreState, setViewMoreState] = useState({
    id: 0,
    count: 10,
  });

  const chatScreenContent = useRef();

  var floor = Math.floor,
    abs = Math.abs,
    log = Math.log,
    round = Math.round,
    min = Math.min;
  var abbrev = ["K", "M", "B"]; // abbreviations in steps of 1000x; extensible if need to edit

  function rnd(n, precision) {
    var prec = 10 ** precision;
    return round(n * prec) / prec;
  }

  function NumberFormat(n) {
    var base = floor(log(abs(n)) / log(1000));
    var suffix = abbrev[min(abbrev.length - 1, base - 1)];
    base = abbrev.indexOf(suffix) + 1;
    return suffix ? rnd(n / 1000 ** base, 2) + suffix : "" + n;
  }

  useEffect(() => {
    if (chatScreenContent.current)
      chatScreenContent.current.scrollTop =
        chatScreenContent.current.scrollHeight;
  }, [chat, chatBotOpen]);

  useEffect(() => {
    if (inputMessage !== "") setUserTyping(true);
    else setUserTyping(false);
  }, [inputMessage]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (inputMessage === "") return;

    const name = "shreyas";
    const request_temp = {
      sender: "user",
      sender_id: name,
      msg: inputMessage,
      chat_id: chatIDCounter,
      actions: [],
      links: [],
      details: { showButtons: false, data: {} },
    };

    setChat((chat) => [...chat, request_temp]);
    setChatIDCounter(chatIDCounter + 1);
    setBotTyping(true);
    setInputMessage("");
    rasaAPI(name, inputMessage);
  };
  const handleButtonRequest = (actionValue) => {
    setUserTyping(false);

    const name = "shreyas";
    const request_temp = {
      sender: "user",
      sender_id: name,
      chat_id: chatIDCounter,
      msg: actionValue,
      actions: [],
      links: [],
      details: { showButtons: false, data: {} },
    };

    setChat((chat) => [...chat, request_temp]);
    setChatIDCounter(chatIDCounter + 1);
    setBotTyping(true);
    rasaAPI(name, actionValue);
  };
  const rasaAPI = async function handleClick(name, msg) {
    await fetch("http://localhost:5005/webhooks/rest/webhook", {
      method: "POST",
      // mode: "cors",
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      //   charset: "UTF-8",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      // },
      // credentials: "same-origin",
      body: JSON.stringify({
        sender: name,
        message: msg,
        metadata: form,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          console.log(response[0]);
          const temp = response[0];
          const recipient_id = "";
          let recipient_msg;
          let response_temp;
          try {
            recipient_msg = JSON.parse(temp["text"]);
            response_temp = {
              sender: "bot",
              recipient_id: recipient_id,
            };
            if (recipient_msg["msg"])
              response_temp["msg"] = recipient_msg["msg"];

            if (recipient_msg["requests"])
              response_temp["actions"] = recipient_msg["requests"];

            if (recipient_msg["links"])
              response_temp["links"] = recipient_msg["links"];

            if (recipient_msg["details"]) {
              if (recipient_msg["details"]["flag"]) {
                console.log(recipient_msg);
                response_temp["details"] = {
                  showButtons: recipient_msg["details"]["flag"] ? true : false,
                  data: recipient_msg["details"]["data"],
                  type: recipient_msg["details"]["type"],
                };
              } else
                response_temp["details"] = {
                  data: recipient_msg["details"]["data"],
                };
            }

            if (recipient_msg["donut"])
              response_temp["donutChart"] = recipient_msg["donut"];

            if (recipient_msg["pie"])
              response_temp["pieChart"] = recipient_msg["pie"];

            if (recipient_msg["line"])
              response_temp["lineChart"] = recipient_msg["line"];

            if (recipient_msg["cards"])
              response_temp["cards"] = recipient_msg["cards"];
          } catch {
            recipient_msg = temp["text"];
            response_temp = {
              sender: "bot",
              recipient_id: recipient_id,
              msg: recipient_msg,
              chat_id: chatIDCounter,
              actions: [],
              links: [],
              details: { showButtons: false, data: {} },
            };
          }
          console.log(response_temp);
          setBotTyping(false);
          setUserTyping(false);
          console.log(chat);
          setChat((chat) => [...chat, response_temp]);
          setChatIDCounter(chatIDCounter + 1);
          // scrollBottom();
        }
      });
  };
  // Line Charts
  function displayDonut(values) {
    const labels = [];
    const series = [];

    for (const [key, value] of Object.entries(values)) {
      labels.push(key);
      series.push(value);
    }

    const ChartData = {
      series,
      options: {
        chart: {
          type: "donut",
          height: "300px",
          width: "auto",
          background: "transparent",
          horizontalAlign: "left",
        },
        plotOptions: {
          pie: {
            customScale: 1,
            expandOnClick: true,
            donut: {
              size: "62%",
              background: "transparent",
              labels: {
                show: true,
                name: {
                  show: true,
                  formatter: function (val) {
                    return val.split(" ")[0];
                  },
                },
                value: {
                  show: true,
                  fontSize: "15px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "bold",
                  color: darkMode ? "lightcyan" : "rgb(44, 56, 128)",
                  offsetY: 10,
                  formatter: function (val) {
                    return NumberFormat(val);
                  },
                },
                total: {
                  show: true,
                  showAlways: false,
                  label: "Total",
                  fontSize: "16px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  color: darkMode ? "white" : "black",
                  formatter: function (w) {
                    return NumberFormat(
                      w.globals.seriesTotals.reduce((a, b) => {
                        return a + b;
                      }, 0)
                    );
                  },
                },
              },
            },
          },
        },
        labels,
        legend: {
          show: true,
          fontSize: "13px",
          fontWeight: "500",
          position: "bottom",
          letterSpacing: "10px",
          horizontalAlign: "center",
          labels: {
            colors: darkMode ? "#fff" : "#000",
          },
        },
        theme: { mode: "dark", palette: darkMode ? "palette1" : "palette7" },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          formatter: (val, opts) => {
            return NumberFormat(
              opts["w"]["config"]["series"][opts["seriesIndex"]]
            );
          },
          style: {
            fontSize: "10px",
            fontWeight: "bolder",
            fontFamily: "Helvetica, Arial",
            colors: ["white"],
          },
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "round",
          width: 1,
          colors: darkMode ? ["#31314f"] : ["white"],
        },
        total: {
          show: true,
          showAlways: true,
          label: "Total",
          fontSize: "22px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 600,
          color: "#373d3f",
          formatter: function (w) {
            return NumberFormat(
              w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0)
            );
          },
        },
      },
    };
    return (
      <div
        style={{
          width: "100%",
          margin: "5px 0px",
          padding: "5px 0px",
          borderRadius: "6px",
          // background: "rgb(90 89 94 / 18%)",
        }}
      >
        <Chart
          options={ChartData.options}
          series={ChartData.series}
          type="donut"
          height="500px"
          width="100%"
        />
      </div>
    );
  }
  function displayPie(values) {
    const labels = [];
    const series = [];

    for (const [key, value] of Object.entries(values)) {
      labels.push(key);
      series.push(value);
    }

    const ChartData = {
      series,
      options: {
        chart: {
          type: "pie",
          height: "300px",
          width: "auto",
          background: "transparent",
          horizontalAlign: "left",
        },
        plotOptions: {
          pie: {
            customScale: 1,
            expandOnClick: true,
          },
        },
        labels,
        legend: {
          show: true,
          fontSize: "13px",
          fontWeight: "500",
          position: "bottom",
          letterSpacing: "10px",
          horizontalAlign: "center",
          labels: {
            colors: darkMode ? "#fff" : "#000",
          },
        },
        theme: { mode: "dark", palette: darkMode ? "palette1" : "palette7" },
        dataLabels: {
          enabled: true,
          offsetY: 20,
          formatter: (val, opts) => {
            return NumberFormat(
              opts["w"]["config"]["series"][opts["seriesIndex"]]
            );
          },
          style: {
            fontSize: "10px",
            fontWeight: "bolder",
            fontFamily: "Helvetica, Arial",
            colors: ["white"],
          },
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "round",
          width: 1,
          colors: darkMode ? ["#31314f"] : ["white"],
        },
      },
    };
    return (
      <div
        style={{
          width: "100%",
          margin: "5px 0px",
          padding: "5px 0px",
          borderRadius: "6px",
          // background: "rgb(90 89 94 / 18%)",
        }}
      >
        <Chart
          options={ChartData.options}
          series={ChartData.series}
          type="pie"
          height="500px"
          width="100%"
        />
      </div>
    );
    // return <>Hello</>;
  }
  function displayLine(values) {
    const labels = [];
    const data = [];
    for (const [key, value] of Object.entries(values["data"])) {
      labels.push(key);
      data.push(value);
    }

    const ChartData = {
      series: [
        {
          name: values["name"],
          data,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        // legend: {
        //   show: true,
        //   showForSingleSeries: true,
        //   showForNullSeries: true,
        //   showForZeroSeries: true,
        //   offsetY: 10,
        //   fontSize: "13px",
        //   fontWeight: "500",
        //   position: "bottom",
        //   letterSpacing: "10px",
        //   horizontalAlign: "left",
        //   labels: {
        //     colors: darkMode ? "#fff" : "#000",
        //   },
        // },
        theme: {
          monochrome: {
            enabled: true,
            color: "#EA3546",
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return NumberFormat(val);
          },
          offsetX: 2,
          offsetY: -5.5,
          textAnchor: "middle",
          style: {
            fontSize: "9px",
            colors: ["white"],
          },
          background: {
            enabled: true,
            foreColor: "red",
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff",
          },
        },
        title: {
          text: values["title"],
          align: "left",
          style: {
            color: darkMode ? "#fff" : "#000",
            fontSize: "14px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            cssClass: "apexcharts-yaxis-title",
          },
        },
        stroke: {
          curve: "straight",
        },
        markers: {
          size: 4,
          colors: undefined,
          strokeColors: darkMode ? "#fff" : "wheat",
          strokeWidth: 3,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          onClick: undefined,
          onDblClick: undefined,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3,
          },
        },
        // responsive: [
        //   {
        //     breakpoint: 900,
        //     options: {
        //       chart: {
        //         width: "100%",
        //       },
        //     },
        //   },
        // ],
        grid: {
          xaxis: {
            lines: {
              show: false, //or just here to disable only x axis grids
            },
          },
          yaxis: {
            lines: {
              show: false, //or just here to disable only y axis
            },
          },
        },
        xaxis: {
          categories: labels,
          labels: {
            show: true,
            align: "center",
            hideOverlappingLabels: true,
            style: {
              colors: darkMode
                ? Array(labels.length).fill("#fff")
                : Array(labels.length).fill("#000"),
            },
          },
          // title: {
          //   text: values["xlabel"],
          //   rotate: 0,
          //   offsetX: 0,
          //   offsetY: 0,
          //   style: {
          //     color: darkMode ? "#fff" : "#000",
          //     fontSize: "12px",
          //     fontFamily: "Helvetica, Arial, sans-serif",
          //     fontWeight: 600,
          //     cssClass: "apexcharts-yaxis-title",
          //   },
          // },
        },
        yaxis: {
          show: true,
          labels: {
            show: true,
            align: "left",
            hideOverlappingLabels: true,
            offsetY: -5,
            style: {
              colors: darkMode ? ["#fff"] : ["#000"],
            },
            formatter: (value) => {
              console.log(value);
              return NumberFormat(value);
            },
          },
          floating: true,
          // title: {
          //   text: values["name"],
          //   rotate: 270,
          //   offsetX: 75,
          //   offsetY: 0,
          //   style: {
          //     color: darkMode ? "#fff" : "#000",
          //     fontSize: "12px",
          //     fontFamily: "Helvetica, Arial, sans-serif",
          //     fontWeight: 600,
          //     cssClass: "apexcharts-yaxis-title",
          //   },
          // },
        },
      },
    };
    return (
      <div
        className="chatscreen-lineChart"
        style={{
          padding: "5px 5px 0px 10px",
          borderRadius: "6px",
          // background: "rgb(90 89 94 / 18%)",
        }}
      >
        <Chart
          options={ChartData.options}
          series={ChartData.series}
          type="line"
          height="350px"
          width="100%"
        />
      </div>
    );
  }

  return (
    <div
      className="chatbot-container"
      style={{
        width: chatBotOpen ? "30vw" : "",
        height: chatBotOpen ? "85vh" : "",
        right: chatBotOpen ? "4px" : "35px",
        bottom: chatBotOpen ? "10px" : "35px",
      }}
    >
      {chatBotOpen ? (
        <div className="chatscreen-container">
          <div
            className="chatscreen-header"
            style={{
              background: "#A89566",
            }}
          >
            <div className="chatscreen-header-logo">
              {/* darkMode ? DigiverzLogoDark : DigiverzLogo */}
              {/* <img src={ChatBotGIF} alt="Logo" /> */}
              <span>Web Assist</span>
            </div>
            {/* <div className="chatscreen-header-menu">
        <img src={DigiverzMenu} alt="Logo" />
      </div> */}
            <div className="chatscreen-header-mode">
              <img
                src={Close}
                alt="Logo"
                onClick={() => setChatBotOpen(false)}
              />
            </div>
          </div>
          <div
            className="chatscreen-content"
            ref={chatScreenContent}
            style={{
              background: "white",
              overflowX: "hidden",
            }}
          >
            {chat.map((chatContent, index) => {
              return (
                <div
                  key={index}
                  style={{
                    justifyContent:
                      chatContent.sender === "bot" ? "flex-start" : "flex-end",
                    marginTop: chatContent.sender === "bot" ? "1%" : "",
                    marginLeft: chatContent.sender === "bot" ? "1%" : "",
                  }}
                  className="chartscreen-content-text"
                >
                  {chatContent.sender === "bot" ? (
                    <span className="chatscreen-content-icon">
                      <img alt="" src={ChatBotLogo} />
                    </span>
                  ) : (
                    <></>
                  )}
                  {/* Chat Contents */}
                  <div
                    className={`chatscreen-content-chat`}
                    style={{
                      alignItems:
                        chatContent.sender === "bot"
                          ? "flex-start"
                          : "flex-end",
                    }}
                  >
                    {chatContent.msg ? (
                      <span
                        className={`chatscreen-content-msg ${
                          chatContent.sender === "bot"
                            ? "arrow-left"
                            : "arrow-right"
                        }`}
                        style={{
                          marginLeft:
                            chatContent.sender === "bot" ? "1rem" : "",
                          marginRight:
                            chatContent.sender === "bot" ? "" : "1rem",
                          background:
                            chatContent.sender === "bot"
                              ? "#F0F0F0"
                              : "#A89566",
                          textAlign:
                            chatContent.sender === "bot" ? "left" : "right",
                          paddingLeft:
                            chatContent.sender === "bot" ? "12px" : "",
                          paddingRight:
                            chatContent.sender === "bot" ? "" : "12px",
                          color: chatContent.sender === "bot" ? "#000" : "",
                        }}
                      >
                        {chatContent.msg}
                      </span>
                    ) : (
                      <></>
                    )}

                    {chatContent.links ? (
                      <div className="chatscreen-content-links">
                        {chatContent.links.map((link, linkIndex) => (
                          <a
                            href={link.link}
                            target="_blank"
                            style={{
                              color: darkMode ? "white" : "",
                              gridColumn:
                                chatContent.links.length < 6 ? "span 2" : "",
                            }}
                            rel="noreferrer"
                          >
                            {link.tag}
                            <img
                              src={darkMode ? ExternalLinkDark : ExternalLink}
                              alt=""
                            />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}

                    {chatContent.actions ? (
                      <div
                        className="chatscreen-content-actions"
                        style={{
                          justifyContent:
                            chatContent.sender === "bot"
                              ? "flex-start"
                              : "flex-end",
                        }}
                      >
                        {chatContent.actions
                          .slice(
                            0,
                            chatContent.chat_id === viewMoreState.id
                              ? viewMoreState.count
                              : 10
                          )
                          .map((action, actionIndex) => (
                            <Button
                              variant={"contained"}
                              key={actionIndex}
                              size="small"
                              sx={{
                                borderColor: darkMode ? "transparent" : "",
                                backgroundColor: darkMode ? "#15357e" : "",
                              }}
                              style={{
                                margin: "5px 10px 5px 0px",
                                textTransform: "capitalize",
                                letterSpacing: "0.4px",
                                fontSize: "10px",
                                fontWeight: "550",
                              }}
                              color="error"
                              onClick={(e) => {
                                handleButtonRequest(action);
                              }}
                            >
                              {action}
                            </Button>
                          ))}
                        {chatContent.actions.length > 0 ? (
                          <Button
                            variant={"contained"}
                            size="small"
                            style={{
                              margin: "5px 10px 5px 0px",
                              textTransform: "capitalize",
                              letterSpacing: "0.4px",
                              fontSize: "10px",
                              fontWeight: "550",
                            }}
                            sx={{
                              borderColor: darkMode ? "transparent" : "",
                              backgroundColor: darkMode ? "#15357e" : "",
                            }}
                            color="error"
                            onClick={(e) => {
                              chatContent.chat_id === viewMoreState.id
                                ? setViewMoreState({
                                    ...viewMoreState,
                                    count: viewMoreState.count + 10,
                                  })
                                : setViewMoreState({
                                    id: chatContent.chat_id,
                                    count: 20,
                                  });
                            }}
                          >
                            View More
                          </Button>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                    {chatContent.details &&
                    chatContent.details.data &&
                    Object.keys(chatContent.details.data).length > 0 ? (
                      <div
                        className="chatscreen-content-details"
                        style={{
                          background: "rgb(90 89 94 / 18%)",
                        }}
                      >
                        {Object.keys(chatContent.details.data).map(
                          (key, detailsIndex) => (
                            <div>
                              <span
                                style={{
                                  color: "#820000",
                                }}
                              >
                                {key}
                              </span>
                              <span
                                style={{
                                  margin: "0px 4px",
                                  color: darkMode ? "lightskyblue" : "",
                                }}
                              >
                                :
                              </span>
                              <span
                                style={{
                                  color: darkMode ? "#e5ebff" : "",
                                }}
                              >
                                {chatContent.details.data[key]}
                              </span>
                            </div>
                          )
                        )}
                        {chatContent.details.showButtons ? (
                          <div
                            className="chatscreen-content-details-buttons"
                            style={{
                              display: "flex",
                              width: "100%",
                              padding: "5px 0px",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                            }}
                          >
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
                                width: "30%",
                              }}
                              color="success"
                              onClick={(e) => {
                                console.log(chatContent.details.type);
                                if (chatContent.details.type === "PR")
                                  handleButtonRequest(
                                    `Approve PR ${chatContent.details.data["Purchase Requisition Number"]}`
                                  );
                                else if (chatContent.details.type === "PL")
                                  handleButtonRequest(
                                    `Approve PL ${chatContent.details.data["Leave Id"]}`
                                  );
                              }}
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
                                width: "30%",
                              }}
                              color="error"
                              onClick={(e) => {
                                console.log(chatContent.details.type);
                                if (chatContent.details.type === "PR")
                                  handleButtonRequest(
                                    `Reject PR ${chatContent.details.data["Purchase Requisition Number"]}`
                                  );
                                else if (chatContent.details.type === "PL")
                                  handleButtonRequest(
                                    `Reject PL ${chatContent.details.data["Leave Id"]}`
                                  );
                              }}
                            >
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                    {chatContent.donutChart ? (
                      displayDonut(chatContent.donutChart)
                    ) : (
                      <></>
                    )}
                    {chatContent.pieChart ? (
                      displayPie(chatContent.pieChart)
                    ) : (
                      <></>
                    )}
                    {chatContent.lineChart ? (
                      displayLine(chatContent.lineChart)
                    ) : (
                      <></>
                    )}
                    {chatContent.cards ? (
                      <div className="chatscreen-content-cards-container">
                        {chatContent.cards.map((card, index) => {
                          return (
                            <div
                              class="basic-column"
                              style={{
                                width: "100%",
                                marginBottom: "10px",
                                marginTop: "10px",
                              }}
                            >
                              <div class="tag-wrapper">
                                <div
                                  class="number-card number-card-content2"
                                  style={{
                                    backgroundImage: darkMode
                                      ? "-webkit-linear-gradient(270deg, #7042bf, #3023ae)"
                                      : "rgb(0,27,74)",
                                  }}
                                >
                                  <div class="number-card-title">
                                    {card.title}
                                  </div>
                                  <div class="number-card-divider"></div>
                                  <h1 class="number-card-number">
                                    {NumberFormat(card.value)}
                                  </h1>
                                  <div class="number-card-progress-wrapper">
                                    <div class="tagline number-card-currency">
                                      {card.year}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/* -------------------- */}
                  {chatContent.sender === "user" ? (
                    <></>
                  ) : (
                    // <span className="chatscreen-content-icon">
                    //   <img alt="" src={darkMode ? UserIconDark : UserIcon} />
                    // </span>
                    <></>
                  )}
                </div>
              );
            })}
          </div>
          <div
            className="chatscreen-typing-container"
            style={{
              justifyContent: botTyping ? "flex-start" : "flex-end",
              background: "white",
            }}
          >
            {botTyping ? (
              <span
                className="chatscreen-typing-icon"
                style={{
                  opacity: userTyping || botTyping ? "1" : "0",
                }}
              >
                <img
                  alt=""
                  src={ChatBotLogo}
                  style={{
                    opacity: botTyping ? "1" : "0",
                  }}
                />
              </span>
            ) : (
              <></>
            )}
            <div
              className="chatscreen-typing"
              style={{
                opacity: userTyping || botTyping ? "1" : "0",
              }}
            >
              <span
                className="chatscreen-typing-dots"
                style={{
                  background: darkMode ? "white" : "#820000",
                }}
              ></span>
              <span
                className="chatscreen-typing-dots"
                style={{
                  background: darkMode ? "white" : "#820000",
                }}
              ></span>
              <span
                className="chatscreen-typing-dots"
                style={{
                  background: darkMode ? "white" : "#820000",
                }}
              ></span>
            </div>
            {botTyping ? (
              <></>
            ) : (
              <span className="chatscreen-typing-icon">
                <img
                  alt=""
                  src={darkMode ? UserIconDark : UserIcon}
                  style={{
                    opacity: userTyping ? "1" : "0",
                  }}
                />
              </span>
            )}
          </div>
          <div className="chatscreen-footer" style={{}}>
            <form onSubmit={handleSubmit}>
              <div className="chatscreen-footer-input">
                <input
                  type="text"
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                  }}
                  id="standard-required"
                  className="chatscreen-input"
                  placeholder="Enter Your Message"
                  disabled={botTyping}
                  value={inputMessage}
                  style={{
                    width: "95%",
                    height: "3rem",
                    boxShadow: "none",
                  }}
                />
                {/* <TextField
              onChange={(e) => {
                setInputMessage(e.target.value);
              }}
              id="standard-required"
              disabled={botTyping}
              value={inputMessage}
              variant="standard"
              sx={{
                ".MuiInput-root": {
                  borderBottom: darkMode
                    ? "1px solid white !important"
                    : "1px solid white !important",
                },
                ":before": {
                  borderBottom: darkMode
                    ? "1px solid white !important"
                    : "1px solid white !important",
                },
                input: {
                  color: darkMode ? "white" : "white",
                },
              }}
              style={{
                width: "90%",
              }}
            /> */}
              </div>
              <div className="chatscreen-footer-btn">
                <button type="submit" className="chatscreen-send">
                  <img alt="" src={darkMode ? sendDark : send} />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="chatBot-icon" onClick={() => setChatBotOpen(true)}>
          <img src={ChatBotLogo} alt="Logo" />
        </div>
      )}
    </div>
  );
};
export default React.memo(ChatBot);
