import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to store data in sessionStorage with an expiration time
  const setSessionStorageWithExpiry = (key, value, expiryInMinutes) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiryInMinutes * 60 * 1000, // Expiry time in milliseconds
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  };

  // Function to retrieve data from sessionStorage
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

  const onSave = () => {
    console.log(email, password);
    setSessionStorageWithExpiry("email", email, 15); // Store email with a 15-minute expiration
    setSessionStorageWithExpiry("password", password, 15); // Store password with a 15-minute expiration
    const storedEmail = getSessionStorageItem("email");
    const storedPassword = getSessionStorageItem("password");
    if (storedEmail && storedPassword) {
      navigate("/main-page");
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
            <Typography variant="h5" fontWeight={600} className="text-family">
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
              Email
            </FormLabel>
            <TextField
              variant="outlined"
              id="email"
              fullWidth
              name="email"
              type="email"
              placeholder="Enter Email"
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
            sx={{
              display: {
                xs: "block",
                sm: "flex",
                lg: "flex",
              },
              alignItems: "center",
              width: { xs: "90%", md: "50%" },
              my: 2,
            }}
          >
            <FormGroup sx={{ mr: "auto" }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember this Device"
                className="text-family"
                sx={{
                  mb: 1,
                }}
              />
            </FormGroup>

            <Typography
              fontWeight="500"
              className="text-family"
              sx={{
                display: "block",
                textDecoration: "none",
                mb: "14px",
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;

// https://media.licdn.com/dms/image/C4D0BAQF5--sx9bcpVA/company-logo_200_200/0/1652781524472?e=2147483647&v=beta&t=LETyKk97tPZ8egJ1PfV3pxl0I7UBF900-qWk7hDbFeU
