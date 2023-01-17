import React, { useEffect, useState } from "react";
import { parseJwt } from "../../helpers/jwt.helper";

import NavBar from "../../componenets/navbar/NavBar";
import ProductCard from "../../componenets/products-card/ProductCard";
import { fetchProducts } from "./Products.services";

import { Button, Grid, Pagination, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const totalItem = 20;

const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const totalPages = Math.floor(totalItem / limit) + 1;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const { sub } = parseJwt(token);

    fetchProducts(token, page, limit, order, sub).then((data) =>
      setProducts(data)
    );
  }, [page, limit, order]);

  const handleSortProducts = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
  };

  const handlePaginationChange = async (event, nextPage) => {
    setPage(nextPage);

    const token = localStorage.getItem("authToken");
    const { sub } = parseJwt(token);
    const data = await fetchProducts(token, nextPage, limit, sub);
    setProducts(data);
  };

  return (
    <>
      <NavBar />
      <Grid container spacing={2} justifyContent="center" display="flex">
        <Grid container item md={1} xs={12} mt="35px">
          Filters
        </Grid>

        <Grid container display="flex" item md={10} xs={12} spacing={3}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </Grid>

        <Grid container item md={1} xs={12} height="32%" mt="35px">
          <Button variant="outlined" onClick={handleSortProducts}>
            Price
            {order === "asc" ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </Button>
          {order === "asc" ? (
            <Typography mt="10px" fontStyle="italic" fontSize="12px" ml="3px">
              ascending order
            </Typography>
          ) : (
            <Typography mt="10px" fontStyle="italic" fontSize="12px" ml="1px">
              descending order
            </Typography>
          )}
        </Grid>
      </Grid>

      <Grid container item margin="15px" justifyContent="center">
        <Pagination
          shape="rounded"
          count={totalPages}
          page={page}
          onChange={handlePaginationChange}
        />
      </Grid>
    </>
  );
};

export default Products;
