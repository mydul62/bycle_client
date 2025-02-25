import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { clearCart, getTotalPrice } from "@/app/redux/api/features/product/productSlice";
import { useCreateOrderMutation } from "@/app/redux/api/features/order/orderApi";
import { useGetSingleUserQuery } from "@/app/redux/api/features/auth/authApi";

// Import Sonner for toast notifications
import { toast } from "sonner";
import { districts } from "@/app/data/data";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const [processing, setProcessing] = useState<boolean>(false);
  const [createOrder] = useCreateOrderMutation();
  const { register, handleSubmit } = useForm();
  const carts = useAppSelector((state) => state.Product.items);
  const totalPrice = useAppSelector((state) => getTotalPrice(state.Product));
  const { data: user } = useGetSingleUserQuery(undefined);
  const singleUser = user?.data;
const email=singleUser?.email
const phone=singleUser?.phone
const name =singleUser?.name

  // Checkbox state
  const [termsChecked, setTermsChecked] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
  console.log(data)
    setProcessing(true); // Start the processing immediately when the button is clicked

    // Simulate a wait period of 3 seconds before actually placing the order
    setTimeout(async () => {
      const products = carts.map(cart => ({
        product: cart._id, // Assuming cart.id contains the product ID
        quantity: cart.quantity,
        price: cart.price,
      }));

      const newData = { ...data, products, totalPrice, email };

      try {
        const res = await createOrder(newData).unwrap();

        if (res.success) {
          // Instead of alert(), use Sonner's toast
          toast.success("Order Created Successfully!");
          console.log(res.data.checkout_url);

          // Ensure checkout_url is absolute before redirecting
          const checkoutUrl = res.data.checkout_url.startsWith("http")
            ? res.data.checkout_url
            : `https://${res.data.checkout_url}`;

          window.location.href = checkoutUrl; // Redirects to the correct URL
          dispatch(clearCart());
        }
      } catch (error) {
        // In case of an error, use Sonner to show an error toast
        toast.error("There was an error processing your order.");
        console.log(error);
      } finally {
        setProcessing(false); // Reset processing state after the order is created
      }
    }, 2000); 
  };

  return (
    <div className="">
      <div style={{ backgroundImage: "url('https://i.ibb.co.com/k2rdkVtn/image-6.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="h-[500px] relative">
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-[#363535b4]">
          <div className="space-y-4 mt-10">
            <h2 className="text-6xl text-white font-extrabold text-center">Checkout</h2>
            <div className="flex justify-center items-center text-white">
              <Link className="hover:text-green-400" to="/">Home /</Link>
              <Link className="hover:text-green-400" to="/checkout">Checkout</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 mt-10">
        <h2 className="text-2xl font-bold mb-6">Billing details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:grid grid-cols-2 gap-6">
            <div className="space-y-5">
              <div>
                <Label htmlFor="firstName">First name *</Label>
                <Input value={name} disabled className="rounded-none py-6" id="firstName" {...register("firstName", { required: true })} />
              </div>
              {/* <div>
                <Label  htmlFor="lastName">Last name *</Label>
                <Input value={"customer"} className="rounded-none py-6" id="lastName" {...register("lastName", { required: true })} />
              </div> */}
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input value={email} disabled className="rounded-none py-6" id="email" {...register("email", { required: true })} />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input  value={phone} className="rounded-none py-6" id="phone" {...register("phone", { required: true })} />
              </div>
              <div>
                <Label>Country / Region *</Label>
                <Input className="rounded-none py-6" disabled value="Bangladesh" />
              </div>
              <div>
                <Label htmlFor="streetAddress">Street address *</Label>
                <Input className="rounded-none py-6" id="streetAddress" {...register("streetAddress", { required: true })} placeholder="House number and street name" />
                <Input {...register("apartment")} placeholder="Apartment, suite, unit, etc. (optional)" className="mt-2 rounded-none py-6" />
              </div>
              <div>
                <Label htmlFor="city">Town / City *</Label>
                <Input className="rounded-none py-6" id="city" {...register("city", { required: true })} />
              </div>
              <div>
                <Label htmlFor="district">District *</Label>
               <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a district..." />
      </SelectTrigger>
      <SelectContent>
        {districts.map((district) => (
          <SelectItem key={district} value={district.toLowerCase()}>{district}</SelectItem>
        ))}
      </SelectContent>
    </Select>
              </div>
              <div>
                <Label htmlFor="postcode">Postcode / ZIP (optional)</Label>
                <Input className="rounded-none py-6" id="postcode" {...register("postcode")} />
              </div>
            </div>
            <div>
              <Label htmlFor="orderNotes">Order notes (optional)</Label>
              <Textarea className="rounded-none py-6" id="orderNotes" {...register("orderNotes")} placeholder="Notes about your order, e.g. special notes for delivery." />
            </div>
          </div>

          {/* Order Summary */}
          <div className="max-w-7xl mx-auto py-6">
            <h2 className="text-2xl font-semibold mb-4">Your order</h2>
            <div className="border overflow-hidden">
              <div className="bg-[#1b3e41] text-white p-3 py-6 flex justify-between font-medium">
                <span className="p-3 px-8">Product</span>
                <span className="p-3 px-8">Subtotal</span>
              </div>
              <div>
                {carts && carts.map((cart, i) => (
                  <div key={i} className="bg-white flex justify-between border-b">
                    <span className="p-3 px-8">{cart.name} ×{cart.quantity}</span>
                    <span className="border-l-2 p-3 px-8">${cart.price}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white flex justify-between">
                <span className="p-3 px-8">Subtotal</span>
                <span className="p-3 px-8">${totalPrice}</span>
              </div>
              <div className="bg-white flex justify-between">
                <span className="p-3 px-8">Shipping</span>
                <span className="p-3 px-8">Free shipping</span>
              </div>
              <div className="bg-white flex justify-between font-bold">
                <span className="p-3 px-8">Total</span>
                <span className="p-3 px-8">${totalPrice}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="check">
                <AccordionTrigger>Check payments</AccordionTrigger>
                <AccordionContent>
                  Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Terms & Conditions */}
            <div className="flex items-center mt-6">
              <Checkbox
                id="terms"
                checked={termsChecked}
                onCheckedChange={(checked) => setTermsChecked(checked === true)}
              />
              <label htmlFor="terms" className="ml-2 text-sm">
                I have read and agree to the website <span className="font-bold text-red-600">terms and conditions *</span>
              </label>
            </div>

            {/* Place Order Button */}
            <Button type="submit" className="rounded-none mt-6 p-6 bg-red-500 hover:bg-red-600" disabled={!termsChecked}>
              {processing ? <span>Wait while processing....</span> : <span>Place order</span>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}