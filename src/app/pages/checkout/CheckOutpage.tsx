import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/redux/hook";
import { getTotalPrice } from "@/app/redux/api/features/product/productSlice";

export default function CheckoutPage() {
  const { register, handleSubmit, control } = useForm();
const carts = useAppSelector((state) => state.Product.items);
  const totalPrice = useAppSelector((state: RootState) => getTotalPrice(state.Product));
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className=" ">
    <div style={{ backgroundImage: "url('https://i.ibb.co.com/k2rdkVtn/image-6.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="h-[500px] relative">
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-[#363535b4]">
          <div className="space-y-4 mt-10">
            <h2 className="text-6xl text-white font-extrabold text-center">Shop</h2>
            <div className="flex justify-center items-center text-white">
              <Link className="hover:text-green-400" to="/">Home /</Link>
              <Link className="hover:text-green-400" to="/shop">Shop</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6">Billing details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
        <div className=" space-y-5">
          <div>
            <Label htmlFor="firstName">First name *</Label>
            <Input className=" rounded-none py-6" id="firstName" {...register("firstName", { required: true })} />
          </div>
          <div>
            <Label htmlFor="lastName">Last name *</Label>
            <Input className=" rounded-none py-6" id="lastName" {...register("lastName", { required: true })} />
          </div>
       

   

        <div>
          <Label>Country / Region *</Label>
          <Input className=" rounded-none py-6" disabled value="Bangladesh" />
        </div>

        <div>
          <Label htmlFor="streetAddress">Street address *</Label>
          <Input className=" rounded-none py-6" id="streetAddress" {...register("streetAddress", { required: true })} placeholder="House number and street name" />
          <Input   {...register("apartment")} placeholder="Apartment, suite, unit, etc. (optional)" className="mt-2  rounded-none py-6" />
        </div>

        <div>
          <Label htmlFor="city">Town / City *</Label>
          <Input className=" rounded-none py-6" id="city" {...register("city", { required: true })} />
        </div>

        <div>
          <Label  htmlFor="district">District *</Label>
          <Select  >
            <SelectTrigger>
              <SelectValue placeholder="Select an option..."  />
            </SelectTrigger>
            <SelectContent >
              <SelectItem   value="dhaka">Dhaka</SelectItem>
              <SelectItem value="chattogram">Chattogram</SelectItem>
              <SelectItem value="khulna">Khulna</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="postcode">Postcode / ZIP (optional)</Label>
          <Input className=" rounded-none py-6" id="postcode" {...register("postcode")} />
        </div>
        </div>
        <div>
          <Label htmlFor="orderNotes">Order notes (optional)</Label>
          <Textarea   className=" rounded-none py-6" id="orderNotes" {...register("orderNotes")} placeholder="Notes about your order, e.g. special notes for delivery." />
        </div>
      </form>
      </div>
      
      
      <div className="max-w-7xl mx-auto p-6  ">
      <h2 className="text-2xl font-semibold mb-4">Your order</h2>
      
      {/* Order Table */}
      <div className="border  overflow-hidden">
        <div className="bg-[#1b3e41] text-white p-3 py-6 flex justify-between font-medium">
          <span className="   p-3 px-8">Product</span>
          <span className="   p-3 px-8">Subtotal</span>
        </div>
     <div>
     {carts && carts.map((cart, i) => (
  <div key={i} className=" bg-white flex justify-between border-b">
    <span className="  p-3 px-8">{cart.name} ×{cart.quantity}</span>
    <span className=" border-l-2  p-3 px-8">${cart.price}</span>
  </div>
))}
     </div>
        <div className=" bg-white flex justify-between">
          <span className="   p-3 px-8">Subtotal</span>
          <span className=" p-3 px-8">$1,700.00</span>
        </div>
        <div className=" bg-white flex justify-between">
          <span className=" p-3 px-8">Shipping</span>
          <span className=" p-3 px-8">Free shipping</span>
        </div>
        <div className=" bg-white flex justify-between font-bold">
          <span className="   p-3 px-8">Total</span>
          <span className="  p-3 px-8">$1,700.00</span>
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
        <Checkbox id="terms" />
        <label htmlFor="terms" className="ml-2 text-sm">
          I have read and agree to the website <span className="font-bold text-red-600">terms and conditions *</span>
        </label>
      </div>
      
      {/* Place Order Button */}
      <Button className=" rounded-none mt-6 p-6 bg-red-500 hover:bg-red-600">Place order</Button>
    </div>
    </div>
  );
}
