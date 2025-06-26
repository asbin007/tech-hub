import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import ProductCard from "./ProductCard";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery();
  const keyword = query.get("query")?.toLowerCase() || "";
  const { products } = useAppSelector((store) => store.product);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(keyword) ||
      p.brand.toLowerCase().includes(keyword)
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Search Results for: <span className="text-blue-600">"{keyword}"</span>
      </h2>

      {filtered.length === 0 ? (
        <p className="text-gray-600">No matching products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
