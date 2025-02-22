
import { Button } from "@/components/ui/button";
import { FiHeart, FiClipboard } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useGetAllProductQuery } from "@/app/redux/api/features/product/productApi";
import ShopCard from "@/app/Components/models/shopCard/ShopCard";



const Shop = () => {
   const {data:bycles}=useGetAllProductQuery(undefined)
  return (
    <div className="bg-gray-100 ">
      <div
        className="text-center py-10 bg-cover bg-center h-[500px]"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/wFhbzLZC/mahim1-1.jpg')`,
        }}
      >
        <h1 className="text-7xl font-bold text-white">From the shop</h1>
      </div>

      <div className="mx-auto px-4 lg:px-10 py-10 grid grid-cols-1 -mt-[340px] sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {bycles && bycles?.data?.slice(0, 4)?.map((bike) => (
    <ShopCard key={bike.id} bike={bike} />
  ))}
      </div>

      <div className="text-center py-6">
     <Link to={`/shop`}>
     <Button className="px-5 py-6 bg-red-500 text-xl rounded-none text-white font-bold">
          View all
        </Button>
     </Link>
      </div>

      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <Button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-900 transition duration-300">
          <FiHeart size={20} />
        </Button>
        <Button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-900 transition duration-300">
          <FiClipboard size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Shop;
