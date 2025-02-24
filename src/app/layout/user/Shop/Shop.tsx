import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { useGetAllProductQuery } from "@/app/redux/api/features/product/productApi";
import ShopCard from "@/app/Components/models/shopCard/ShopCard";
import { IProduct } from "@/app/types/types";

const Shop = () => {
  const { data: bycles } = useGetAllProductQuery({undefined});
  return (
    <div className="bg-gray-100  py-[50px] lg:py-[100px]">
      {/* Hero Section */}
      <div
        className="text-center py-10 bg-cover bg-center h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] flex items-start justify-center"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/wFhbzLZC/mahim1-1.jpg')`,
        }}
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
          From the shop
        </h1>
      </div>

      {/* Product Grid */}
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 -mt-[280px] sm:-mt-[300px] md:-mt-[320px] lg:-mt-[340px]">
      {bycles?.data?.slice(0, 4)?.map((bike: IProduct) => (
          <ShopCard key={bike._id} bike={bike} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center py-4 md:py-6">
        <Link to={`/shop`}>
          <Button className="px-4 md:px-6 py-3 md:py-4 bg-red-500 text-lg md:text-xl rounded-none text-white font-bold">
            View all
          </Button>
        </Link>
      </div>

     
    </div>
  );
};

export default Shop;
