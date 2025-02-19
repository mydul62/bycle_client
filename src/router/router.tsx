
import App from "@/App";
import ShopDetails from "@/app/Components/models/homeComponents/Shop/ShopDetails/ShopDetails";
import ShoppingCart from "@/app/Components/models/shopingCart/ShoppingCard";
import About from "@/app/pages/about/About";
import Login from "@/app/pages/Auth/login/Login";
import Register from "@/app/pages/Auth/register/Register";
import ContactUs from "@/app/pages/contact/Contact";
import Home from "@/app/pages/home/Home";
import Shop from "@/app/pages/shop/Shop";


import { createBrowserRouter } from "react-router-dom";

  export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
    {
     index:true,
      element:<Home/>
    },
    {
      path:'/about',
      element:<About/>
    },
    {
      path:'/shop',
      element:<Shop/>
    },
    {
      path:'/about',
      element:<About/>
    },
    {
      path:'/shoppingcart',
      element:<ShoppingCart/>
    },
    {
      path:'/contact',
      element:<ContactUs/>
    },
    {
      path:'/shopdetails/:id',
      element:<ShopDetails/>
    }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  }
]);