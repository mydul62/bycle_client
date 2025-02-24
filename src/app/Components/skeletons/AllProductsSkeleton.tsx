// components/AllProductsSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

const AllProductsSkeleton = () => {
  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">
        <Skeleton className="w-1/3 h-6" />
      </h2>
      <div className="space-y-4">
        {/* Skeleton Row */}
        <div className="flex justify-between space-x-4">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-8 w-1/4" />
        </div>
        {/* Repeat the skeleton rows for each row in the table */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex justify-between space-x-4 mt-2">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsSkeleton;
