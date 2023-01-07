import { createBrowserRouter } from "react-router-dom";

import SignIn from "./componenets/SignIn/SignIn";
import SignUp from "./componenets/SignUp/SignUp";
import Products from "./componenets/Products/Products";
import ShoppingCart from "./componenets/ShoppingCart/ShoppingCart";

import { authPagesLoader } from "./loaders/auth.loader";
import { protectedPagesLoader } from "./loaders/protected.loader";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: authPagesLoader,
    element: <SignIn />,
  },
  {
    path: "/signup",
    loader: authPagesLoader,
    element: <SignUp />,
  },
  {
    path: "/products",
    loader: protectedPagesLoader,
    element: <Products />,
  },
  {
    path: "/shopping-cart",
    loader: protectedPagesLoader,
    element: <ShoppingCart />,
  },
]);
