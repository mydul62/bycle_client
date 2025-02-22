// import App from "@/App";
// import ShoppingCart from "@/app/layout/user/shopingCart/ShoppingCard";
// import About from "@/app/layout/common/home/about/About";
// import CheckoutPage from "@/app/layout/user/checkout/CheckOutpage";
// import ContactUs from "@/app/layout/common/home/contact/Contact";
// import Home from "@/app/layout/common/home/Home";
// import { createBrowserRouter } from "react-router-dom";
// import Login from "@/app/layout/common/Auth/login/Login";
// import Register from "@/app/layout/common/Auth/register/Register";
// import ShopDetails from "@/app/layout/user/Shop/ShopDetails/ShopDetails";
// import ShopPage from "@/app/layout/user/shopPage/ShopPage";
// import AddProducts from "@/app/layout/admin/addProduct/AddProducts";
// import DashboardLayout from "@/app/layout/admin/dashboard/DashboardLayout";
// import AllOrders from "@/app/layout/admin/allOrders/AllOrders";
// import PrivateRoute from "./UserPrivateRoute";
// import AdminPrivateRoute from "./AdminPrivateRoute";
// import AllUsers from "@/app/layout/admin/allUsers/AllUsers";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "/about",
//         element: <About />,
//       },
//       {
//         path: "/shop",
//         element: <ShopPage />,
//       },
//       {
//         path: "/shoppingcart",
//         element: <PrivateRoute><ShoppingCart /></PrivateRoute>,
//       },
//       {
//         path: "/checkout",
//         element:<PrivateRoute><CheckoutPage /></PrivateRoute> ,
//       },
//       {
//         path: "/contact",
//         element: <ContactUs />,
//       },
//       {
//         path: "/shopdetails/:id",
//         element: <ShopDetails />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "dashboard",
//     element: <AdminPrivateRoute><DashboardLayout /></AdminPrivateRoute>,
//     children: [
//       {
//         path: "/dashboard/addproduct",
//         element:<AdminPrivateRoute> <AddProducts /></AdminPrivateRoute>,
//       },
//       {
//         path: "/dashboard/allorders",
//         element:<AdminPrivateRoute> <AllOrders /></AdminPrivateRoute>,
//       },
//       {
//         path: "/dashboard/allusers",
//         element:<AdminPrivateRoute> <AllUsers /></AdminPrivateRoute>,
//       },
//     ],
//   },
// ]); 

// router.tsx

import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Login from "@/app/layout/common/Auth/login/Login";
import Register from "@/app/layout/common/Auth/register/Register";
import { routerGenerator } from "./routerGenerator/routerGenerator";
import { userPaths } from "./user.route";
import { adminPaths } from "./admin.route";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routerGenerator(userPaths), // Generate user routes
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
 {
        path: "/dashboard",
        element: routerGenerator(adminPaths)[0].element,
        children: routerGenerator(adminPaths).slice(1), // Add child routes
},
]);
