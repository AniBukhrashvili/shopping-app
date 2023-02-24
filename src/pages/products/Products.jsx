import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";

import NavBar from "../../componenets/navbar/NavBar";
import ProductCard from "../../componenets/products-card/ProductCard";
import ProductFilter from "../../componenets/product-filter/ProductsFilter";
import { fetchProducts } from "./Products.services";

import {
  Button,
  Grid,
  Pagination,
  Typography,
  IconButton,
  Box,
  Input,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";

const totalItem = 20;

const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [order, setOrder] = useState(null);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const totalPages = Math.floor(totalItem / limit) + 1;

  const debouncedSearchProducts = useCallback(
    debounce(async (name, page, limit, order, max, min) => {
      const token = localStorage.getItem("authToken");

      fetchProducts(token, name, page, limit, order, max, min).then((data) =>
        setProducts(data)
      );
    }, 400),
    []
  );

  useEffect(() => {
    debouncedSearchProducts(name, page, limit, order, max, min);
  }, [name, page, limit, order, max, min]);

  const handleSortProducts = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
  };

  const handlePaginationChange = async (event, nextPage) => {
    setPage(nextPage);

    const token = localStorage.getItem("authToken");
    const data = await fetchProducts(token, name, nextPage, limit);
    setProducts(data);
  };

  const handleProductsFilter = (max, min) => {
    setMax(max);
    setMin(min);
  };

  return (
    <Box>
      <NavBar />
      <Grid container spacing={2} justifyContent="center" display="flex">
        <Grid container item md={1} xs={12} mt="35px">
          <ProductFilter max={0} min={0} onChange={handleProductsFilter} />
        </Grid>

        <Grid container display="flex" item md={9.5}>
          <Grid container display="flex" item mt="30px" justifyContent="center">
            <Box>
              <Input
                sx={{
                  ml: 1,
                  flex: 1,
                  width: "700px",
                }}
                placeholder="Search"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Box>
          </Grid>

          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </Grid>

        <Grid item md={1} height="32%" mt="35px">
          <Button
            variant="outlined"
            onClick={handleSortProducts}
            sx={{
              borderColor: "#52796f",
              color: "#52796f",
              ":hover": { borderColor: "#255045" },
            }}
          >
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

      <Grid container item justifyContent="center">
        <Pagination
          shape="rounded"
          count={totalPages}
          page={page}
          onChange={handlePaginationChange}
        />
      </Grid>
    </Box>
  );
};

export default Products;
