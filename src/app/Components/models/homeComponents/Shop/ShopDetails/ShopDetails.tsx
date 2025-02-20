
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {  FiStar } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetAllProductQuery, useGetSingleProductQuery } from "@/app/redux/api/features/product/productApi";
import ShopCard from "../../../shopCard/ShopCard";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/api/features/product/productSlice";
const ShopDetails = () => {
  const dispatch = useDispatch();
 const navigate = useNavigate();
 const { id } = useParams();
  const {data, isLoading}=useGetSingleProductQuery(id) 
   const {data:bycles}=useGetAllProductQuery(undefined)
 const bycle = data?.data
 console.log(bycles)

 const cardAdd = () => {
  dispatch(addToCart({...bycle, quantity: 1}));
   navigate("/shoppingcart");
 };
  
  return (
    <div className="bg-[#f0f2f2]">
       <div style={{backgroundImage:"url('https://i.ibb.co.com/k2rdkVtn/image-6.jpg')",backgroundRepeat:"no-repeat" ,backgroundSize:"cover"}} className=" h-[500px]  relative">
             <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-[#363535b4]">
             <div className=" space-y-4">
             <h2 className="text-6xl text-white font-extrabold ">Linus Roadster Classic with black profile</h2>
             <div className=" flex justify-center items-center text-white ">
             <Link  className="hover:text-green-400" to="/">Home /</Link>
             <Link className="hover:text-green-400" to="/shop">Shop /</Link>
               <span >Linus Roadster Classic with black profile</span>
             </div>
             </div>
             </div>
       </div>
       <div>
       <div className=" p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12  py-10 rounded-xl ">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={bycle?.image_url}
            alt="Bicycle"
            className="w-full  h-auto "
          />
        </div>

        {/* Product Details Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            {[...Array(4)].map((_, index) => (
              <FiStar key={index} className="text-yellow-400 text-lg" />
            ))}
            <FiStar className="text-gray-300 text-lg" />
          </div>

          <h1 className="text-4xl font-bold text-gray-800">{bycle?.price}tk</h1>
          <p className="text-gray-600 mt-4">
           {bycle?.description}
          </p>

          {/* Color Options */}
          <div className="mt-6">
      <h2 className="text-lg font-semibold">Color</h2>
      <div className="flex gap-2 mt-2">
        {bycle?.colors.map((color) => (
          <div
            key={color._id}
            className="w-8 h-8 rounded-sm cursor-pointer border"
            style={{ backgroundColor: color.hex }}
            title={color.name}
          ></div>
        ))}
      </div>
    </div>

          {/* Quantity & Buy Now */}
          <div className="flex items-center gap-4 mt-6">
            <Input type="number" className="w-16" defaultValue={1} min={1} />
            <Button onClick={()=>cardAdd()} className="bg-gray-500 text-white" >
              Buy now
            </Button>
          </div>

          {/* Product Meta Info */}
          <div className="text-sm text-gray-500 mt-6">
            <p>SKU: {bycle?.sku}</p>
            <p>Category: {bycle?.sku}</p>
            <p>
  Tags: {bycle?.tags?.map((tag: any, index: number) => (
    <span key={index}>{tag}{index < bycle.tags.length - 1 ? ', ' : ''}</span>
  ))}
</p>            <p>Product ID: {bycle?._id}</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto mt-10">
        <Tabs defaultValue="description">
          <TabsList className="flex  justify-start mb-5 bg-none shadow-none border-b">
            <TabsTrigger value="description" className="px-6 py-3 text-lg font-semibold border-r">Description</TabsTrigger>
            <TabsTrigger value="additional-info" className="px-6 py-3 text-lg font-semibold border-r">Additional Information</TabsTrigger>
            <TabsTrigger value="reviews" className="px-6 py-3 text-lg font-semibold">Reviews (1)</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-6   mt-2">
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </TabsContent>
          <TabsContent value="additional-info" className="p-6 mt-2">
            <p className="text-gray-700">Additional information about the product goes here.</p>
          </TabsContent>
          <TabsContent value="reviews" className="p-6  mt-2">
            <p className="text-gray-700">User reviews will be displayed here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
       </div>
       <div>
        <div className=" ">
        <div className="mx-auto max-w-7xl px-4 lg:py-10 py-10 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">

  {bycles && bycles?.data?.slice(0, 3)?.map((bike) => (
    <ShopCard key={bike.id} bike={bike} />
  ))}

      </div>
        </div>
       </div>
    </div>
  )
}

export default ShopDetails
