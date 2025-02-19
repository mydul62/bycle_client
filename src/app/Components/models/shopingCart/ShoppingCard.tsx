import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaTruck, FaRegTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

const ShoppingCart: React.FC = () => {
  const products: Product[] = [
    { id: 1, name: "Linus Roadster Classic - Blue", price: 1700, img: "/images/byclebg.jpg" },
    { id: 2, name: "Mach City iBike - Yellow", price: 2460, img: "/images/byclebg.jpg" },
  ];

  return (
<div className="bg-gray-100">
<div style={{ backgroundImage: "url('https://i.ibb.co.com/k2rdkVtn/image-6.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="h-[500px] relative">
    <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-[#363535b4]">
      <div className="space-y-4 mt-10">
        <h2 className="text-6xl text-white font-extrabold text-center">Cart</h2>
        <div className="flex justify-center items-center text-white">
          <Link className="hover:text-green-400" to="/">Home /</Link>
          <Link className="hover:text-green-400" to="/about">Cart</Link>
        </div>
      </div>
    </div>
  </div>
    <div className=" max-w-5xl mx-auto w-[90%] my-24   flex flex-col gap-10">
      {/* Cart Table */}
      <Card className=" shadow-none">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow className=" bg-[#1b3e41] hover:bg-[#1b3e41]   text-white">
                <TableHead className="w-1/2 py-6 text-white">Product</TableHead>
                <TableHead className="p-6 text-white">Price</TableHead>
                <TableHead className="p-6 text-white">Quantity</TableHead>
                <TableHead className="p-6 text-white">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((item) => (
                <TableRow key={item.id} className="border-b">
                  <TableCell className="flex items-center gap-4 ">
                    <FaRegTimesCircle className="text-red-500 cursor-pointer" />
                    <img src={item.img} alt={item.name} className="w-12 h-12 object-cover" />
                    <span>{item.name}</span>
                  </TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <input
                      type="number"
                      defaultValue={1}
                      className="w-16 text-center border rounded-md"
                    />
                  </TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Coupon & Total Section */}
      <div className="flex justify-between items-start gap-10">
        <div className="flex gap-4">
          <Input placeholder="Coupon code" className="w-64 rounded-none" />
          <Button className="bg-red-500 hover:bg-red-600 text-white">Apply coupon</Button>
        </div>
        <Card className="w-96">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Cart totals</h3>
            <div className="flex justify-between py-2 border-b">
              <span>Subtotal</span>
              <span>$4,160.00</span>
            </div>
            <div className="py-2 border-b">
              <span className="flex items-center gap-2 text-green-600 font-semibold">
                <FaTruck /> Free shipping
              </span>
              <p className="text-sm text-gray-700">Shipping to <b>Bangladesh</b></p>
              <button className="text-red-500 text-sm">Change address</button>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total</span>
              <span>$4,160.00</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Checkout Button */}
      <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-8 text-lg">
        Proceed to checkout
      </Button>
    </div>
</div>
  );
};

export default ShoppingCart;
