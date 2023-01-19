import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error("Email or Password is incorrect");
      }
      const data = await response.json();
      const name = data.user.name;
      const accessToken = data.accessToken;
      const userId = data.user.id;

      localStorage.setItem("Name", name);
      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("userId", userId);

      navigate("/products");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 0.8, width: "30%" },
      }}
      autoComplete="off"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 23,
          justifyContent: "center",
          alignItems: "center",
          m: 20,
        }}
      >
        {error && (
          <Alert
            severity="error"
            sx={{ marginBottom: "6px", width: "27%", fontStyle: "italic" }}
          >
            {error}
          </Alert>
        )}
        <TextField
          id="outlined-size-small"
          label="Email"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-size-small"
          label="Password"
          type="password"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button sx={{ width: "30%", m: 0.9 }} variant="outlined" type="submit">
          Login
        </Button>
        <Box sx={{ m: 2 }}>
          <Typography>Don't have an account?</Typography>
          <Link to="/signup" className="link-class-signin">
            Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
