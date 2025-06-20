import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteCart, updateCart } from "../../store/cartSlice";

function MyCart() {
  const { data } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();

  const handleUpdate = (
    productId: string,
    quantity: number,
  ) => {
    dispatch(updateCart(productId, quantity));
  };

  const handleDelete = (productId: string) => {
    dispatch(deleteCart(productId));
  };

  // Calculate subtotal with defensive checks
  const subTotal = data.reduce((total, item) => {
    const price = Number(item?.product?.price) || 0; // Fallback to 0 if undefined
    const quantity = Number(item?.quantity) || 0;
    return price * quantity + total;
  }, 0);

  // Calculate total quantity with defensive checks
  const totalQtyInCarts = data.reduce(
    (total, item) => (Number(item?.quantity) || 0) + total,
    0
  );

  const shippingPrice = 100;
  const total = subTotal + shippingPrice;

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
          {data.length === 0 ? (
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-3/4">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="text-left text-gray-600 border-b border-gray-200">
                        <th className="py-4 px-6 font-semibold">Product</th>
                        <th className="py-4 px-6 font-semibold">Price</th>
                        <th className="py-4 px-6 font-semibold">Quantity</th>
                        <th className="py-4 px-6 font-semibold">Total</th>
                        <th className="py-4 px-6 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => {
                        // Skip rendering if product is undefined
                        if (!item?.productId) {
                          console.warn(
                            `Invalid cart item at index ${index}:`,
                            item
                          );
                          return null;
                        }
                        return (
                          <tr
                            key={item.productId || index}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-6 px-6">
                              <div className="flex items-center">
                                <img
                                  className="w-16 h-16 object-cover rounded-lg mr-4"
                                  src={
                                    item?.product?.images
                                      ? `http://localhost:5001/${item.product.images}`
                                      : "/placeholder-image.jpg"
                                  }
                                  alt={item.product?.name || "Product Image"}
                                />
                                <span className="font-semibold text-gray-800">
                                  {item.product.name || "Unknown Product"}
                                </span>
                              </div>
                            </td>
                            <td className="py-6 px-6 text-gray-700">
                              Rs. {item.product.price ? item.product.price : "N/A"}
                            </td>
                            <td className="py-6 px-6">
                              <div className="flex items-center">
                                <button
                                  className="border rounded-md py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors disabled:opacity-50"
                                  onClick={() =>
                                    handleUpdate(
                                      item.product.id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="text-center w-12 text-gray-800">
                                  {item.quantity}
                                </span>
                                <button
                                  className="border rounded-md py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"
                                  onClick={() =>
                                    handleUpdate(
                                      item.product.id,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="py-6 px-6 text-gray-700">
                              Rs. {(Number(item.product.price) || 0) * (item.quantity || 0)}
                            </td>
                            <td className="py-6 px-6">
                              <button
                                className="border rounded-md py-2 px-4 bg-red-600 hover:bg-red-700 text-white transition-colors"
                                onClick={() => handleDelete(item.product.id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="md:w-1/4">
                <div className="bg-white rounded-xl shadow-lg p-8 sticky top-4">
                  <h2 className="text-xl font-semibold mb-6 text-gray-800">Summary</h2>
                  <div className="flex justify-between mb-4 text-gray-700">
                    <span>Subtotal</span>
                    <span>Rs. {subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4 text-gray-700">
                    <span>Total Quantity</span>
                    <span>{totalQtyInCarts}</span>
                  </div>
                  <div className="flex justify-between mb-4 text-gray-700">
                    <span>Shipping</span>
                    <span>Rs. {shippingPrice.toFixed(2)}</span>
                  </div>
                  <hr className="my-4 border-gray-200" />
                  <div className="flex justify-between mb-6 text-gray-800 font-semibold">
                    <span>Total</span>
                    <span>Rs. {total.toFixed(2)}</span>
                  </div>
                  <Link to="/checkout">
                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyCart;