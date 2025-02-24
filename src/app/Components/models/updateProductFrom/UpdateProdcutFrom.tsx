import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RxCross2 } from "react-icons/rx";
import {  useGetSingleProductQuery, useUpdateProductMutation } from "@/app/redux/api/features/product/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface Color {
  name: string;
  hex: string;
}

interface ProductFormData {
  _id: string;
  name: string;
  brand: string;
  price: number;
  type: "Road";
  description: string;
  stock: number;
  inStock: boolean;
  sku: number;
  category: string;
  tags: string[];
  image_url: string;
  colors: Color[];
  rating?: number;
}

export default function UpdateProductForm() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleProductQuery(id);
  const product = data?.data;
const navigate = useNavigate()
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ProductFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "colors",
  });

  const [updateProduct] = useUpdateProductMutation();

  // useEffect to set form values when product data is available
  useEffect(() => {
    if (product) {
      reset({
        _id: product._id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        type: "Road",
        description: product.description,
        stock: product.stock,
        inStock: product.inStock,
        sku: product.sku,
        category: product.category,
        tags: product.tags,
        image_url: product.image_url,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        colors: product.colors?.map((color: { name: any; hex: any; }) => ({ name: color.name, hex: color.hex })) || [],
      });
    }
  }, [product, reset]);

  const onSubmit = async (newdata: ProductFormData) => {
    try {

    if(data){
      const  res= await updateProduct({ id, newdata }).unwrap();
      if(res.success){
        toast.success('Product updated Successfully')
        reset(); 
        navigate("/dashboard/allproducts")
      }
        
    }
    } catch (error) {
      console.error("Failed to update the product:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details.</div>;

  return (
    <Card className="max-w-full w-[98%] mx-auto mt-2 border-0 shadow-none rounded-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Update Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Product Name</label>
              <Input {...register("name", { required: "Product Name is required" })} placeholder="Product Name" />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div>
              <label className="block font-medium">Brand</label>
              <Input {...register("brand")} placeholder="Brand" />
            </div>
            <div>
              <label className="block font-medium">Price</label>
              <Input type="number" {...register("price", { required: "Price is required", valueAsNumber: true })} placeholder="Price" />
              {errors.price && <span className="text-red-500">{errors.price.message}</span>}
            </div>
            <div>
              <label className="block font-medium">Type</label>
              <Input value="Road" disabled className="bg-gray-200 cursor-not-allowed" />
            </div>
            <div>
              <label className="block font-medium">Stock</label>
              <Input type="number" {...register("stock", { required: "Stock is required", valueAsNumber: true })} placeholder="Stock" />
              {errors.stock && <span className="text-red-500">{errors.stock.message}</span>}
            </div>
            <div>
              <label className="block font-medium">SKU</label>
              <Input type="number" {...register("sku", { required: "SKU is required", valueAsNumber: true })} placeholder="SKU" />
              {errors.sku && <span className="text-red-500">{errors.sku.message}</span>}
            </div>
            <div>
              <label className="block font-medium">Category</label>
              <Input value="Bicycles" disabled className="bg-gray-200 cursor-not-allowed" />
            </div>
            <div>
              <label className="block font-medium">Image URL</label>
              <Input {...register("image_url", { required: "Image URL is required" })} placeholder="Image URL" />
              {errors.image_url && <span className="text-red-500">{errors.image_url.message}</span>}
            </div>
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <Textarea rows={4} {...register("description")} placeholder="Description" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("inStock")} />
            <label className="font-medium">In Stock</label>
          </div>
          <div>
            <h4 className="font-medium text-lg">Colors</h4>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4 mt-2">
                <Input {...register(`colors.${index}.name`)} placeholder="Color Name" />
                <input type="color" {...register(`colors.${index}.hex`)} className="w-10 h-10 border border-gray-300" />
                <Button type="button" onClick={() => remove(index)} variant="destructive">
                  <RxCross2 />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => append({ name: "", hex: "#000000" })}>
              Add Color
            </Button>
          </div>
          <Button type="submit" className="w-full p-4 text-lg bg-[#1b3e41]">
            Update Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
