// routes/user.route.ts

import About from "@/app/layout/common/home/about/About";
import ShopPage from "@/app/layout/user/shopPage/ShopPage";
import { TuserPath } from "@/app/types/types";
import PrivateRoute from "./UserPrivateRoute";
import CheckoutPage from "@/app/layout/user/checkout/CheckOutpage";
import ContactUs from "@/app/layout/common/home/contact/Contact";

import Home from "@/app/layout/common/home/Home";
import ShoppingCart from "@/app/layout/user/shopingCart/ShoppingCard";
import ShopDetails from "@/app/layout/user/Shop/ShopDetails/ShopDetails";





export const userPaths: TuserPath[] = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "About",
    path: "/about",
    element: <About />,
  },
  {
    name: "Shop",
    path: "/shop",
    element: <ShopPage />,
  },
  {
    name: "Shopping Cart",
    path: "/shoppingcart",
    element: (
      <PrivateRoute>
        <ShoppingCart />
      </PrivateRoute>
    ),
  },
  {
    name: "Checkout",
    path: "/checkout",
    element: (
      <PrivateRoute>
        <CheckoutPage />
      </PrivateRoute>
    ),
  },
  {
    name: "Contact Us",
    path: "/contact",
    element: <ContactUs />,
  },
  {
    name: "Shop Details",
    path: "/shopdetails/:id",
    element: <ShopDetails />,
  },
 
];
