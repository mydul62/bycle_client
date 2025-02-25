import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaTruck, FaRegTimesCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { getTotalPrice, removeFromCart, updateQuantity } from "@/app/redux/api/features/product/productSlice";
import { RootState } from "@/app/redux/store";

import ShoppingCartSkeleton from "@/app/Components/skeletons/ShoppingCartSkeleton";
import { Input } from "@/components/ui/input";

const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.Product.items);
  const totalPrice = useAppSelector((state: RootState) => getTotalPrice(state.Product));
  const [loading, setLoading] = useState(true); // Add loading state
  const [processing, setProcessing] = useState<boolean>(false); // Processing state

  useEffect(() => {
    if (carts.length > 0) {
      setLoading(false); // Set loading to false when carts data is available
    }
  }, [carts]);

  // Track quantity per product
  const [quantities, setQuantities] = useState<Record<string, number>>(
    carts.reduce((acc, product) => ({ ...acc, [product._id]: product.quantity }), {})
  );

  // Handle quantity change
  const handleQuantityChange = (id: string, value: number) => {
    const newQuantity = value > 0 ? value : 1; // Ensure quantity is at least 1
    setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
    dispatch(updateQuantity({ _id: id, quantity: newQuantity }));
  };

  if (loading || !carts) {
    return <ShoppingCartSkeleton />;  // Display skeleton if data is loading
  }

  // Handle checkout button click
  const handleCheckout = () => {
    setProcessing(true); // Set processing to true
    setTimeout(() => {
      navigate('/checkout'); // Navigate to checkout after 1 minute
    }, 1000); // 60 seconds = 1 minute
  };

  return (
    <div className="bg-gray-100">
      <div
        style={{
          backgroundImage: "url('https://i.ibb.co.com/k2rdkVtn/image-6.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="h-[500px] relative"
      >
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-[#363535b4]">
          <div className="space-y-4 mt-10">
            <h2 className="text-6xl text-white font-extrabold text-center">Cart</h2>
            <div className="flex justify-center items-center text-white">
              <Link className="hover:text-green-400" to="/">
                Home /
              </Link>
              <Link className="hover:text-green-400" to="/about">
                Cart
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-[90%] py-24 flex flex-col gap-10">
        {/* Cart Table */}
        <Card className="shadow-none">
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#1b3e41] hover:bg-[#1b3e41] text-white">
                  <TableHead className="w-1/2 py-6 text-white">Product</TableHead>
                  <TableHead className="p-6 text-white">Price</TableHead>
                  <TableHead className="p-6 text-white">Quantity</TableHead>
                  <TableHead className="p-6 text-white">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carts?.map((item) => (
                  <TableRow key={item._id} className="border-b">
                    <TableCell className="flex items-center gap-4">
                      <FaRegTimesCircle
                        onClick={() => {
                          dispatch(removeFromCart(item._id));
                        }}
                        className="text-red-500 cursor-pointer"
                      />
                      <img src={item.image_url} alt={item.name} className="w-12 h-12 object-cover" />
                      <span>{item.name}</span>
                    </TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        defaultValue={quantities[item._id] || 1}
                        inputMode="numeric" 
                        onChange={(e) => handleQuantityChange(item._id, 
                        Number(e.target.value))}
                        className="w-16 text-center border rounded-md appearance-auto"
                        min={1}
                      />
                    </TableCell>
                    <TableCell>${(item.price * quantities[item._id]).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Total Section */}
        <div className="flex justify-between items-start gap-10">
          <div></div>
          <Card className="w-96">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Cart totals</h3>
              <div className="flex justify-between py-2 border-b">
                <span>Subtotal</span>
                <span>{totalPrice} Tk</span>
              </div>
              <div className="py-2 border-b">
                <span className="flex items-center gap-2 text-green-600 font-semibold">
                  <FaTruck /> Free shipping
                </span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span>Total</span>
                <span>{totalPrice} Tk</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checkout Button */}
        <Button 
          onClick={handleCheckout} 
          className={`w-full bg-red-500 hover:bg-red-600 text-white py-8 text-lg ${processing ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={processing} // Disable button while processing
        >
          {processing ? "Please wait a minute..." : "Proceed to checkout"}
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
