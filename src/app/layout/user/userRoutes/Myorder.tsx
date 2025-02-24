import { useState } from "react";
import { useGetSingleUserQuery } from "@/app/redux/api/features/auth/authApi";
import { useGetAllOrderQuery } from "@/app/redux/api/features/order/orderApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  postcode: string;
  status: string;
  totalPrice: number;
  orderDate: string;
  transaction: {
    id: string;
    bank_status: string;
    method: string;
    sp_message: string;
  };
  products: {
    product: {
      name: string;
      brand: string;
      price: number;
      category: string;
      image_url: string;
    };
    quantity: number;
  }[];
}

const Myorder = () => {
  const { data } = useGetAllOrderQuery(undefined);
  const { data: user } = useGetSingleUserQuery(undefined);
  const email = user?.data?.email;
  const [searchQuery, setSearchQuery] = useState("");

  const myorders: Order[] = data?.data || [];
  const newmyorders: Order[] = myorders.filter(
    (order) => order.email === email
  );

  const filteredOrders = newmyorders.filter(
    (order) =>
      order._id.includes(searchQuery) || order.transaction.id.includes(searchQuery)
  );

  return (
    <Card className="max-w-full w-[98%] mx-auto mt-4 border shadow rounded-lg p-4">
      <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
        <CardTitle className="text-2xl font-bold">Orders</CardTitle>
        <div className="relative w-full md:w-1/3">
          <Input
            placeholder="Search by Order ID or Transaction ID..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
      </CardHeader>
      <CardContent>
        {filteredOrders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Bank Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id} className="hover:bg-gray-100">
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.firstName} {order.lastName}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>${order.totalPrice.toLocaleString()}</TableCell>
                  <TableCell className={`font-bold ${order.status === "Paid" ? "text-green-500" : "text-red-500"}`}>
                    {order.status}
                  </TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                  <TableCell>{order.transaction.id}</TableCell>
                  <TableCell className={order.transaction.bank_status === "Failed" ? "text-red-500" : "text-green-500"}>
                    {order.transaction.bank_status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-gray-500">No orders found</p>
        )}
        <p className="text-right text-gray-500 mt-2">Total Orders: {filteredOrders.length}</p>
      </CardContent>
    </Card>
  );
};

export default Myorder;
