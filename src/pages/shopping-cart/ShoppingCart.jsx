import React, { useState, useEffect } from "react";

import { Box, Grid, Typography } from "@mui/material";

import Cart from "../../componenets/cart/Cart";
import NavBar from "../../componenets/navbar/NavBar";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  const fetchData = async () => {
    const cartResponse = await fetch(
      `http://localhost:8000/user/${userId}/carts/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const cartData = await cartResponse.json();
    const productIds = cartData.map((obj) => obj.productId);
    console.log(cartData);
    const requests = productIds.map(async (id) => {
      const response = await fetch(`http://localhost:8000/products?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data]);
    });
    console.log(requests);
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const deleteCart = async (productId) => {
    const response = await fetch(`http://localhost:8000/carts/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <Box sx={{ backgroundColor: "#e3e8e3" }}>
      <NavBar />
      <Grid container display="flex">
        {products.length > 0 ? (
          products.map((product) => (
            <Cart key={product.id} {...product} deleteCart={deleteCart} />
          ))
        ) : (
          <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h3">Shopping Cart Is Empty</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ShoppingCart;
