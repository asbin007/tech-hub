import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProducts } from "../../store/productSlice";

const ProductFilters = () => {
  const [activeBrand, setActiveBrand] = useState<string>("All");
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((store) => store.product);
  const { brand, categoryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setActiveBrand(brand || "All");
  }, [brand]);

  // Convert categoryName to a readable format (e.g., "2-in-1-laptops" => "2-in-1 Laptops")
  const formattedCategoryName = categoryName?.replace(/-/g, " ").toLowerCase();

  const brands = ["All", ...new Set(products.map((product) => product.brand))];

  const filtered = products.filter((product) => {
    const matchBrand = brand
      ? product.brand.toLowerCase() === brand.toLowerCase()
      : true;

    const matchCategory = formattedCategoryName
      ? product.Category?.categoryName.toLowerCase() === formattedCategoryName
      : true;

    return matchBrand && matchCategory;
  });

  const handleBrandClick = (selectedBrand: string) => {
    if (selectedBrand === "All") navigate(`/${categoryName}`);
    else navigate(`/${categoryName}/${selectedBrand}`);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Bestsellers Products</h2>

        {/* Brand Filter Buttons */}
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-2 min-w-max">
            {brands.map((brand) => (
              <button
                onClick={() => handleBrandClick(brand)}
                key={brand}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeBrand === brand
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-12 bg-white flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  image: Array.isArray(product.image)
                    ? product.image
                    : ([product.image].filter(Boolean) as string[]),
                }}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No products found for this filter.
            </p>
          )}
        </div>
      </section>

      {/* View More Button */}
      <div className="mt-12 text-center">
        <button className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md font-medium transition duration-300">
          View More Products
        </button>
      </div>
    </section>
  );
};

export default ProductFilters;
