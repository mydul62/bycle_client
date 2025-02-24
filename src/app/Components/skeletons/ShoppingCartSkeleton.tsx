
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";




const ShoppingCartSkeleton: React.FC = () => {


  return (
    <div className="bg-gray-100">
      <div
        style={{
          backgroundImage: "url('https://i.ibb.co.com/k2rdkVtn/image-6.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="h-[500px] relative"
      >
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-[#363535b4]">
          <div className="space-y-4 mt-10">
            <h2 className="text-6xl text-white font-extrabold text-center">
              <Skeleton className="w-32 h-8" />
            </h2>
            <div className="flex justify-center items-center text-white">
              <Skeleton className="w-12 h-6" />
              <Skeleton className="w-12 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-[90%] py-24 flex flex-col gap-10">
        {/* Cart Table Skeleton */}
        <Card className="shadow-none">
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#1b3e41] hover:bg-[#1b3e41] text-white">
                  <TableHead className="w-1/2 py-6 text-white">
                    <Skeleton className="w-24 h-6" />
                  </TableHead>
                  <TableHead className="p-6 text-white">
                    <Skeleton className="w-12 h-6" />
                  </TableHead>
                  <TableHead className="p-6 text-white">
                    <Skeleton className="w-16 h-6" />
                  </TableHead>
                  <TableHead className="p-6 text-white">
                    <Skeleton className="w-16 h-6" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Loop through skeletons for each cart item */}
                {[...Array(3)].map((_, index) => (
                  <TableRow key={index} className="border-b">
                    <TableCell className="flex items-center gap-4">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <Skeleton className="w-32 h-6" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-16 h-6" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-16 h-6" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-16 h-6" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
       <div>
       <Link to={'/shop'} className=" font-bold bg-green-500 p-2 rounded-md text-white">Add a Item First</Link>
       </div>
        {/* Total Section Skeleton */}
        <div className="flex justify-between items-start gap-10">
          <div></div>
          <Card className="w-96">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                <Skeleton className="w-24 h-6" />
              </h3>
              <div className="flex justify-between py-2 border-b">
                <Skeleton className="w-24 h-6" />
                <Skeleton className="w-16 h-6" />
              </div>
              <div className="py-2 border-b">
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <Skeleton className="w-8 h-6" />
                  <Skeleton className="w-24 h-6" />
                </div>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <Skeleton className="w-24 h-6" />
                <Skeleton className="w-16 h-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checkout Button Skeleton */}
        <Skeleton className="w-full h-16 bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
};

export default ShoppingCartSkeleton;
