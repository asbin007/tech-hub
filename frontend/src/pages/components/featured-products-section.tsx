import { ArrowRight, Heart, Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number | null;
  image: string;
  rating: number;
  reviews: number;
  badge: string;
  specs: string;
  discount: number | null;
}

const FeaturedProductsSection = ({ products }: { products: Product[] }) => {
  return (
    <section
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      aria-label="Featured Products"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-500 text-lg">
              Handpicked laptops with the best performance and value
            </p>
          </div>
          <button
            className="hidden md:flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-medium px-4 py-2 rounded-md transition-all"
            aria-label="View all products"
          >
            View All Products
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden rounded-lg">
      <div className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span
              className={`${
                product.badge === "Hot Deal"
                  ? "bg-gradient-to-r from-red-500 to-pink-500"
                  : product.badge === "Gaming Beast"
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                  : "bg-gradient-to-r from-green-500 to-emerald-500"
              } text-white border-0 font-semibold px-3 py-1 rounded-md`}
            >
              {product.badge}
            </span>
            {product.discount && (
              <span className="bg-yellow-400 text-black border-0 font-bold px-3 py-1 rounded-md">
                -{product.discount}%
              </span>
            )}
          </div>
          <button
            className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg rounded-full p-2"
            aria-label={`Add ${product.name} to wishlist`}
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">
              {product.brand}
            </span>
            <div className="flex items-center gap-1">
              <Star
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                aria-hidden="true"
              />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          </div>

          <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500 mb-4">{product.specs}</p>

          <div className="flex items-center gap-1 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-1">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold py-2 rounded-xl text-white"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsSection;
