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
import React, { useState } from "react";
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

const Dashboard = () => {
  const overallStats = [
    {
      total: "100",
      name: "Total Request",
      icon: <LuMailPlus />,
      foreColor: "#4899FF",
      bgColor: "#E8F1FD",
    },
    {
      total: "523",
      name: "IT Request",
      icon: <MdDisplaySettings />,
      foreColor: "#291BF8",
      bgColor: "#FCEAFF",
    },
    {
      total: "7239",
      name: "Leave Request",
      icon: <BsCalendarEvent />,
      foreColor: "#FFA74E",
      bgColor: "#FFEEDB",
    },
    {
      total: "5239",
      name: "PR Request",
      icon: <BsFileEarmarkMedical />,
      foreColor: "#58D365",
      bgColor: "#EBffED",
    },
    {
      total: "5239",
      name: "Invoice",
      icon: <AiFillFileAdd />,
      foreColor: "#291BF8",
      bgColor: "#FCEAFF",
    },
  ];
  const overallStats1 = [
    {
      total: "100",
      name: "Approved",
      icon: <AiFillCheckCircle />,
      foreColor: "#17c964",
      bgColor: "#D4FEE7",
    },
    {
      total: "523",
      name: "Rejected",
      icon: <BsFillXCircleFill />,
      foreColor: "#FF0000",
      bgColor: "#FED6D4",
    },
    {
      total: "7239",
      name: "Pending",
      icon: <LuFileClock />,
      foreColor: "#DBA362",
      bgColor: "#FFEEDB",
    },
  ];

  const chartSeries = [
    {
      name: "Opened Requests",
      data: [44, 55, 41, 67, 22, 43, 21, 49],
    },
    {
      name: "Closed Requests",
      data: [13, 23, 20, 8, 13, 27, 33, 12],
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
    colors: ["#3D5AF1", "#95A6FF"],
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
      categories: [
        "2011 Q1",
        "2011 Q2",
        "2011 Q3",
        "2011 Q4",
        "2012 Q1",
        "2012 Q2",
        "2012 Q3",
        "2012 Q4",
      ],
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        endingShape: "rounded",
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
      enabled: false, // Set this to false to hide data labels
    },
  };

  const areaSeries = [
    {
      name: "Opened",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Closed",
      data: [11, 32, 45, 32, 34, 52, 41],
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
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const donutSeries = [44, 55, 41, 17, 15, 41, 17, 15];
  const donutOption = {
    chart: {
      type: "donut",
      height: 300,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      offsetX: 0,
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
      <Grid item xs={12} sm={12} md={7}>
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
            slidesPerView={4}
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
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "1.3125rem",
                          lineHeight: "1.5",
                        }}
                      >
                        {row.total}
                      </Typography>
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
      <Grid item xs={12} sm={12} md={5}>
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
                <Grid item xs={12} lg={4} sm={6}>
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
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "1.3125rem",
                          lineHeight: "1.5",
                        }}
                      >
                        {row.total}
                      </Typography>
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
          <Charts
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={300}
          />
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
            Tickets Summary
          </Typography>
          <Charts
            options={areaOption}
            series={areaSeries}
            type="area"
            height={300}
          />
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
            Recent Submissions
          </Typography>
          <Charts
            options={donutOption}
            series={donutSeries}
            type="donut"
            height={300}
          />
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
