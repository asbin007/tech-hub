import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getSingleProduct } from "../../store/productSlice";
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

export default function ProductDetailsPage() {
  const isLoggedIn = useAppSelector(
    (store) => !!store.auth.user.token || !!localStorage.getItem("token")
  );
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { product, status } = useAppSelector((store) => store.product);

  const [selectedRAM, setSelectedRAM] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState("1");

  const [activeTab, setActiveTab] = useState<
    "description" | "keyFeatures" | "spec"
  >("description");

  useEffect(() => {
    if (id) {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setSelectedRAM(product.RAM?.[0] || "");
      setSelectedStorage(product.ROM?.[0] || "");
      setSelectedColor(product.color?.[0] || "");
      setSelectedSize(product.size?.[0] || "");
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

  const ramPrices: Record<string, number> = {
    "8GB": 0,
    "16GB": 200,
    "32GB": 600,
  };

  const storagePrices: Record<string, number> = {
    "256": 0,
    "512": 200,
    "1TB": 500,
    "2TB": 1000,
  };

  const parsedRam = ramPrices[selectedRAM.toUpperCase()] || 0;
  const parsedStorage = storagePrices[selectedStorage.toUpperCase()] || 0;

  const totalPrice =
    (product.price + parsedRam + parsedStorage) * Number(quantity);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("Please log in to add to cart");
      return;
    }

    if (
      !product?.id ||
      !selectedSize ||
      !selectedColor ||
      !selectedRAM ||
      !selectedStorage
    ) {
      alert(
        "Please select size, color, RAM, and storage before adding to cart."
      );
      return;
    }

    await dispatch(
      addToCart(
        product.id,
        selectedSize,
        selectedColor,
        selectedRAM,
        selectedStorage
      )
    );

    alert("Item added to Cart Successfully");

    navigate("/all-laptops");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4">
            {product.image.map((img: string, idx: number) => {
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

        {/* Product Details */}
        <div className="space-y-6">
          {/* NEW tag */}
          {product.isNew && (
            <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
              NEW
            </span>
          )}

          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= 4
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Pricing */}
          <div className="text-3xl font-bold text-gray-900">
            ${totalPrice.toLocaleString()}
          </div>

          {/* Stock Info */}
          <p className="text-sm text-gray-600">
            Stock Status:{" "}
            <span
              className={product.inStock ? "text-green-600" : "text-red-600"}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>{" "}
            | Total Stock: {product.totalStock}
          </p>

          {/* RAM */}
          <div className="space-y-2">
            <label className="block font-medium">Select RAM</label>
            {product.RAM.map((ram) => (
              <button
                key={ram}
                className={`px-4 py-2 rounded-md border ${
                  selectedRAM === ram
                    ? "bg-blue-100 border-blue-600"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedRAM(ram)}
              >
                {ram.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Storage */}
          <div className="space-y-2">
            <label className="block font-medium">Select Storage</label>
            {product.ROM.map((rom) => (
              <button
                key={rom}
                className={`px-4 py-2 rounded-md border ${
                  selectedStorage === rom
                    ? "bg-blue-100 border-blue-600"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedStorage(rom)}
              >
                {rom.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Color */}
          <div className="space-y-2">
            <label className="block font-medium">Select Color</label>
            {product.color.map((color) => (
              <button
                key={color}
                className={`px-4 py-2 rounded-md border ${
                  selectedColor === color
                    ? "bg-blue-100 border-blue-600"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color.replace("-", " ").toUpperCase()}
              </button>
            ))}
          </div>

          {/* Size */}
          <div className="space-y-2">
            <label className="block font-medium">Select Size</label>
            {product.size.map((size) => (
              <button
                key={size}
                className={`px-4 py-2 rounded-md border ${
                  selectedSize === size
                    ? "bg-blue-100 border-blue-600"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Buttons */}
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

          {/* Info Icons */}
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
          {["description", "keyFeatures", "spec"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
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
              <h3 className="text-xl font-semibold mb-4">
                Product Description
              </h3>
              {product.description.map((desc, idx) => (
                <p key={idx} className="mb-2">
                  {desc}
                </p>
              ))}
            </>
          )}
          {activeTab === "keyFeatures" && (
            <>
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.keyFeatures.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </>
          )}
          {activeTab === "spec" && (
            <>
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.spec.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
