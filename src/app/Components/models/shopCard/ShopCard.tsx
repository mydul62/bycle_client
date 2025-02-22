// import { selectCurrentUser } from "@/app/redux/api/features/auth/authslice"
import { IProduct } from "@/app/types/types";
import { Button } from "@/components/ui/button"
import { FiShoppingCart } from "react-icons/fi"
import { Link } from "react-router-dom"
 type Tbike ={
  bike: IProduct ;
 }
const ShopCard = ({bike}:Tbike) => {
console.log(bike)

  return (
    <div
    key={bike?._id}
    className="bg-white overflow-hidden   relative transition duration-300 group"
  >
    {bike.tags && (
      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
        {bike.tags}
      </span>
    )}
    <div className="relative border-b ">
      <img
        src={bike.image_url}
        alt={bike.name}
        className="w-full h-[300px] object-contain p-8 transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex justify-center items-center bg-[#0000002f] opacity-0 transition-opacity duration-300 hover:opacity-100">
       <Link to={`/shopdetails/${bike._id}`}> <Button  className="bg-red-500 text-white p-3  hover:bg-gray-900 transition duration-300">
          <FiShoppingCart size={20} />
          <span>+</span>
        </Button></Link>
      </div>
    </div>
    <div className="p-4 relative text-center">
      <div className="flex justify-between items-center mb-4">
        {/* {bike.bestseller && (
          <span className="text-sm font-medium text-blue-500">
            Bestseller
          </span>
        )} */}
      </div>
      <h2 className="text-lg font-semibold text-gray-800 truncate mb-2">
        {bike.name}
      </h2>
      <div className="mb-4">
        <span className="text-lg font-bold text-red-500">
          ${bike.price.toFixed(2)}
        </span>
        {bike.price && (
          <span className="text-sm line-through text-gray-400 ml-2">
            ${bike.price.toFixed(2)}
          </span>
        )}
      </div>
      <div className="flex items-center justify-center">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={
              index < bike.rating
                ? "text-yellow-400 text-lg"
                : "text-gray-300 text-lg"
            }
          >
            ★
          </span>
        ))}
      </div>
      <div className="bg-black absolute bottom-[calc(100%-10px)] left-[50%] -translate-x-[50%] h-[20px] flex justify-center items-center p-2 text-sm font-medium text-green-500">
       {bike.category}
      </div>
    </div>
  </div>
  )
}

export default ShopCard
