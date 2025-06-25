"use client";

import { useEffect, useState } from "react";
import { Package, Search, Filter, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { OrderStatus } from "../checkout/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMyOrders } from "../../store/orderSlice";

// Status color mapping
const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200";
    case "ontheway":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "preparation":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function MyOrdersPage() {
  const dispatch = useAppDispatch();
  const { items} = useAppSelector((store) => store.orders);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = items.filter((order) => {
    const matchesSearch = order.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your recent orders</p>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-48">
              <Filter className="h-4 w-4 text-gray-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Orders</option>
                <option value="preparation">Preparation</option>
                <option value="ontheway">On the Way</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {order.id}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                          order.orderStatus as unknown as OrderStatus
                        )}`}
                      >
                        {order.orderStatus.charAt(0).toUpperCase() +
                          order.orderStatus.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Order Date:</span>
                        <br />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Items:</span>
                        <br />
                        {order.OrderDetails[0].quantity}
                      </div>
                      <div>
                        <span className="font-medium">Total:</span>
                        <br />
                        <span className="text-lg font-semibold text-gray-900">
                          {order.totalPrice
                            ? `Rs. ${order.totalPrice.toFixed(2)}`
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4">
                    <Link to={`/my-orders/${order.id}`}>
                      <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                        View Details
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
