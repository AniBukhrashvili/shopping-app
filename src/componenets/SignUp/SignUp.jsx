import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";
import { Box, TextField, Button, Typography } from "@mui/material";
import "./SignUp.css";

const validationSchema = yup.object({
  fullName: yup
    .string()
    .min(1, "Full Name should be minimum 1 characters length!")
    .required("Full Name is required!"),
  email: yup
    .string()
    .email("Enter a valid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(6, "Password should be minimum 6 characters length!")
    .required("Password is required!"),
});

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      navigate("/");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
        <TextField
          id="outlined-size-small"
          size="small"
          name="fullName"
          label="Full Name"
          sx={{ margin: 0.8, width: "30%" }}
          value={name ? name : formik.values.fullName}
          onChange={(e) => {
            setName(e.target.value);
            formik.handleChange(e);
          }}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />

        <TextField
          id="outlined-size-small"
          size="small"
          name="email"
          label="Email"
          sx={{ margin: 0.8, width: "30%" }}
          value={email ? email : formik.values.email}
          onChange={(e) => {
            setEmail(e.target.value);
            formik.handleChange(e);
          }}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          id="outlined-size-small"
          size="small"
          sx={{ margin: 0.8, width: "30%" }}
          name="password"
          label="Password"
          type="password"
          value={password ? password : formik.values.password}
          onChange={(e) => {
            setPassword(e.target.value);
            formik.handleChange(e);
          }}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button type="submit" sx={{ width: "30%", m: 0.9 }} variant="outlined">
          Register
        </Button>

        <Box sx={{ m: 2 }}>
          <Typography>Already have an account?</Typography>
          <Link to="/" className="link-class-signup">
            Sign In
          </Link>
        </Box>
      </Box>
    </form>
  );
};

export default SignUp;
