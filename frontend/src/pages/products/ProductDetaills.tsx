import React, { useState } from "react"
import { Heart, Star, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"

export default function ProductDetails() {
  const [selectedRAM, setSelectedRAM] = useState("16gb")
  const [selectedStorage, setSelectedStorage] = useState("512gb")
  const [selectedColor, setSelectedColor] = useState("space-gray")
  const [selectedSize, setSelectedSize] = useState("14-inch")
  const [quantity, setQuantity] = useState("1")
  const [activeTab, setActiveTab] = useState("description")

  const basePrice = 1299
  const ramPrices = { "8gb": 0, "16gb": 200, "32gb": 600 }
  const storagePrices = { "256gb": 0, "512gb": 200, "1tb": 500, "2tb": 1000 }

  const totalPrice =
    (basePrice +
      ramPrices[selectedRAM as keyof typeof ramPrices] +
      storagePrices[selectedStorage as keyof typeof storagePrices]) *
    Number(quantity)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src="/placeholder.svg?height=600&width=600"
              alt="MacBook Pro"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-transparent hover:border-blue-600 transition-colors"
                type="button"
              >
                <img
                  src={`/placeholder.svg?height=150&width=150`}
                  alt={`Product view ${i}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <span className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mb-2">
              New Release
            </span>
            <h1 className="text-3xl font-bold text-gray-900">MacBook Pro 14-inch with M3 Pro Chip</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(128 reviews)</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900">${totalPrice.toLocaleString()}</div>

          {/* RAM Selection */}
          <fieldset className="space-y-3">
            <legend className="text-base font-medium">Memory (RAM)</legend>
            {["8gb", "16gb", "32gb"].map((ram) => (
              <label
                key={ram}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  selectedRAM === ram ? "border-blue-600 bg-blue-100" : "border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="ram"
                    value={ram}
                    checked={selectedRAM === ram}
                    onChange={() => setSelectedRAM(ram)}
                  />
                  <div>
                    <div className="font-medium">
                      {ram === "8gb" ? "8GB" : ram === "16gb" ? "16GB" : "32GB"} Unified Memory
                    </div>
                    <div className="text-sm text-gray-500">
                      {ram === "8gb"
                        ? "Good for everyday tasks"
                        : ram === "16gb"
                        ? "Great for multitasking"
                        : "Perfect for pro workflows"}
                    </div>
                  </div>
                </div>
                <div className="font-medium">+${ramPrices[ram as keyof typeof ramPrices]}</div>
              </label>
            ))}
          </fieldset>

          {/* Storage */}
          <fieldset className="space-y-3">
            <legend className="text-base font-medium">Storage</legend>
            {["256gb", "512gb", "1tb", "2tb"].map((storage) => (
              <label
                key={storage}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  selectedStorage === storage ? "border-blue-600 bg-blue-100" : "border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="storage"
                    value={storage}
                    checked={selectedStorage === storage}
                    onChange={() => setSelectedStorage(storage)}
                  />
                  <div className="font-medium">{storage.toUpperCase()} SSD Storage</div>
                </div>
                <div className="font-medium">+${storagePrices[storage as keyof typeof storagePrices]}</div>
              </label>
            ))}
          </fieldset>

          {/* Color */}
          <fieldset className="space-y-3">
            <legend className="text-base font-medium">Color</legend>
            <div className="flex gap-4">
              {[
                { value: "space-gray", bg: "bg-gray-700" },
                { value: "silver", bg: "bg-gray-300" },
                { value: "gold", bg: "bg-yellow-400" },
              ].map(({ value, bg }) => (
                <label key={value} className="flex flex-col items-center space-y-2 cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    value={value}
                    checked={selectedColor === value}
                    onChange={() => setSelectedColor(value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === value ? "border-blue-600" : "border-gray-300"} ${bg}`}
                  />
                  <span className="text-sm capitalize">{value.replace("-", " ")}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Size */}
          <fieldset className="space-y-3">
            <legend className="text-base font-medium">Size</legend>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "14-inch", label: "14-inch", desc: "Portable" },
                { value: "16-inch", label: "16-inch", desc: "More screen" },
              ].map(({ value, label, desc }) => (
                <label
                  key={value}
                  className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    selectedSize === value ? "border-blue-600 bg-blue-100" : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="size"
                    value={value}
                    checked={selectedSize === value}
                    onChange={() => setSelectedSize(value)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="font-medium">{label}</div>
                    <div className="text-sm text-gray-500">{desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Quantity */}
          <div className="space-y-3">
            <label className="text-base font-medium block">Quantity</label>
            <select
              className="w-24 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-md flex items-center justify-center hover:bg-blue-700" type="button">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart - ${totalPrice.toLocaleString()}
            </button>
            <button className="w-full border border-gray-300 py-3 px-6 rounded-md flex items-center justify-center hover:bg-gray-100" type="button">
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
          {["description", "features", "specs"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border-b-2 font-semibold ${
                activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab === "features" ? "Key Features" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6 prose max-w-none">
          {activeTab === "description" && (
            <>
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p className="text-gray-600 mb-4">The MacBook Pro 14-inch with M3 Pro chip delivers exceptional performance...</p>
            </>
          )}

          {activeTab === "features" && (
            <>
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Apple M3 Pro chip with up to 12-core CPU and 18-core GPU</li>
                <li>Stunning 14.2-inch Liquid Retina XDR display</li>
                <li>All-day battery life</li>
                <li>Advanced cooling system</li>
                <li>macOS Sonoma optimized for Apple silicon</li>
              </ul>
            </>
          )}

          {activeTab === "specs" && (
            <>
              <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
              <table className="w-full text-sm text-gray-700">
                <tbody>
                  <tr><td>Chip:</td><td>Apple M3 Pro</td></tr>
                  <tr><td>Memory:</td><td>Up to 32GB unified memory</td></tr>
                  <tr><td>Display:</td><td>14.2" Liquid Retina XDR, 3024x1964</td></tr>
                  <tr><td>Ports:</td><td>3x Thunderbolt 4, HDMI, SDXC, MagSafe 3</td></tr>
                  <tr><td>Weight:</td><td>3.5 lbs</td></tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
