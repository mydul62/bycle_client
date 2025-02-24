/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { IoFilterSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ShopCard from "@/app/Components/models/shopCard/ShopCard";
import { useGetAllProductQuery } from "@/app/redux/api/features/product/productApi";
import { IProduct } from "@/app/types/types";
import ShopCardSkeleton from "@/app/Components/skeletons/ShopCardSkeleton";

const ShopPage = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 100000]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("createdAt");
  const [page, setPage] = useState<number>(1);
  const limit = 6;

  const { data, isLoading } = useGetAllProductQuery({
    search: searchTerm,
  });

  const bicycles = data?.data;

  let categories: any[] = [];
  
  // Check if bicycles data is available
  if (bicycles) {
    const uniqueCategories = new Set();

    bicycles.forEach((b: { category: string }) => {
      uniqueCategories.add(b.category);
    });

    categories = Array.from(uniqueCategories);
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = data?.data?.filter((product: IProduct) => {
    const isPriceFiltered = priceRange[0] !== 10 || priceRange[1] !== 100000;
    const isWithinPriceRange = !isPriceFiltered || (product.price >= priceRange[0] && product.price <= priceRange[1]);
    
    const isInSelectedCategory = selectedCategories.length
      ? selectedCategories.includes(product.category)
      : true;
  
    return isWithinPriceRange && isInSelectedCategory;
  }) || [];
  
  const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    if (data?.data) {
      setPage(1);
    }
  }, [selectedCategories, searchTerm, priceRange]);

  return (
    <div className="bg-[#f0f2f2] relative">
      <div
        style={{
          backgroundImage: "url('https://i.ibb.co/k2rdkVtn/image-6.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="h-[300px] md:h-[400px] lg:h-[500px] relative"
      >
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-[#363535b4]">
          <div className="space-y-3 md:space-y-4 mt-6 md:mt-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-white font-extrabold text-center">
              Shop
            </h2>
            <div className="flex justify-center items-center text-white text-sm md:text-base">
              <Link className="hover:text-green-400" to="/">Home /</Link>
              <Link className="hover:text-green-400" to="/shop">Shop</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-6 p-4 md:p-6">
        <div className="md:col-span-2 md:sticky top-[85px] self-start">
          <aside className="w-full space-y-4 md:space-y-6 bg-white p-4 md:p-6">
            <Input
              placeholder="Search for products..."
              className="rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="space-y-4 md:space-y-6 hidden md:block">
              <h2 className="font-semibold flex items-center gap-2 text-sm md:text-base">
                <IoFilterSharp /> Filter
              </h2>
              <Slider
                min={10}
                max={100000}
                value={priceRange}
                onValueChange={(val) => setPriceRange(val as [number, number])}
              />
              <p className="text-xs md:text-sm text-gray-600">
                Price: ${priceRange[0]}
              </p>
              <h3 className="font-semibold text-sm md:text-base">Category</h3>
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </aside>
        </div>
        <main className="md:col-span-5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 text-sm md:text-base">
            <p>Showing {paginatedProducts.length} of {filteredProducts.length} results</p>
            <select
              className="border p-2 rounded-md text-sm md:text-base"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="createdAt">Sort by latest</option>
              <option value="price">Sort by price</option>
              <option value="name">Sort by name</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {isLoading
              ? Array.from({ length: limit }).map((_, index) => <ShopCardSkeleton key={index} />)
              : paginatedProducts.length > 0
              ? paginatedProducts.map((bike: IProduct) => <ShopCard key={bike.sku || bike.name} bike={bike} />)
              : <div className="text-center py-10 text-gray-500 text-lg">No products found.</div>}
          </div>
          <div className="flex justify-between mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`p-2 rounded ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 text-white"}`}
            >
              Prev
            </button>
            <button
              onClick={() => setPage(page + 1)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
