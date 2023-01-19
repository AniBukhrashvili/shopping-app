// import { useState, useCallback } from "react";
// import debounce from "lodash/debounce";
// import { useEffect } from "react";

// import { IconButton, Box, Input, Grid } from "@mui/material";

// import SearchIcon from "@mui/icons-material/Search";

// const Search = ({ onSearch }) => {
//   const [name, setName] = useState("");
//   // const [products, setProducts] = useState(null);

//   const handleSearch = (name) => {
//     onSearch(name);
//   };

//   return (
//     <Box>
//       <Input
//         sx={{
//           ml: 1,
//           flex: 1,
//           width: "700px",
//         }}
//         placeholder="Search"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <IconButton
//         type="button"
//         sx={{ p: "10px" }}
//         aria-label="search"
//         onClick={handleSearch}
//       >
//         <SearchIcon />
//       </IconButton>
//       {/* <Grid container display="flex">
//         {products
//           ?.filter((product) =>
//             product.title.toLowerCase().includes(name.toLowerCase())
//           )
//           .map((item) => (
//             <ProductCard
//               key={item.id}
//               id={item.id}
//               photos={item.photos}
//               title={item.title}
//               review={item.review}
//               price={item.price}
//             />
//           ))}
//       </Grid> */}
//     </Box>
//   );
// };
// export default Search;
