import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllOrderQuery } from "@/app/redux/api/features/order/orderApi";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  postcode: string;
  products: {
    product: {
      _id: string;
      name: string;
      brand: string;
      price: number;
      image_url: string;
    };
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function AllOrders() {
  const { data, error, isLoading } = useGetAllOrderQuery(undefined);

  if (isLoading) return <p className="text-center py-4">Loading orders...</p>;
  if (error) return <p className="text-center py-4 text-red-500">Failed to fetch orders</p>;

  const orders: Order[] = data?.data || [];

  // Handle status change
  const handleStatusChange = (orderId: string, newStatus: string) => {
    console.log("Updating order:", orderId, "to status:", newStatus);
    // TODO: API call for updating status
  };

  return (
    <div className="max-w-full w-[98%] mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">All Orders</h1>
      <p className="text-center mb-4 font-medium">Result: {orders.length}</p> {/* Display the total number of orders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {orders.map((order, i) => (
          <div key={order._id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-300 hover:shadow-xl transition-shadow duration-300">
            <span className="p-2 bg-green-300 rounded-full">{i + 1}</span>
            <div className="flex flex-col md:flex-row">
              {/* User Info Section */}
              <div className="w-[50%] p-4 border-r border-gray-300">
                <h2 className="font-bold text-xl mb-2">{order.firstName} {order.lastName}</h2>
                <p className="text-sm text-gray-600">Email: {order.email}</p>
                <p className="text-sm text-gray-600">Phone: {order.phone}</p>
                <div className="my-2">
                  <h3 className="font-medium">Address:</h3>
                  <p>{order.streetAddress}, {order.city}, {order.postcode}</p>
                </div>
                <div className="font-semibold">
                  Total Price: ${order.totalPrice.toFixed(2)}
                </div>
                <div className="mt-4">
                  <label className="block mb-1 font-medium">Status: {order.status}</label>
                  <Select
                    defaultValue={order.status}
                    onValueChange={(newStatus) => handleStatusChange(order._id, newStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products Section */}
              <div className="md:w-2/3 p-4">
                <h3 className="font-medium mb-2">Products:</h3>
                <ul className="list-disc pl-5">
                  {order.products.map(({ product, quantity }) => (
                    <li key={product._id} className="flex items-center mb-2">
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded-md mr-2" 
                      />
                      <span className="flex-grow">{product.name} (Qty: {quantity})</span>
                      <span className="ml-auto">${(product.price * quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
