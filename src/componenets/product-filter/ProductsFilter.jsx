import { useState } from "react";

import { Button, TextField, Typography, Box } from "@mui/material";

const ProductFilter = ({ maxPrice, minPrice, onChange }) => {
  const [max, setMax] = useState(maxPrice);
  const [min, setMin] = useState(minPrice);

  return (
    <>
      <Box>
        <Typography textAlign="center" mb="7px">
          Price:
        </Typography>

        <TextField
          id="outlined-size-small"
          label="Min"
          size="small"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          sx={{
            marginBottom: "7px",
            marginLeft: "7px",
          }}
        />

        <TextField
          id="outlined-size-small"
          label="Max"
          size="small"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          sx={{
            marginBottom: "7px",
            marginLeft: "7px",
          }}
        />

        <Button
          variant="outlined"
          sx={{
            marginLeft: "22px",
            borderColor: "#52796f",
            color: "#52796f",
            ":hover": { borderColor: "#255045" },
          }}
          onClick={() => onChange(max, min)}
        >
          Filter
        </Button>
      </Box>
    </>
  );
};
export default ProductFilter;
