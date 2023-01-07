import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const NavBar = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("Name");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <Link
              style={{
                margin: "45px",
                textDecoration: "none",
                color: "#fff",
                textAlign: "left",
              }}
              to="/products"
            >
              Products
            </Link>
          </Box>

          <Link
            style={{
              textDecoration: "none",
              color: "#fff",
            }}
            to="/shopping-cart"
          >
            <ShoppingCartCheckoutIcon
              fontSize="large"
              sx={{ marginRight: "20px" }}
            />
          </Link>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
            <Typography sx={{ marginLeft: "10px" }}>Hello, {name}</Typography>
            <ArrowDropDownIcon onClick={handleClick}></ArrowDropDownIcon>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleLogout}>
                Log Out
                <ExitToAppIcon sx={{ marginLeft: "5px" }} />
              </MenuItem>
            </Menu>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
