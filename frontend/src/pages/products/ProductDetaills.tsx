import  { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProducts, getSingleProduct } from "../../store/productSlice";
import {
  Heart,
  Star,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Status } from "../../globals/types/types";
import { addToCart } from "../../store/cartSlice";
import toast from "react-hot-toast";
import Review from "./Review";

export default function ProductDetailsPage() {
  const isLoggedIn = useAppSelector(
    (store) => !!store.auth.user.token || !!localStorage.getItem("token")
  );
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product, status } = useAppSelector((store) => store.product);
  const { review } = useAppSelector((store) => store.review);

  const [selectedRAM, setSelectedRAM] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (id) {
      dispatch(getProducts())
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      const cleanString = (value: string) =>
        typeof value === "string" ? value.replace(/^\["|"\]$/g, "") : value || "";

      setSelectedRAM(cleanString(product.RAM?.[0]));
      setSelectedStorage(cleanString(product.ROM?.[0]));
      setSelectedColor(cleanString(product.color?.[0]));
      setSelectedSize(cleanString(product.size?.[0]));

      const firstImage = product.image?.[0]
        ? `https://res.cloudinary.com/dxpe7jikz/image/upload/v1750340657${product.image[0].replace(
            "/uploads",
            ""
          )}.jpg`
        : "";
      setSelectedImage(firstImage);
    }
  }, [product]);

  if (status === Status.LOADING || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading product details...</p>
      </div>
    );
  }

  const ramPrices = {
    "8GB": 0,
    "16GB": 200,
    "32GB": 600,
  };

  const storagePrices = {
    "256": 0,
    "512": 200,
    "1TB": 500,
    "2TB": 1000,
  };

  const parsedRam = ramPrices[selectedRAM.toUpperCase() as keyof typeof ramPrices] || 0;
  const parsedStorage =
    storagePrices[
      selectedStorage.toUpperCase() as keyof typeof storagePrices
    ] || 0;
  const totalPrice = product.price + parsedRam + parsedStorage;

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to add to cart.");
      return;
    }

    if (!product?.id || !selectedSize || !selectedColor || !selectedRAM || !selectedStorage) {
      toast.error("Please select size, color, RAM, and storage first.");
      return;
    }

    const cleanString = (value: string) => value.replace(/^\["|"\]$/g, "");

    await dispatch(
      addToCart(
        product.id,
        cleanString(selectedSize),
        cleanString(selectedColor),
        cleanString(selectedRAM),
        cleanString(selectedStorage)
      )
    );
    toast.success("Item added to cart successfully!");
  };

  const averageRating =
    review.length > 0
      ? review.reduce((sum, r) => sum + (r.rating ?? 0), 0) / review.length
      : 0;
  const roundedRating = Math.round(averageRating);


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4">
            {product.image.map((img, idx) => {
              const thumbUrl = `https://res.cloudinary.com/dxpe7jikz/image/upload/v1750340657${img.replace(
                "/uploads",
                ""
              )}.jpg`;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(thumbUrl)}
                  className="w-16 h-16 rounded-md overflow-hidden border border-gray-300"
                  type="button"
                >
                  <img
                    src={thumbUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          {product.isNew && (
            <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
              NEW
            </span>
          )}
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex items-center gap-2 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < roundedRating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill={i < roundedRating ? "currentColor" : "none"}
              />
            ))}
          </div>

          <div className="text-3xl font-bold text-gray-900">
            ${totalPrice.toLocaleString()}
          </div>

          <p className="text-sm text-gray-600">
            Stock Status:{" "}
            <span
              className={product.inStock ? "text-green-600" : "text-red-600"}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>{" "}
            | Total Stock: {product.totalStock}
          </p>

          {[{ label: "RAM", items: product.RAM, selected: selectedRAM, set: setSelectedRAM },
            { label: "Storage", items: product.ROM, selected: selectedStorage, set: setSelectedStorage },
            { label: "Color", items: product.color, selected: selectedColor, set: setSelectedColor },
            { label: "Size", items: product.size, selected: selectedSize, set: setSelectedSize }
          ].map(({ label, items, selected, set }) => (
            <div key={label} className="space-y-2">
              <label className="block font-medium">Select {label}</label>
              {items.map((item) => (
                <button
                  key={item}
                  className={`px-4 py-2 rounded-md border ${
                    selected === item
                      ? "bg-blue-100 border-blue-600"
                      : "border-gray-300"
                  }`}
                  onClick={() => set(item)}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
          ))}

          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md flex items-center justify-center hover:bg-blue-700"
              type="button"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart - ${totalPrice.toLocaleString()}
            </button>
            <button
              className="w-full border border-gray-300 py-3 px-6 rounded-md flex items-center justify-center hover:bg-gray-100"
              type="button"
            >
              <Heart className="w-5 h-5 mr-2" />
              Add to Wishlist
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 text-sm">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-green-600" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>2 Year Warranty</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="w-4 h-4 text-orange-600" />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="border-b flex space-x-4">
          {["description", "keyFeatures", "spec", "review"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border-b-2 font-semibold ${
                activeTab === tab
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-blue-600"
              }`}
            >
              {tab === "keyFeatures"
                ? "Key Features"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6 prose max-w-none text-gray-700">
          {activeTab === "description" && (
            <>
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              {product.description.map((desc, idx) => (
                <p key={idx}>{desc}</p>
              ))}
            </>
          )}
          {activeTab === "keyFeatures" && (
            <>
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="list-disc pl-5">
                {product.keyFeatures.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </>
          )}
          {activeTab === "spec" && (
            <>
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <ul className="list-disc pl-5">
                {product.spec.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}
          {activeTab === "review" && (
            <Review
              key={product.id}
              productId={product.id}
              review={review.map((r: any) => ({
                id: r.id,
                rating: r.rating,
                comment: r.comment,
                userId: r.userId,
                productId: r.productId,
                createdAt: r.createdAt,
                updatedAt: r.updatedAt ?? r.createdAt,
                User: r.User ?? null,
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
