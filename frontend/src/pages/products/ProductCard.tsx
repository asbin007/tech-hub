import { Link } from "react-router-dom";
import type { IProduct } from "../../store/productSlice";

// Redefine ICardProps to match Product model
interface ICardProps {
  product: Omit<IProduct, "image"> & {
    image: string[]; 
    Category: { categoryName: string };
  };
}

const CLOUDINARY_VERSION = "v1750340657"; 

const ProductCard: React.FC<ICardProps> = ({ product }) => {
  const imageUrl =
    product.image && product.image[0]
      ? `https://res.cloudinary.com/dxpe7jikz/image/upload/${CLOUDINARY_VERSION}${product.image[2].replace(
          "/uploads",
          ""
        )}.jpg`
      : "https://via.placeholder.com/300x300?text=No+Image";

  // Calculate original price safely
  const originalPrice =
    product.discount && product.discount > 0
      ? ((product.price * 100) / (100 - product.discount)).toFixed(2)
      : null;

  return (
    <Link
      to={`/${
        product.Category?.categoryName?.toLowerCase() || "product"
      }/${product.brand?.toLowerCase() || "brand"}/${product.id}`}
      className="block"
    >
      <div className="group relative bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2 z-10">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              New
            </span>
          )}
          {product.discount && product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              -{product.discount}%
            </span>
          )}
        </div>


        {/* Product Image */}
        
        <div className="w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name || "Product image"}
            className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg line-clamp-1">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.brand}</p>
            </div>
            <span className="text-sm bg-gray-200 px-2 py-1 rounded truncate max-w-[100px]">
              {product.Category?.categoryName || "Unknown"}
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="font-bold text-indigo-600">
                रु{product.price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-gray-400 text-sm line-through ml-2">
                  रु{originalPrice}
                </span>
              )}
            </div>
            <button
              aria-label="Add to cart"
              className="text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
