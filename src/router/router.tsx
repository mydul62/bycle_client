import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Login from "@/app/layout/common/Auth/login/Login";
import Register from "@/app/layout/common/Auth/register/Register";
import { routerGenerator } from "./routerGenerator/routerGenerator";
import { userPaths } from "./user.route";
import { adminPaths } from "./admin.route";
import PrivateRoute from "./UserPrivateRoute";
import OrderVerify from "@/app/layout/user/orderverify/OrderVerify";
import Profile from "@/app/layout/common/Profile/Profile";

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
    path:"order/verify",
    element:<PrivateRoute><OrderVerify/></PrivateRoute>
},
  {
    path: "/dashboard",
    element: routerGenerator(adminPaths)[0].element,
    children: [
      {
        index: true,
        element: <Profile />,
      },
      ...routerGenerator(adminPaths).slice(1), 
    ],
  },
]);
