"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { cancelOrderAPI, fetchMyOrderDetails, updatePaymentStatusinSlice } from "../../store/orderSlice";
import { Status } from "../../globals/types/types";
import { OrderStatus, PaymentStatus } from "../checkout/types";
import { socket } from "../../App";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg border z-50 ${
        type === "success"
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-red-50 border-red-200 text-red-800"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="text-sm font-medium underline">
          Close
        </button>
      </div>
    </div>
  );
}

const getStatusColor = (status: OrderStatus | undefined) => {
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

const canCancelOrder = (status: OrderStatus | undefined) =>
  [OrderStatus.Pending, OrderStatus.Preparation, OrderStatus.Ontheway].includes(
    status ?? OrderStatus.Pending
  );

const getPaymentMethodLabel = (method?: string) => {
  switch (method) {
    case "esewa":
      return "eSewa";
    case "khalti":
      return "Khalti";
    case "cod":
      return "Cash on Delivery";
    default:
      return "Unknown";
  }
};

const getPaymentStatusLabel = (status?: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.Paid:
      return "Paid";
    case PaymentStatus.Unpaid:
      return "Unpaid";
    default:
      return "Unknown";
  }
};

export default function OrderDetailsPage() {
  const dispatch = useAppDispatch();
  const { orderDetails, status } = useAppSelector((store) => store.orders);
  const { id } = useParams();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Log orderDetails when component mounts or orderDetails changes
  useEffect(() => {
    if (id) {
      console.log("Before fetching order details for ID:", id);
      dispatch(fetchMyOrderDetails(id)).then(() => {
        console.log("After fetching order details:", orderDetails);
        console.log("Current paymentStatus:", orderDetails.find((o) => o.orderId === id)?.Order?.Payment?.paymentStatus || "Not found");
      });
    }
  }, [dispatch, id]);

  // Log orderDetails when it changes
  useEffect(() => {
    console.log("orderDetails updated:", orderDetails);
    console.log("Current paymentStatus:", orderDetails.find((o) => o.orderId === id)?.Order?.Payment?.paymentStatus || "Not found");
  }, [orderDetails, id]);

  // Socket listeners for live updates
  useEffect(() => {
    if (!id) return;

    const onStatusUpdated = (data: { orderId: string; status: OrderStatus }) => {
      console.log("Received statusUpdated event:", data);
      if (data.orderId === id) {
        dispatch(fetchMyOrderDetails(id)).then(() => {
          console.log("After statusUpdated fetch, paymentStatus:", orderDetails.find((o) => o.orderId === id)?.Order?.Payment?.paymentStatus || "Not found");
        });
      }
    };

    const onPaymentStatusUpdated = (data: {
      orderId: string;
      paymentId: string;
      status?: PaymentStatus;
      paymentStatus?: PaymentStatus; 
    }) => {
      console.log("Received paymentStatusUpdated event:", data);
      if (data.orderId === id) {
        const newPaymentStatus = data.paymentStatus || data.status;
        if (newPaymentStatus) {
          dispatch(
            updatePaymentStatusinSlice({
              paymentStatus: newPaymentStatus,
              orderId: data.orderId,
              paymentId: data.paymentId,
            })
          );
          dispatch(fetchMyOrderDetails(id)).then(() => {
            console.log("After paymentStatusUpdated fetch, paymentStatus:", orderDetails.find((o) => o.orderId === id)?.Order?.Payment?.paymentStatus || "Not found");
          });
        } else {
          console.error("Invalid paymentStatus in paymentStatusUpdated event:", data);
        }
      }
    };

    console.log("Socket listeners set up for order ID:", id);
    socket.on("statusUpdated", onStatusUpdated);
    socket.on("paymentStatusUpdated", onPaymentStatusUpdated);

    return () => {
      socket.off("statusUpdated", onStatusUpdated);
      socket.off("paymentStatusUpdated", onPaymentStatusUpdated);
    };
  }, [dispatch, id, orderDetails]);

  const order = orderDetails.find((o) => o.orderId === id);
  const CLOUDINARY_VERSION = "v1750340657";

  const rawImage = order?.Product?.image?.[0] || "";
  const imageUrl = rawImage
    ? `https://res.cloudinary.com/dxpe7jikz/image/upload/${CLOUDINARY_VERSION}/${rawImage.replace(
        "/uploads",
        ""
      )}.jpg`
    : "/placeholder.jpg";

  const handleCancelOrder = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      await dispatch(cancelOrderAPI(id)).unwrap();
      setToast({ message: "Order cancelled successfully", type: "success" });
      setIsCancelModalOpen(false);
      dispatch(fetchMyOrderDetails(id)).then(() => {
        console.log("After cancelOrder, paymentStatus:", orderDetails.find((o) => o.orderId === id)?.Order?.Payment?.paymentStatus || "Not found");
      });
    } catch {
      setToast({ message: "Failed to cancel order", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal = (order?.Product?.price || 0) * (order?.quantity ?? 0);
  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (status === Status.LOADING) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="p-6 bg-white shadow rounded text-center">
          <Package className="mx-auto mb-2 text-gray-500" size={40} />
          <h2 className="font-semibold text-lg">Loading...</h2>
        </div>
      </div>
    );
  }

  if (status === Status.ERROR || !order) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="p-6 bg-white shadow rounded text-center">
          <Package className="mx-auto mb-2 text-gray-500" size={40} />
          <h2 className="font-semibold text-lg">Order not found</h2>
          <Link to="/my-orders">
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
              Back to Orders
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <Link
              to="/my-orders"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              Back to Orders
            </Link>
            <h1 className="text-2xl font-semibold mt-2">Order #{order.id}</h1>
            <p className="text-sm text-gray-600">
              Placed on {new Date(order?.createdAt || "").toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(
                order?.Order?.orderStatus
              )}`}
            >
              {order?.Order?.orderStatus}
            </span>
            {canCancelOrder(order?.Order?.orderStatus) && (
              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="text-red-600 border border-red-300 px-3 py-1 rounded hover:bg-red-50 text-sm"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>

        {/* Cancel Modal */}
        {isCancelModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-red-500" />
                <h3 className="text-lg font-semibold">Cancel Order</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsCancelModalOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  No
                </button>
                <button
                  onClick={handleCancelOrder}
                  disabled={isLoading}
                  className={`px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Cancelling..." : "Yes, Cancel"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Order Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow border">
              <h3 className="font-medium flex items-center gap-2 mb-4 text-lg">
                <Package size={18} />
                Item
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <img
                  src={imageUrl}
                  alt="Product"
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{order.Product.name}</h4>
                  <p className="text-sm text-gray-600">
                    Quantity: {order.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Category: {order.Product.Category?.categoryName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    रु{(order.Product.price * order.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Status */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow border">
              <h3 className="text-lg font-medium flex gap-2 items-center mb-4">
                <Truck size={18} />
                Shipping
              </h3>
              <p className="text-sm text-gray-600">
                Estimated delivery:{" "}
                {new Date(
                  Date.now() + 7 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow border">
              <h3 className="text-lg font-medium mb-3">Summary</h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>रु{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>रु{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>रु{tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>रु{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow border">
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <MapPin size={18} />
                Shipping Address
              </h3>
              <p className="text-sm">
                {order.Order.firstName} {order.Order.lastName}
              </p>
              <p className="text-sm text-gray-600">
                {order.Order.addressLine}, {order.Order.city},{" "}
                {order.Order.state}
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow border">
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <CreditCard size={18} />
                Payment
              </h3>
              <p className="text-sm">
                {getPaymentMethodLabel(order.Order.Payment?.paymentMethod)}
              </p>
              <p className="text-sm text-gray-600">
                Status: {getPaymentStatusLabel(order.Order.Payment?.paymentStatus)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}