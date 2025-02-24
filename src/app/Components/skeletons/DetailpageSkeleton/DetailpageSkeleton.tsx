import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FiStar } from "react-icons/fi";
import { Skeleton } from "@/components/ui/skeleton";

const ShopDetailsSkeleton = () => {
  return (
    <div className="bg-[#f0f2f2] w-full min-h-screen flex flex-col pb-20">

      <div className="p-8 w-full flex-grow">
        <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 py-10 rounded-xl w-full">
          {/* Image Section */}
          <div className="flex justify-center w-full">
            <Skeleton className="h-[400px] w-full max-w-lg" />
          </div>

          {/* Product Details Section */}
          <div className="w-full">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, index) => (
                <FiStar key={index} className="text-gray-300 text-lg" />
              ))}
            </div>

            <Skeleton className="h-10 w-36" />
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-4 w-full mt-4" />
            ))}

            {/* Color Options */}
            <div className="mt-6">
              <Skeleton className="h-5 w-20" />
              <div className="flex gap-2 mt-2">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-8 w-8 rounded-sm" />
                ))}
              </div>
            </div>

            {/* Quantity & Buy Now */}
            <div className="flex items-center gap-4 mt-6">
              <Skeleton className="h-10 w-16" />
              <Skeleton className="h-10 w-32" />
            </div>

            {/* Product Meta Info */}
            <div className="text-sm text-gray-500 mt-6">
              <Skeleton className="w-36" />
              <Skeleton className="w-28" />
              <Skeleton className="w-44" />
            </div>
          </div>
        </div>
     
      </div>
    </div>
  );
};

export default ShopDetailsSkeleton;