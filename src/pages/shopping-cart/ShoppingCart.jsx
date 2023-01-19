import { Grid } from "@mui/material";
import React from "react";
import { parseJwt } from "../../helpers/jwt.helper";
import { fetchProducts } from "../products/Products.services";
import { useState, useEffect } from "react";

import Cart from "../../componenets/cart/Cart";

import NavBar from "../../componenets/navbar/NavBar";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const { sub } = parseJwt(token);

    fetchProducts(token, page, limit, sub).then((data) => setProducts(data));
  }, [page, limit]);

  return (
    <>
      <NavBar />
      <Grid container display="flex" item md={9.5}>
        {products.map((product) => (
          <Cart key={product.id} {...product} />
        ))}
      </Grid>
    </>
  );
};

export default ShoppingCart;
