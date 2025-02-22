
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { IoFilterSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import ShopCard from "@/app/Components/models/shopCard/ShopCard";
import { useGetAllProductQuery } from "@/app/redux/api/features/product/productApi";

const ShopPage = () => {
  const [priceRange, setPriceRange] = useState([10, 3760]);
  const {data}=useGetAllProductQuery(undefined)
 console.log(data?.data)
  const categories = [
    { title: "Bicycles", options: ["Bicycles", "Integrated lighting", "IsoSpeed", "Plus size tires", "Reactive suspension", "Step-through frame"] },
  ];

  return (
    <div className="bg-[#f0f2f2] relative">
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

      <div className="max-w-7xl mx-auto grid grid-cols-7 gap-6 p-6">
        {/* Sidebar */}
        <div className="col-span-2 sticky top-14  self-start">
          <aside className="w-full space-y-6 bg-white p-6">
            <div className="p-10 px-4 border-b">
              <h2 className="font-semibold text-2xl">Cart</h2>
              <p className="text-gray-500 text-xl">No products in the cart.</p>
            </div>
            {/* Search Bar */}
            <Input placeholder="Search for products..." className="rounded-md" />
            
            {/* Filter Section */}
            <div className="space-y-6">
              <h2 className="font-semibold flex items-center gap-2">
                <IoFilterSharp /> Filter
              </h2>
              <Slider min={10} max={3760} value={priceRange} onValueChange={(val) => setPriceRange(val)} />
              <p className="text-sm text-gray-600">Price: ${priceRange[0]} — ${priceRange[1]}</p>
              
              {categories.map((category) => (
                <div key={category.title}>
                  <h3 className="font-semibold">{category.title}</h3>
                  <ul>
                    {category.options.map((option) => (
                      <li key={option} className="flex items-center gap-2">
                        <input type="checkbox" id={option} className="w-4 h-4" />
                        <label htmlFor={option} className="text-gray-700">{option}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Reset Button */}
            <Button className="p-3 border-none rounded-none font-bold bg-red-500 w-full">Reset</Button>
          </aside>
        </div>
        
        {/* Main Content */}
        <main className="col-span-5">
          <div className="flex justify-between items-center mb-4">
            <p>Showing 1-8 of 17 results</p>
            <select className="border p-2 rounded-md">
              <option>Sort by latest</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data?.data?.map((bike) => (
              <ShopCard key={bike?.id} bike={bike} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;