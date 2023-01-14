import React, { useEffect, useState } from "react";
import NavBar from "../../componenets/navbar/NavBar";
import { parseJwt } from "../../helpers/jwt.helper";
import ProductCard from "../../componenets/products-card/ProductCard";

import { Grid, Pagination } from "@mui/material";
import { fetchProducts } from "./Products.services";

const totalItem = 20;

const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [products, setProducts] = useState([]);
  const totalPages = Math.floor(totalItem / limit) + 1;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const { sub } = parseJwt(token);

    fetchProducts(token, page, limit, sub).then((data) => setProducts(data));
  }, [page, limit]);

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
      <Grid container display="flex">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
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
