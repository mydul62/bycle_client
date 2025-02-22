import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RxCross2 } from "react-icons/rx";
import { useCreateProductMutation } from "@/app/redux/api/features/product/productApi";

interface Color {
  name: string;
  hex: string;
}

interface ProductFormData {
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
  rating?:number
}

export default function AddProductForm() {
  const { register, handleSubmit, control, setValue, watch } =
    useForm<ProductFormData>({
      defaultValues: {
        brand: "Linus",
        type: "Road",
        category: "Bicycles",
        tags: ["bicycle", "shop"],
        colors: [{ name: "", hex: "#000000" }],
        inStock: true,
        rating:5
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "colors",
  });

  const [createProduct] = useCreateProductMutation();

  const onSubmit = async (data: ProductFormData) => {
    try {
      // Ensure stock status is correctly set
      data.inStock = data.stock > 0;
      const res=await createProduct(data).unwrap();
      console.log(res)
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <Card className="max-w-full w-[98%] mx-auto mt-2 border-0 shadow-none rounded-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Add New Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Product Name</label>
              <Input
                {...register("name", { required: true })}
                placeholder="Product Name"
              />
            </div>
            <div>
              <label className="block font-medium">Brand</label>
              <Input {...register("brand")} placeholder="Brand" />
            </div>
            <div>
              <label className="block font-medium">Price</label>
              <Input
                type="number"
                {...register("price", { required: true, valueAsNumber: true })}
                placeholder="Price"
              />
            </div>
            <div>
              <label className="block font-medium">Type</label>
              <Input
                value="Road"
                disabled
                className="bg-gray-200 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-medium">Stock</label>
              <Input 
  type="number" 
  {...register("stock", { required: true, valueAsNumber: true })} 
  placeholder="Stock" 
/>
            </div>
            <div>
              <label className="block font-medium">SKU</label>
              <Input 
  type="number" 
  {...register("sku", { required: true, valueAsNumber: true })} 
  placeholder="SKU" 
/>
            </div>
            <div>
              <label className="block font-medium">Category</label>
              <Input
                {...register("category")}
                value="Bicycles"
                disabled
                className="bg-gray-200 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-medium">Image URL</label>
              <Input
                {...register("image_url", { required: true })}
                placeholder="Image URL"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <Textarea
              rows={4}
              {...register("description")}
              placeholder="Description"
            />
          </div>

          {/* Stock Availability */}
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("inStock")} />
            <label className="font-medium">In Stock</label>
          </div>

          {/* Colors */}
          <div>
            <h4 className="font-medium text-lg">Colors</h4>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4 mt-2">
                <div className="w-1/3">
                  <label className="block font-medium">Color Name</label>
                  <Input
                    {...register(`colors.${index}.name`)}
                    placeholder="Color Name"
                  />
                </div>
                <div className="flex items-center gap-2 w-1/2">
                  <div>
                    <label className="block font-medium">Color</label>
                    <input
                      type="color"
                      {...register(`colors.${index}.hex`)}
                      className="w-10 h-10 p-0 border border-gray-300"
                      onChange={(e) =>
                        setValue(`colors.${index}.hex`, e.target.value)
                      }
                    />
                  </div>
                  <Input
                    {...register(`colors.${index}.hex`)}
                    readOnly
                    className="w-1/3 mt-5 border text-center"
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="destructive"
                    className="mt-5"
                  >
                    <RxCross2 />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => append({ name: "", hex: "#000000" })}
              className="mt-4"
            >
              Add Color
            </Button>
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium">Tags (comma separated)</label>
            <Input
              {...register("tags")}
              placeholder="Enter tags, e.g., bicycle, shop"
              onBlur={(e) => {
                const value = e.target.value
                  .split(",")
                  .map((tag) => tag.trim());
                setValue("tags", value);
              }}
            />
          </div>

          <Button type="submit" className="w-full p-4 text-lg bg-[#1b3e41]">
            Add Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
