import React from "react";

import { Button, Rating, Typography, Box } from "@mui/material";
import "./ProductsCard.css";

const ProductCard = (props) => {
  // const photos = props.photos.map((photo) => <img src={photo} />);
  // console.log(photos);
  const { id, photos, title, review, price } = props;
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
            <Button variant="contained">add to cart</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
