// routes/admin.route.ts

import AddProducts from "@/app/layout/admin/addProduct/AddProducts";
import DashboardLayout from "@/app/layout/admin/dashboard/DashboardLayout";
import AllOrders from "@/app/layout/admin/allOrders/AllOrders";
import AllUsers from "@/app/layout/admin/allUsers/AllUsers";

import AdminPrivateRoute from "./AdminPrivateRoute";
import { TuserPath } from "@/app/types/types";
import AllProducts from "@/app/layout/admin/allProducts/AllProducts";
import UpdateProduct from "@/app/layout/admin/updateProduct/UpdateProduct";
import PrivateRoute from "./UserPrivateRoute";
import Myorder from "@/app/layout/user/userRoutes/Myorder";
import Profile from "@/app/layout/common/Profile/Profile";


export const adminPaths: TuserPath[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        name: "My Profile",
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        name: "Add Product",
        path: "addproduct",
        element: (
          <AdminPrivateRoute>
            <AddProducts />
          </AdminPrivateRoute>
        ),
      },
      {
        name: "Add Product",
        path: "allproducts",
        element: (
          <AdminPrivateRoute>
            <AllProducts />
          </AdminPrivateRoute>
        ),
      },
      {
        name: "Add Product",
        path: "addproduct",
        element: (
          <AdminPrivateRoute>
            <AddProducts />
          </AdminPrivateRoute>
        ),
      },
      {
        name: "Add Product",
        path: "addproduct/:id",
        element: (
          <AdminPrivateRoute>
            <AddProducts />
          </AdminPrivateRoute>
        ),
      },
      {
        name: "All Orders",
        path: "allorders",
        element: (
          <AdminPrivateRoute>
            <AllOrders />
          </AdminPrivateRoute>
        ),
      },
      {
        name: "All Users",
        path: "allusers",
        element: (
          <AdminPrivateRoute>
            <AllUsers />
          </AdminPrivateRoute>
        ),
      },
      {
        name: "Update Product",
        path: "updateproduct/:id",
        element: (
          <AdminPrivateRoute>
            <UpdateProduct />
          </AdminPrivateRoute>
        ),
      },
      {
        name: "My Orders",
        path: "myorders",
        element: (
          <PrivateRoute>
            <Myorder />
          </PrivateRoute>
        ),
      },
     
    ],
  },
];