import React from "react";

import { Button, Rating, Typography, Box } from "@mui/material";
import "./ProductsCard.css";

const ProductCard = (props) => {
  const { id, photos, title, review, price } = props;

  const addToCard = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const ownerId = localStorage.getItem("userId");

      const response = await fetch("http://localhost:8000/carts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          userId: ownerId,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box key={id} className="card-container">
      <Box>
        <img src={photos[0]} />
        <hr />
        <Box>
          <Box className="wrapper">
            <Typography
              sx={{
                fontStyle: "italic",
                fontSize: "19px",
                fontFamily: "Monospace",
              }}
            >
              {title}
            </Typography>
            <Rating
              name="half-rating-read"
              defaultValue={review}
              precision={0.1}
              readOnly
            />
          </Box>
          <Box className="wrapper">
            <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
              ${price}
            </Typography>
            <Button variant="contained" onClick={addToCard}>
              add to cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
