

import { useState } from "react";
import { ArrowLeft, Package, Truck, MapPin, CreditCard, AlertTriangle, CheckCircle } from "lucide-react"; // Mock order details data (unchanged)
import { Link, useNavigate, useParams } from "react-router-dom";
const orderDetails = {
  "ORD-001001": {
    id: "ORD-001",
    date: "2024-01-2024-15",
    status: "delivered",
    total: 129.99,
    subtotal: 119.99,
    shipping: 0.0,
    tax: 0.0,
    estimatedDelivery: "2024-01-2024-18",
    actualDelivery: "2024-01-2024-17",
    trackingNumber: "1Z999AA1234567890",
    items: [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        name: "Phone Case - Clear",
        price: 19.99,
        quantity: 2,
        image: "/placeholder.svg?height=80",
      },
    ],
    shippingAddress: {
      shippingAddress: {
      name: "John Doe",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
      },
      paymentMethod: {
        type: "Credit Card",
        last4: "4242",
        brand: "Visa",
      },
    },
  },
  // ... other orders (ORD-002, ORD-003, ORD-004) remain unchanged
};

// Status color mapping (unchanged)
const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green text-800 border-green-200";
    case "shipped":
      return "bg-blue-100 text-blue-800 text-200 border-blue";
    case "processing":
      return "bg-yellow-100 text-yellow-800 border-yellow";
    case "confirmed":
      return "bg-purple-100 text-purple-200 border-purple";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Check if order can be canceled (unchanged)
const canCancelOrder = (status: string) => {
  return status === "confirmed" || status === "processing";
};

// Custom Toast component
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg border ${type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-sm font-medium hover:underline">
          Close
        </button>
      </div>
    </div>
  );
}

export default function OrderDetailsPage() {
  const params = useParams();
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const orderId = params.id as string;
  const order = orderDetails[orderId as keyof typeof orderDetails];

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 w-full max-w-md text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Order not found</h3>
          <p className="text-gray-600 mb-4">The order you're looking for doesn't exist.</p>
          <Link to="/my-orders">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Back to Orders
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleCancelOrder = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setToast({
        message: `Order ${order.id} has been successfully cancelled.`,
        type: "success",
      });
      setIsCancelModalOpen(false);
      navigate("/my-orders");
    } catch  {
      setToast({
        message: "Failed to cancel order. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link to="/my-orders" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order {order.id}</h1>
              <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>

              {canCancelOrder(order.status) && (
                <button
                  onClick={() => setIsCancelModalOpen(true)}
                  className="px-4 py-2 bg-white text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Cancel Order Modal */}
        {isCancelModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-medium">Cancel Order {order.id}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to cancel this order? This action cannot be undone. You will receive a full refund
                within 3-5 business days.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsCancelModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Keep Order
                </button>
                <button
                  onClick={handleCancelOrder}
                  disabled={isLoading}
                  className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? "Cancelling..." : "Cancel Order"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status & Tracking */}
            {order.status !== "cancelled" && (
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                  <Truck className="h-5 w-5" />
                  Order Status
                </h3>
                <div className="space-y-4">
                  {order.status === "delivered" && order.actualDelivery && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Delivered</p>
                        <p className="text-sm text-green-700">
                          Delivered on {new Date(order.actualDelivery).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {order.status === "shipped" && order.trackingNumber && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Estimated Delivery:</span>{" "}
                        {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {(order.status === "confirmed" || order.status === "processing") && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Estimated Delivery:</span>{" "}
                      {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <Package className="h-5 w-5" />
                Order Items
              </h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.image || "/fallback-image.jpg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-600">${(item.price * item.quantity).toFixed(2)} total</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">{order.shippingAddress.shippingAddress.name}</p>
                <p>{order.shippingAddress.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.shippingAddress.city}, {order.shippingAddress.shippingAddress.state} {order.shippingAddress.shippingAddress.zip}
                </p>
                <p>{order.shippingAddress.shippingAddress.country}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </h3>
              <div className="text-sm">
                <p className="font-medium">{order.shippingAddress.paymentMethod.type}</p>
                <p className="text-gray-600">
                  {order.shippingAddress.paymentMethod.brand} ending in {order.shippingAddress.paymentMethod.last4}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}