import AllProductsSkeleton from "@/app/Components/skeletons/AllProductsSkeleton";
import { useGetAllProductQuery } from "@/app/redux/api/features/product/productApi";
import { IProduct } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Link } from "react-router-dom";


const AllProducts = () => {
  const { data, isLoading } = useGetAllProductQuery({ undefined });

  // Delete Product Handler
  // const handleDelete = async (id: string) => {
    // if (confirm("Are you sure you want to delete this product?")) {
    //   await deleteProduct(id);
    // }
  // };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>

      {isLoading ? (
        // Display AllProductsSkeleton while loading
        <AllProductsSkeleton />
      ) : (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((product: IProduct) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.inStock ? "In Stock" : "Out of Stock"}</TableCell>
                <TableCell>
                  <Link to={`/dashboard/updateproduct/${product._id}`}>
                    <Button variant="outline" size="sm">Update</Button>
                  </Link>
                  <Button variant="destructive" size="sm" 
                  //  onClick={() => handleDelete(product._id)} 
                  
                 className="ml-2">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AllProducts;
