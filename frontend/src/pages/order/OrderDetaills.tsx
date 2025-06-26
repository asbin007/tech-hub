import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  CreditCard,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMyOrderDetails,  cancelOrderAPI } from "../../store/orderSlice";
import { Status } from "../../globals/types/types";
import { OrderStatus } from "../checkout/types";

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg border ${
        type === "success"
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-red-50 border-red-200 text-red-800"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-sm font-medium hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case OrderStatus.Delivered:
      return "bg-green-100 text-green-800 border-green-300";
    case OrderStatus.Ontheway:
      return "bg-blue-100 text-blue-800 border-blue-300";
    case OrderStatus.Preparation:
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case OrderStatus.Pending:
      return "bg-gray-100 text-gray-800 border-gray-300";
    case OrderStatus.Cancelled:
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const canCancelOrder = (status: OrderStatus) => {
  return status === OrderStatus.Pending || status === OrderStatus.Preparation;
};

export default function OrderDetailsPage() {
  const dispatch = useAppDispatch();
  const { orderDetails, status } = useAppSelector((store) => store.orders);
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchMyOrderDetails(id));
    }
  }, [dispatch, id]);

  const order = orderDetails.find((detail) => detail.orderId === id);

  const CLOUDINARY_VERSION = "v1750340657";

  if (status === Status.LOADING) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 w-full max-w-md text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Loading...</h3>
          <p className="text-gray-600 mb-4">Fetching order details.</p>
        </div>
      </div>
    );
  }

  if (status === Status.ERROR || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 w-full max-w-md text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Order not found
          </h3>
          <p className="text-gray-600 mb-4">
            The order you're looking for doesn't exist.
          </p>
          <Link to="/my-orders">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Back to Orders
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Cancel order handler
  const handleCancelOrder = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      await dispatch(cancelOrderAPI(id)).unwrap();
      setToast({ message: "Order cancelled successfully", type: "success" });
      setIsCancelModalOpen(false);
      
      // Optionally refetch order details after cancel
      dispatch(fetchMyOrderDetails(id));
    } catch  {
      setToast({ message: "Failed to cancel order", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate order summary
  const subtotal = order?.Product?.price * order?.quantity || 0;
  const shipping = 10; // Example shipping cost
  const tax = subtotal * 0.1; // Example 10% tax
  const total = subtotal + shipping + tax;

  const rawImagePath =
    order?.Product?.image && order.Product.image.length > 0
      ? order.Product.image[0]
      : "";

  const cleanedPath = rawImagePath.replace("/uploads", "");
  const pathWithSlash = cleanedPath.startsWith("/")
    ? cleanedPath
    : "/" + cleanedPath;

  const imageUrl = rawImagePath
    ? `https://res.cloudinary.com/dxpe7jikz/image/upload/${CLOUDINARY_VERSION}${pathWithSlash}.jpg`
    : "/placeholder.jpg";

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
          <Link
            to="/my-orders"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order {order?.id}
              </h1>
              <p className="text-gray-600">
                Placed on {new Date(order?.createdAt || "").toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                  order?.Order?.orderStatus || ""
                )}`}
              >
                {order?.Order?.orderStatus
                  ? order.Order.orderStatus.charAt(0).toUpperCase() +
                    order.Order.orderStatus.slice(1)
                  : ""}
              </span>

              {canCancelOrder(order?.Order?.orderStatus) && (
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
                <h3 className="text-lg font-medium">Cancel Order {order?.id}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to cancel this order? This action cannot be
                undone. You will receive a full refund within 3-5 business days.
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
                  className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
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
            {order?.Order?.orderStatus !== OrderStatus.Cancelled && (
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                  <Truck className="h-5 w-5" />
                  Order Status
                </h3>
                <div className="space-y-4">
                  {order?.Order?.orderStatus === OrderStatus.Delivered && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Delivered</p>
                        <p className="text-sm text-green-700">
                          Delivered on{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {order?.Order?.orderStatus === OrderStatus.Ontheway && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Tracking Number:</span> TBD
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Estimated Delivery:</span>{" "}
                        {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {(order?.Order?.orderStatus === OrderStatus.Preparation ||
                    order?.Order?.orderStatus === OrderStatus.Pending) && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Estimated Delivery:</span>{" "}
                      {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
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
                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <img
                    src={imageUrl}
                    alt={order?.Product?.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {order?.Product?.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Quantity: {order?.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Category: {order?.Product?.Category?.categoryName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      रु{order?.Product?.price.toFixed(2)}
                    </p>
                    {order?.quantity > 1 && (
                      <p className="text-sm text-gray-600">
                        रु
                        {(order.Product.price * order.quantity).toFixed(2)} total
                      </p>
                    )}
                  </div>
                </div>
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
                  <span>रु{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>रु{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>रु{tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>रु{total.toFixed(2)}</span>
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
                <p className="font-medium">
                  {order?.Order?.firstName} {order?.Order?.lastName}
                </p>
                <p>{order?.Order?.addressLine}</p>
                <p>{order?.Order?.street}</p>
                <p>
                  {order?.Order?.city}, {order?.Order?.state} {order?.Order?.zipcode}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </h3>
              <div className="text-sm">
                <p className="font-medium">
                  {order?.Order?.Payment?.paymentMethod}
                </p>
                <p className="text-gray-600">
                  Status: {order?.Order?.Payment?.paymentStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
