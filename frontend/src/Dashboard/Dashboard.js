import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AiFillCheckCircle,
  AiFillFileAdd,
  AiFillMessage,
} from "react-icons/ai";
import { LuFileClock, LuMailPlus } from "react-icons/lu";
import { MdDisplaySettings } from "react-icons/md";
import {
  BsCalendarEvent,
  BsFileEarmarkMedical,
  BsFillXCircleFill,
  BsViewList,
} from "react-icons/bs";
import Charts from "react-apexcharts";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Counter from "./Counter/Counter";
import { FiList } from "react-icons/fi";

import { BeatLoader, ClipLoader } from "react-spinners";
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loader, setLoader] = useState(false);

  const makeApiCall = async (username) => {
    try {
      setLoader(true);
      const response = await fetch(
        "http://localhost:8000/Dashboard_combined_api",
        {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: JSON.parse(username).value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await response.json();
      await setDashboardData(data);
      console.log("Dashboard Stats", data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  useEffect(() => {
    const emailData = sessionStorage?.getItem("email");
    console.log(emailData);
    if (emailData) {
      makeApiCall(emailData);
    }
  }, []);
  const overallStats = [
    {
      total: dashboardData?.Total_pending_req,
      name: "Total Request",
      icon: <LuMailPlus />,
      foreColor: "#4899FF",
      bgColor: "#E8F1FD",
    },
    {
      total: dashboardData?.ticket_count,
      name: "IT Request",
      icon: <MdDisplaySettings />,
      foreColor: "#291BF8",
      bgColor: "#FCEAFF",
    },
    {
      total: dashboardData?.Pending_leave_count,
      name: "Leave Request",
      icon: <BsCalendarEvent />,
      foreColor: "#FFA74E",
      bgColor: "#FFEEDB",
    },
    {
      total: dashboardData?.Pending_pr_count,
      name: "PR Request",
      icon: <BsFileEarmarkMedical />,
      foreColor: "#58D365",
      bgColor: "#EBffED",
    },
    {
      total: dashboardData?.pending_po_count,
      name: "PO Request",
      icon: <BsViewList />,
      foreColor: "#4899FF",
      bgColor: "#E8F1FD",
    },
    {
      total: dashboardData?.Pending_Invoice_count,
      name: "Invoice",
      icon: <AiFillFileAdd />,
      foreColor: "#291BF8",
      bgColor: "#FCEAFF",
    },
    {
      total: dashboardData?.Pending_SES_Ccount,
      name: "SES Request",
      icon: <FiList />,
      foreColor: "#58D365",
      bgColor: "#EBffED",
    },
  ];
  const overallStats1 = [
    {
      total: dashboardData?.Total_approved_count,
      name: "Approved",
      icon: <AiFillCheckCircle />,
      foreColor: "#17c964",
      bgColor: "#D4FEE7",
    },
    {
      total: dashboardData?.Total_Rejected_count,
      name: "Rejected",
      icon: <BsFillXCircleFill />,
      foreColor: "#FF0000",
      bgColor: "#FED6D4",
    },
  ];

  const chartSeries = [
    {
      name: "Opened Requests",
      data:
        dashboardData?.Bar_chart_data?.Opened_requests.length === 0
          ? []
          : dashboardData?.Bar_chart_data?.Opened_requests,
    },
    {
      name: "Closed Requests",
      data:
        dashboardData?.Bar_chart_data?.Closed_requests.length === 0
          ? []
          : dashboardData?.Bar_chart_data?.Closed_requests,
    },
  ];
  const chartOptions = {
    chart: {
      type: "bar",
      height: 200,
      stacked: true,
      width: "100%",
      stackType: "100%",
    },
    colors: ["#3D5AF1", "#C5C5FF"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    xaxis: {
      categories: ["Invoice", "PO", "PR", "SES", "Ticket"],
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        endingShape: "rounded",
        borderRadius: 10,
      },
    },
    grid: {
      show: false, // Disable horizontal grid lines
    },
    legend: {
      position: "bottom",
      offsetX: 0,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
  };

  const areaSeries = [
    {
      name: "Opened Requests",
      data:
        dashboardData?.Bar_chart_data?.Opened_requests.length === 0
          ? []
          : dashboardData?.Bar_chart_data?.Opened_requests,
    },
    {
      name: "Closed Requests",
      data:
        dashboardData?.Bar_chart_data?.Closed_requests.length === 0
          ? []
          : dashboardData?.Bar_chart_data?.Closed_requests,
    },
  ];
  const areaOption = {
    colors: ["#B6D3FA", "#DBA362"],
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: ["Invoice", "PO", "PR", "SES", "Ticket"],
    },
  };

  const donutSeries = dashboardData?.Donut_chart_data
    ? Object.values(dashboardData?.Donut_chart_data)
    : [];
  const donutOption = {
    chart: {
      type: "donut",
      height: 300,
    },
    dataLabels: {
      enabled: false,
    },
    // legend: {
    //   position: "bottom",
    //   offsetX: 0,
    // },
    labels: [
      "Purchase Requisition",
      "Purchase Order",
      "Invoice",
      "SES",
      "Leave Request",
    ],
    legend: {
      show: true,
      customLegendItems: [
        "Purchase Requisition",
        "Purchase Order",
        "Invoice",
        "SES",
        "Leave Request",
      ],
      position: "bottom",
      verticalAlign: "bottom",
      align: "center",
    },

    colors: [
      "#000075",
      "#0000A3",
      "#0000D1",
      "#0000FF",
      "#5C5CFF",
      "#8A8AFF",
      "#C5C5FF",
      "#E4E4FF",
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const [tickets, setTickets] = useState([
    {
      no: "PR 20004259",
      type: "PR",
      name: "Ahmed Al Said",
      date: "2023-09-10",
      ageing: "Low",
    },
    {
      no: "PR 20004259",
      type: "PR",
      name: "Ahmed Al Said",
      date: "2023-09-10",
      ageing: "Medium",
    },
    {
      no: "PR 20004259",
      type: "PR",
      name: "Ahmed Al Said",
      date: "2023-09-10",
      ageing: "High",
    },
  ]);

  return (
    <Grid container spacing={0} sx={{ background: "#F2F7FE" }}>
      <Grid item xs={12} sm={12} md={8}>
        <Card
          data-aos="zoom-in-up"
          sx={{
            borderRadius: "20px",
            padding: "12px",
            margin: "15px",
            boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "0.925rem",
              lineHeight: "1.5",
              px: 2,
            }}
          >
            Request Overview
          </Typography>
          {/* <Grid container spacing={0}> */}
          <Swiper
            slidesPerView={5}
            // spaceBetween={30}
            // loop={true}
            // pagination={{
            //   clickable: true,
            // }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {overallStats.map((row, index) => {
              return (
                //   <Grid item xs={12} lg={3} sm={6}>
                <SwiperSlide>
                  <CardContent
                    sx={{
                      borderRight: { xs: "0", sm: "1px solid rgba(0,0,0,0.1)" },
                      padding: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        height: "45px",
                        width: "50px",
                        background: row.bgColor,
                        borderRadius: "5px",
                      }}
                    >
                      <IconButton
                        sx={{ color: row.foreColor, fontSize: "28px" }}
                      >
                        {row.icon}
                      </IconButton>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent={"center"}
                      sx={{ mt: 1 }}
                    >
                      {/* {loader ? (
                        <Loading />
                      ) : ( */}
                      {loader ? (
                        <BeatLoader
                          color="#36d7b7"
                          size={9}
                          style={{ marginTop: "5px", marginBottom: "5px" }}
                        />
                      ) : (
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "1.3125rem",
                            lineHeight: "1.5",
                          }}
                        >
                          {row.total ? row.total : 0}
                        </Typography>
                      )}

                      {/* )} */}
                      {/* <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "1.3125rem",
                          lineHeight: "1.5",
                        }}
                      >
                        {row.total ? row.total : 0}
                      </Typography> */}
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.775rem",
                          lineHeight: "1.5",
                        }}
                      >
                        {row.name}
                      </Typography>
                    </Box>
                  </CardContent>
                </SwiperSlide>
                //   </Grid>
              );
            })}
          </Swiper>
          {/* </Grid> */}
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Card
          data-aos="zoom-in-up"
          sx={{
            borderRadius: "20px",
            padding: "12px",
            margin: "15px",
            boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "0.925rem",
              lineHeight: "1.5",
              px: 2,
            }}
          >
            Approvals, Denials and Pending Requests
          </Typography>
          <Grid container spacing={0}>
            {overallStats1.map((row, index) => {
              return (
                <Grid item xs={12} lg={6} sm={6}>
                  <CardContent
                    sx={{
                      borderRight:
                        overallStats1.length - 1 !== index
                          ? { xs: "0", sm: "1px solid rgba(0,0,0,0.1)" }
                          : "",
                      padding: "30px",
                    }}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        height: "45px",
                        width: "50px",
                        background: row.bgColor,
                        borderRadius: "5px",
                      }}
                    >
                      <IconButton
                        sx={{ color: row.foreColor, fontSize: "28px" }}
                      >
                        {row.icon}
                      </IconButton>
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                      {loader ? (
                        <BeatLoader
                          color="#36d7b7"
                          size={9}
                          style={{ marginTop: "5px", marginBottom: "5px" }}
                        />
                      ) : (
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 500,
                            fontSize: "1.3125rem",
                            lineHeight: "1",
                          }}
                        >
                          {row.total ? row.total : 0}
                        </Typography>
                      )}
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.765rem",
                          lineHeight: "1.5",
                        }}
                      >
                        {row.name}
                      </Typography>
                    </Box>
                  </CardContent>
                </Grid>
              );
            })}
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <Card
          data-aos="zoom-in-up"
          sx={{
            borderRadius: "20px",
            padding: "12px",
            margin: "15px",
            boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
            height: "92%",
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "0.925rem",
              lineHeight: "1.5",
              px: 2,
            }}
          >
            Open vs Closed Stats
          </Typography>
          {loader ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              height={"100%"}
            >
              <ClipLoader color="#36d7b7" size={54} />
              <Typography
                variant="caption"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                Fetching Data...
              </Typography>
            </Box>
          ) : (
            <Charts
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={300}
            />
          )}
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Card
          data-aos="zoom-in-up"
          sx={{
            borderRadius: "20px",
            padding: "12px",
            margin: "15px",
            boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
            height: "92%",
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "0.925rem",
              lineHeight: "1.5",
              px: 2,
            }}
          >
            Tickets Summary
          </Typography>
          {loader ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              height={"100%"}
            >
              <ClipLoader color="#36d7b7" size={54} />
              <Typography
                variant="caption"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                Fetching Data...
              </Typography>
            </Box>
          ) : (
            <Charts
              options={areaOption}
              series={areaSeries}
              type="area"
              height={300}
            />
          )}
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Card
          data-aos="zoom-in-up"
          sx={{
            borderRadius: "20px",
            padding: "12px",
            margin: "15px",
            boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
            height: "92%",
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "0.925rem",
              lineHeight: "1.5",
              px: 2,
            }}
          >
            Pending Requests
          </Typography>
          {loader ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              height={"100%"}
            >
              <ClipLoader color="#36d7b7" size={54} />
              <Typography
                variant="caption"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                Fetching Data...
              </Typography>
            </Box>
          ) : (
            <Charts
              options={donutOption}
              series={donutSeries}
              type="donut"
              height={300}
            />
          )}
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <Card
          data-aos="zoom-in-up"
          sx={{
            borderRadius: "20px",
            padding: "12px",
            margin: "15px",
            boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "0.925rem",
              lineHeight: "1.5",
              px: 2,
            }}
          >
            Recent Request
          </Typography>
          <TableContainer
            sx={{ height: "300px" }}
            style={{ padding: 0, boxShadow: "none" }}
            component={Paper}
          >
            <Table sx={{ whiteSpace: { xs: "nowrap", sm: "unset" } }}>
              <TableHead>
                <TableRow>
                  {[
                    "Request No",
                    "Request Type",
                    "Requester Name",
                    "Submission Date",
                    "Ageing",
                  ].map((col) => {
                    return (
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.87rem",
                            lineHeight: "1.5",
                          }}
                        >
                          {col}
                        </Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((row, index) => {
                  return (
                    <>
                      <TableRow key={index}>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 400,
                              fontSize: "0.9rem",
                              lineHeight: "1.5",
                            }}
                          >
                            {row.no}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 400,
                              fontSize: "0.9rem",
                              lineHeight: "1.5",
                            }}
                          >
                            {row.type}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 400,
                              fontSize: "0.9rem",
                              lineHeight: "1.5",
                            }}
                          >
                            {row.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 400,
                              fontSize: "0.9rem",
                              lineHeight: "1.5",
                            }}
                          >
                            {row.date}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            sx={{
                              backgroundColor:
                                row.ageing === "Low"
                                  ? "#D4EFFE"
                                  : row.ageing === "High"
                                  ? "#FED4D4"
                                  : "#FEEDD4",
                              color:
                                row.ageing === "Low"
                                  ? "#00A4FF"
                                  : row.ageing === "High"
                                  ? "#FF0000"
                                  : "#FFB800",
                              borderRadius: "6px",
                              pl: "3px",
                              pr: "3px",
                            }}
                            label={row.ageing}
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
