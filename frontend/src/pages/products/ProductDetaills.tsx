import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { product, status } = useAppSelector((store) => store.product);

  const [selectedRAM, setSelectedRAM] = useState("16gb");
  const [selectedStorage, setSelectedStorage] = useState("512gb");
  const [selectedColor, setSelectedColor] = useState("space-gray");
  const [selectedSize, setSelectedSize] = useState("14-inch");
  const [quantity, setQuantity] = useState("1");

  // For tabs: 'description', 'keyFeatures', 'spec'
  const [activeTab, setActiveTab] = useState<"description" | "keyFeatures" | "spec">("description");

  useEffect(() => {
    if (id) {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id]);

  if (status === Status.LOADING || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading product details...</p>
      </div>
    );
  }

  const CLOUDINARY_VERSION = "v1750340657";
  const imageUrl =
    product.image && product.image[0]
      ? `https://res.cloudinary.com/dxpe7jikz/image/upload/${CLOUDINARY_VERSION}${product.image[0].replace(
          "/uploads",
          ""
        )}.jpg`
      : "https://via.placeholder.com/300x300?text=No+Image";

  const ramPrices = { "8gb": 0, "16gb": 200, "32gb": 600 };
  const storagePrices = { "256gb": 0, "512gb": 200, "1tb": 500, "2tb": 1000 };

  const totalPrice =
    (product.price +
      ramPrices[selectedRAM as keyof typeof ramPrices] +
      storagePrices[selectedStorage as keyof typeof storagePrices]) *
    Number(quantity);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnail images */}
          <div className="flex gap-4">
            {product.image.map((img: string, idx: number) => {
              const thumbUrl = `https://res.cloudinary.com/dxpe7jikz/image/upload/${CLOUDINARY_VERSION}${img.replace(
                "/uploads",
                ""
              )}.jpg`;
              return (
                <button
                  key={idx}
                  onClick={() =>
                    // Update main image on thumbnail click
                    // For simplicity, change imageUrl state
                    // We'll add imageUrl state for this
                    setSelectedImage(thumbUrl)
                  }
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
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900">
            ${totalPrice.toLocaleString()}
          </div>

          {/* RAM Selection */}
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

          {/* Storage Selection */}
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

          {/* Color Selection */}
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

          {/* Size Selection */}
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

          {/* Quantity */}
          <div className="space-y-2">
            <label className="block font-medium">Quantity</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num.toString()}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <button
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
              onClick={() =>
                setActiveTab(
                  tab as "description" | "keyFeatures" | "spec"
                )
              }
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
