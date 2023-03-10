import { Button, Rating, Typography, Box } from "@mui/material";
import "./Cart.css";

const Cart = (props) => {
  const { id, photos, title, review, description, price, deleteCart } = props;

  return (
    <Box key={id} className="card-div">
      <Box>
        <img src={photos[0]} className="cart-img" />
      </Box>
      <Box>
        <Typography>{title}</Typography>
        <br />
        <Rating
          name="half-rating-read"
          defaultValue={review}
          precision={0.1}
          readOnly
        />
        <Typography>{description}</Typography>
        <Box className="wrapper">
          <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
            ${price}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteCart(id)}
          >
            delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
