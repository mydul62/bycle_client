import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FiStar } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetAllProductQuery, useGetSingleProductQuery } from "@/app/redux/api/features/product/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/api/features/product/productSlice";
import ShopCard from "@/app/Components/models/shopCard/ShopCard";
import { useState } from "react";
import { Icart, IProduct } from "@/app/types/types";
import ShopDetailsSkeleton from "@/app/Components/skeletons/DetailpageSkeleton/DetailpageSkeleton";
import { toast } from "sonner";


const ShopDetails = () => {
  const [cycleColor, setCycleColor] = useState<string>("");
  const [newquality, setQuantity] = useState<number>(1); // Default value set to 1
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(id);

  const { data: bicycles, isLoading: isBicyclesLoading } = useGetAllProductQuery({});
  const bicycle = data?.data;

  // Handle quantity change
  const handleQuantityChange = (value: number) => {
    if (bicycle && value <= bicycle.stock && value > 0) {
      setQuantity(value); // Ensure quantity is within the stock limit and greater than 0
    } else {
      // If quantity exceeds stock, show a toast
      if (value > bicycle?.stock) {
        toast.error('Insufficient stock!');
      }
      if (value <= 0) {
        toast.error('Quantity must be at least 1');
      }
    }
  };

  const newBicycle: Icart | undefined = bicycle
    ? {
        brand: bicycle.brand,
        _id: bicycle._id,
        name: bicycle.name,
        price: bicycle.price,
        category: bicycle.category,
        image_url: bicycle.image_url,
        quantity: newquality,
        color: cycleColor,
      }
    : undefined;

  const handleAddToCart = () => {
    if (!cycleColor) {
      toast.error('Please select a color!');
    } else if (bicycle && newquality > bicycle.stock) {
      toast.error('Not enough stock!');
    } else {
      if (newBicycle) {
        dispatch(addToCart({ ...newBicycle }));
        navigate("/shoppingcart");
      }
    }
  };

  return (
    <div className="bg-[#f0f2f2]">
      <div
        style={{
          backgroundImage: "url('https://i.ibb.co/k2rdkVtn/image-6.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="h-[500px] relative"
      >
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-[#363535b4]">
          <div className="space-y-4">
            <h2 className="text-6xl text-white font-extrabold">{bicycle?.name || "Product Details"}</h2>
            <div className="flex justify-center items-center text-white">
              <Link className="hover:text-green-400" to="/">Home /</Link>
              <Link className="hover:text-green-400" to="/shop">Shop /</Link>
              <span>{bicycle?.name || "Product"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen text-lg"><ShopDetailsSkeleton /></div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 py-10 rounded-xl">
            {/* Image Section */}
            <div className="flex justify-center">
              <img
                src={bicycle?.image_url || "/placeholder.jpg"}
                alt={bicycle?.name || "Bicycle"}
                className="w-full h-auto"
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

              <h1 className="text-4xl font-bold text-gray-800">{bicycle?.price} tk</h1>
              <p className="text-gray-600 mt-4">{bicycle?.description}</p>

              {/* Color Options */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Color</h2>
                <div className="flex gap-2 mt-2">
                  {bicycle?.colors?.map((color: { _id: string; hex: string; name: string }) => (
                    <div
                      key={color._id}
                      onClick={() => setCycleColor(color.hex)}
                      className={`w-8 h-8 rounded-sm cursor-pointer border ${
                        cycleColor === color.hex ? "border-black border-2" : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    ></div>
                  ))}
                </div>
                <div className="my-4">
                  <h2 className="text-xl">
                    Stock: {bicycle?.stock > 0 ? bicycle?.stock : "Out of Stock"}
                  </h2>
                </div>
              </div>

              {/* Quantity & Buy Now */}
              <div className="flex items-center gap-4 mt-6">
                <input
                  type="number"
                  value={newquality}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="w-16 text-center border rounded-md"
                  min={1}
                  max={bicycle?.stock || 1}
                />
                <Button
                  disabled={!cycleColor}
                  onClick={handleAddToCart}
                  className="text-white"
                >
                  Buy now
                </Button>
              </div>

              {/* Product Meta Info */}
              <div className="text-sm text-gray-500 mt-6">
                <p>SKU: {bicycle?.sku || "N/A"}</p>
                <p>Category: {bicycle?.category || "N/A"}</p>
                <p>Product ID: {bicycle?._id || "N/A"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs Section */}
        <div className="max-w-7xl mx-auto mt-10">
          <Tabs defaultValue="description">
            <TabsList className="flex justify-start mb-5 border-b">
              <TabsTrigger value="description" className="px-6 py-3 text-lg font-semibold border-r">
                Description
              </TabsTrigger>
              <TabsTrigger value="additional-info" className="px-6 py-3 text-lg font-semibold border-r">
                Additional Info
              </TabsTrigger>
              <TabsTrigger value="reviews" className="px-6 py-3 text-lg font-semibold">
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-6 mt-2">
              <p className="text-gray-700">{bicycle?.description || "No description available."}</p>
            </TabsContent>
            <TabsContent value="additional-info" className="p-6 mt-2">
              <p className="text-gray-700">Additional information about the product.</p>
            </TabsContent>
            <TabsContent value="reviews" className="p-6 mt-2">
              <p className="text-gray-700">User reviews will be displayed here.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      {!isBicyclesLoading && (
        <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bicycles?.data?.slice(0, 3)?.map((bike: IProduct) => (
            <ShopCard key={bike._id} bike={bike} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopDetails;
