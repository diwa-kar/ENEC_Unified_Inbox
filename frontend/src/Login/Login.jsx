import {
  Box,
  Button,
  Chip,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../ReusableComponents/CustomSnackbar/CustomSnackbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [userType, setUserType] = useState([]);
  const navigate = useNavigate();
  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({
    duration: 5000,
    type: "error",
    infomation: "Invalid credentials!!",
  });

  const [toggle, setToggle] = useState(false);

  const setSessionStorageWithExpiry = (key, value, expiryInMinutes) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiryInMinutes * 60 * 60 * 1000,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  };

  const getSessionStorageItem = (key) => {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      sessionStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  const onSave = async () => {
    try {
      if (email !== "" && password !== "") {
        const response = await fetch(`http://localhost:8000/login`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: email,
            password: password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        if (data.message === "Login successful") {
          setSessionStorageWithExpiry("email", data?.user?.username, 1);
          setSessionStorageWithExpiry("password", data?.user?.password, 1);
          const storedEmail = getSessionStorageItem("email");
          const storedPassword = getSessionStorageItem("password");
          await setsnackbarValue({
            ...snackbarValue,
            type: "success",
            infomation: "LoggedIn Successfully !! ",
          });
          await setsnackbarOpen(true);
          setEmail("");
          setPassword("");
          if (storedEmail && storedPassword) {
            navigate("/main-page");
          }
        } else {
          setsnackbarValue({
            ...snackbarValue,
            type: "error",
            infomation: "Invalid Credentials!! ",
          });
          setsnackbarOpen(true);
        }
      } else {
        setsnackbarValue({
          ...snackbarValue,
          type: "error",
          infomation: "Missing out required values!!",
        });
        setsnackbarOpen(true);
      }
    } catch (error) {
      setsnackbarValue({
        ...snackbarValue,
        type: "error",
        infomation: error,
      });
      setsnackbarOpen(true);
    }
  };

  const onCreate = async () => {
    try {
      if (createEmail !== "" && createPassword !== "" && userType.length > 0) {
        const response = await fetch(`http://localhost:8000/register`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            username: createEmail,
            password: createPassword,
            usertype: userType,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        console.log(data);
        if (data?.message) {
          setsnackbarValue({
            ...snackbarValue,
            type: "success",
            infomation: data?.message,
          });
          setsnackbarOpen(true);
        }
        setCreateEmail("");
        setCreatePassword("");
        setUserType([]);
        setEmail("");
        setPassword("");
        setToggle(false);
      } else {
        setsnackbarValue({
          ...snackbarValue,
          type: "error",
          infomation: "Missing out required values!!",
        });
        setsnackbarOpen(true);
      }
    } catch (error) {
      setsnackbarValue({
        ...snackbarValue,
        type: "error",
        infomation: error,
      });
      setsnackbarOpen(true);
    }
  };

  useEffect(() => {
    const storedEmail = getSessionStorageItem("email");
    const storedPassword = getSessionStorageItem("password");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedPassword) {
      setPassword(storedPassword);
    }
    if (storedEmail && storedPassword) {
      navigate("/main-page");
    }
  }, []);
  return (
    <div style={{ overflow: "scroll" }}>
      <Grid container spacing={0} className="login-container">
        <Grid
          item
          xs={12}
          sm={5}
          md={5}
          p={2}
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          justifyContent={"center"}
          sx={{ background: "#a89566" }}
        >
          <Image
            src="https://minimals.cc/assets/illustrations/illustration_dashboard.png"
            fluid
            height={"auto"}
            width={"600px"}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          sx={{
            p: { xs: 2, sm: 2, md: 4, lg: 5 },
          }}
          display="flex"
          alignItems={"center"}
          justifyContent="center"
          flexDirection={"column"}
        >
          {!toggle ? (
            <>
              <Box
                sx={{
                  my: 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Image
                  src="https://media.licdn.com/dms/image/C4D0BAQF5--sx9bcpVA/company-logo_200_200/0/1652781524472?e=2147483647&v=beta&t=LETyKk97tPZ8egJ1PfV3pxl0I7UBF900-qWk7hDbFeU"
                  fluid
                  height={"80px"}
                  width={"80px"}
                />
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  className="text-family"
                >
                  Log In
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  mt={1}
                  className="text-family"
                  color="grey"
                >
                  Enter your email and password to login our account
                </Typography>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ width: { xs: "90%", md: "50%" }, mt: 2 }}
              >
                <FormLabel
                  className="heading6"
                  htmlFor="email"
                  sx={{ m: 0, py: 1, color: "#000" }}
                >
                  Username
                </FormLabel>
                <TextField
                  variant="outlined"
                  id="username"
                  fullWidth
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                  sx={{ width: "100%" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormLabel
                  className="heading6"
                  htmlFor="email"
                  sx={{ m: 0, py: 1, color: "#000" }}
                >
                  Password
                </FormLabel>
                <TextField
                  variant="outlined"
                  id="password"
                  fullWidth
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  sx={{ width: "100%" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{
                  width: { xs: "90%", md: "50%" },
                  my: 2,
                }}
              >
                <Typography
                  color="primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setToggle(true)}
                  fontWeight="500"
                  className="text-family"
                  variant="body2"
                >
                  Register a User?
                </Typography>

                <Typography
                  fontWeight="500"
                  className="text-family"
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    // mb: "14px",
                    color: "primary.main",
                    cursor: "pointer",
                  }}
                  variant="body2"
                >
                  Forgot Password ?
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                className="text-family"
                onClick={onSave}
                sx={{
                  width: "fit-content",
                  color: "#FFF",
                  bgcolor: "#a89566",
                  "&:hover": { bgcolor: "#a89566" },
                }}
              >
                Sign In
              </Button>
            </>
          ) : (
            <>
              <Box
                sx={{
                  my: 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Image
                  src="https://media.licdn.com/dms/image/C4D0BAQF5--sx9bcpVA/company-logo_200_200/0/1652781524472?e=2147483647&v=beta&t=LETyKk97tPZ8egJ1PfV3pxl0I7UBF900-qWk7hDbFeU"
                  fluid
                  height={"80px"}
                  width={"80px"}
                />
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  className="text-family"
                >
                  Sign Up
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  mt={1}
                  className="text-family"
                  color="grey"
                >
                  Create your email and password to Sign up our account
                </Typography>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ width: { xs: "90%", md: "50%" }, mt: 2 }}
              >
                <FormLabel
                  className="heading6"
                  htmlFor="email"
                  sx={{ m: 0, py: 1, color: "#000" }}
                >
                  Username
                </FormLabel>
                <TextField
                  variant="outlined"
                  id="username"
                  fullWidth
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                  sx={{ width: "100%" }}
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                />
                <FormLabel
                  className="heading6"
                  htmlFor="email"
                  sx={{ m: 0, py: 1, color: "#000" }}
                >
                  Password
                </FormLabel>
                <TextField
                  variant="outlined"
                  id="password"
                  fullWidth
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  sx={{ width: "100%" }}
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                />
                <FormLabel
                  className="heading6"
                  htmlFor="email"
                  sx={{ m: 0, py: 1, color: "#000" }}
                >
                  Choose User Type
                </FormLabel>

                <FormControl sx={{ width: "100%" }}>
                  <Select
                    // labelId="demo-multiple-chip-label"
                    // id="demo-multiple-chip"
                    multiple
                    size="medium"
                    displayEmpty
                    // label="Choose UserType"
                    value={userType}
                    onChange={(e) => {
                      setUserType(e.target.value);
                    }}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return (
                          <span style={{ color: "#ced4da", fontWeight: "300" }}>
                            Choose UserType
                          </span>
                        );
                      }

                      return (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} sx={{ p: 0 }} />
                          ))}
                        </Box>
                      );
                    }}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      <em style={{ color: "grey" }}>Choose UserType</em>
                    </MenuItem>
                    {["PR", "PO", "INVOICE", "SES"].map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                  width: { xs: "90%", md: "50%" },
                  my: 2,
                }}
              >
                <Typography
                  color="primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setToggle(false)}
                  fontWeight="500"
                  className="text-family"
                  variant="body2"
                >
                  Existing User?
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                className="text-family"
                onClick={onCreate}
                sx={{
                  width: "fit-content",
                  color: "#FFF",
                  bgcolor: "#a89566",
                  "&:hover": { bgcolor: "#a89566" },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Grid>
      </Grid>
      <CustomSnackbar
        open={snackbarOpen}
        setOpen={setsnackbarOpen}
        snackbarValue={snackbarValue}
      />
    </div>
  );
};

export default Login;
