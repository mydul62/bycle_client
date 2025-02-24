import { Skeleton } from "@/components/ui/skeleton"; // Adjust if needed

const ShopCardSkeleton = () => {
  return (
    <div className="bg-white overflow-hidden relative transition duration-300 group">
      {/* Tag Skeleton */}
      <div className="absolute top-2 left-2">
        <Skeleton className="w-16 h-6 rounded text-xs font-bold" />
      </div>

      <div className="relative border-b">
        {/* Image Skeleton */}
        <Skeleton className="w-full h-[300px] object-contain p-8" />

        {/* Button Skeleton */}
        <div className="absolute inset-0 flex justify-center items-center bg-[#0000002f] opacity-0 transition-opacity duration-300 hover:opacity-100">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </div>

      <div className="p-4 relative text-center">
        {/* Name Skeleton */}
        <Skeleton className="w-32 h-6 mx-auto mb-4" />

        {/* Price Skeleton */}
        <div className="mb-4 flex justify-center">
          <Skeleton className="w-24 h-6 mr-2" />
          <Skeleton className="w-24 h-6 opacity-60" />
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center justify-center">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="w-5 h-5 text-gray-300 mr-1" />
          ))}
        </div>

        {/* Category Skeleton */}
        <div className="bg-black absolute bottom-[calc(100%-10px)] left-[50%] -translate-x-[50%] h-[20px] flex justify-center items-center p-2 text-sm font-medium text-green-500">
          <Skeleton className="w-16 h-4" />
        </div>
      </div>
    </div>
  );
};

export default ShopCardSkeleton;
