// routes/admin.route.ts

import AddProducts from "@/app/layout/admin/addProduct/AddProducts";
import DashboardLayout from "@/app/layout/admin/dashboard/DashboardLayout";
import AllOrders from "@/app/layout/admin/allOrders/AllOrders";
import AllUsers from "@/app/layout/admin/allUsers/AllUsers";

import AdminPrivateRoute from "./AdminPrivateRoute";
import { TuserPath } from "@/app/types/types";

export const adminPaths: TuserPath[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: (
      <AdminPrivateRoute>
        <DashboardLayout />
      </AdminPrivateRoute>
    ),
    children: [
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
    ],
  },
];
