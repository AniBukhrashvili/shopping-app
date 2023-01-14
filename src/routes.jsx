import { createBrowserRouter } from "react-router-dom";

import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Products from "./pages/products/Products";
import ShoppingCart from "./pages/shopping-cart/ShoppingCart";

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
