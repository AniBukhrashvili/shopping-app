import React from "react";
import { Button, Rating, Typography, Box } from "@mui/material";
import "./ProductsCard.css";

const ProductCard = (props) => {
  // const photos = props.photos.map((photo) => <img src={photo} />);
  // console.log(photos);

  return (
    <Box key={props.id} className="card-container">
      <Box>
        <img src={props.photos} />
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
              {props.title}
            </Typography>
            <Rating
              name="half-rating-read"
              defaultValue={props.review}
              precision={0.1}
              readOnly
            />
          </Box>
          <Box className="wrapper">
            <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
              ${props.price}
            </Typography>
            <Button variant="contained">add to cart</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
