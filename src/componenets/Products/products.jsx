import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { parseJwt } from "../../helpers/jwt.helper";
import ProductCard from "./ProductsCard/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (token) => {
    const response = await fetch(
      `http://localhost:8000/products?_page=1&_limit=6`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const { sub } = parseJwt(token);

    fetchProducts(token, sub);
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            photos={product.photos[0]}
            title={product.title}
            review={product.review}
            price={product.price}
          />
        ))}
      </div>
    </>
  );
};

export default Products;
