import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import toast from "react-hot-toast";
import { postOrderItem } from "../../store/orderSlice";

export enum PaymentMethod {
  Khalti = "khalti",
  Esewa = "esewa",
  COD = "cod",
}

export interface IData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addressLine: string;
  city: string;
  state: string;
  street: string;
  zipcode: string;
  email: string;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  products: {
    productId: string;
    productQty: number;
  }[];
}

function Checkout() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((store) => store.cart);

  const total = data.reduce(
    (total, item) => item.Product.price * item.quantity + total,
    0
  );

  const CLOUDINARY_VERSION = "v1750340657";

  const [item, setItem] = useState<IData>({
    firstName: "",
    lastName: "",
    addressLine: "",
    city: "",
    state: "", 
    street: "",
    zipcode: "",
    email: "",
    phoneNumber: "",
    totalPrice: 0,
    paymentMethod: PaymentMethod.COD,
    products: [],
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.COD
  );

  const handlePaymentMethod = (paymentData: PaymentMethod) => {
    setPaymentMethod(paymentData);
    setItem({
      ...item,
      paymentMethod: paymentData,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "addressLine",
      "city",
      "street",
      "state",
      "zipcode",
    ];

    for (const field of requiredFields) {
      if (
        !item[field as keyof IData] ||
        item[field as keyof IData]?.toString().trim() === ""
      ) {
        toast.error(`Please fill in your ${field}`, { position: "top-center" });
        return;
      }
    }

    if (data.length === 0) {
      toast.error("Please add at least one product to your cart.", {
        position: "top-center",
      });
      return;
    }

    const productData = data.map((cartItem) => ({
      productId: cartItem.Product.id,
      productQty: cartItem.quantity,
    }));

    const finalData: IData = {
      ...item,
      products: productData,
      totalPrice: total,
    };
     await dispatch(postOrderItem(finalData));
       toast.error("Order created successfully", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#dc2626",
          color: "green",
          padding: "12px 16px",
          borderRadius: "8px",
        },
      });
    

    
  };

  return (
    <div className="font-[sans-serif] bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        {/* Cart Summary */}
        <div className="bg-gray-100 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          <div className="relative h-full">
            <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
              <div className="space-y-4">
                {data.length > 0 ? (
                  data.map((item) => {
                    const imageUrl = `https://res.cloudinary.com/dxpe7jikz/image/upload/${CLOUDINARY_VERSION}${item.Product.image[0].replace(
                      "/uploads",
                      ""
                    )}.jpg`;
                    return (
                      <div className="flex items-start gap-4" key={item.id}>
                        <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
                          <img
                            src={imageUrl}
                            alt={item.Product.name}
                            className="w-full object-contain"
                          />
                        </div>
                        <div className="w-full">
                          <h3 className="text-sm lg:text-base text-gray-800">
                            {item.Product.name}
                          </h3>
                          <ul className="text-xs text-gray-800 space-y-1 mt-3">
                            <li className="flex flex-wrap gap-4">
                              Quantity{" "}
                              <span className="ml-auto">{item.quantity}</span>
                            </li>
                            <li className="flex flex-wrap gap-4">
                              Total Price{" "}
                              <span className="ml-auto">
                                Rs.{item.Product.price}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No Items</p>
                )}
              </div>
            </div>
            <div className="md:absolute md:left-0 md:bottom-0 bg-gray-200 w-full p-4">
              <h4 className="flex flex-wrap gap-4 text-sm lg:text-base text-gray-800">
                Total <span className="ml-auto">Rs.{total}</span>
              </h4>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">
            Complete your order
          </h2>
          <form className="mt-8" onSubmit={handleSubmit}>
            {/* Personal Details */}
            <div>
              <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                Personal Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  placeholder="First Name"
                  className="px-4 py-3 bg-gray-100 text-sm rounded-md"
                />
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="px-4 py-3 bg-gray-100 text-sm rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  className="px-4 py-3 bg-gray-100 text-sm rounded-md"
                />
                <input
                  type="number"
                  name="phoneNumber"
                  onChange={handleChange}
                  placeholder="Phone No."
                  className="px-4 py-3 bg-gray-100 text-sm rounded-md"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mt-8">
              <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                Shipping Address
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="addressLine"
                  onChange={handleChange}
                  placeholder="Address Line"
                  className="px-4 py-3 bg-gray-100 text-sm rounded-md"
                />
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  placeholder="City"
                  className="px-4 py-3 bg-gray-100 text-sm rounded-md"
                />
                <input
                  type="text"
                  name="street"
                  onChange={handleChange}
                  placeholder="Street"
                  className="px-4 py-3 bg-gray-100 text-sm rounded-md"
                />
                <input
                  type="text"
                  name="state"
                  onChange={handleChange}
                  placeholder="State"
                  className="px-4 py-3 bg-gray-100 text-sm rounded-md"
                />
                <input
                  type="text"
                  name="zipcode"
                  onChange={handleChange}
                  placeholder="Zip Code"
                  className="px-4 py-3 bg-gray-100 text-sm rounded-md"
                />
                <div>
                  <label htmlFor="paymentMethod">Payment Method: </label>
                  <select
                    id="paymentMethod"
                    onChange={(e) =>
                      handlePaymentMethod(e.target.value as PaymentMethod)
                    }
                    className="mt-1 px-4 py-2 rounded-md bg-gray-100 text-sm w-full"
                    value={paymentMethod}
                  >
                    <option value={PaymentMethod.COD}>COD</option>
                    <option value={PaymentMethod.Khalti}>Khalti</option>
                    <option value={PaymentMethod.Esewa}>Esewa</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 max-md:flex-col mt-8">
                {paymentMethod === PaymentMethod.COD && (
                  <button
                    type="submit"
                    className="rounded-md px-4 py-2.5 w-full text-sm bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Pay on COD
                  </button>
                )}
                {paymentMethod === PaymentMethod.Khalti && (
                  <button
                    type="submit"
                    className="rounded-md px-4 py-2.5 w-full text-sm bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Pay with Khalti
                  </button>
                )}
                {paymentMethod === PaymentMethod.Esewa && (
                  <button
                    type="submit"
                    className="rounded-md px-4 py-2.5 w-full text-sm bg-green-600 hover:bg-green-700 text-white"
                  >
                    Pay with Esewa
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
