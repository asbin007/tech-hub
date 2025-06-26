import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/types";
import { OrderStatus, type IOrderDetail, type PaymentStatus } from "../pages/checkout/types";
import type { AppDispatch } from "./store";
import { APIS } from "../globals/http";

interface IProduct {
  productId: string;
  quantity: number;
  totalPrice?: number;
  orderStatus: Status;
  paymentId: string;
  createdAt: string;
  Payment?: {
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
  };
  OrderDetails: [
    {
      quantity: number;
    }
  ];
}
export interface IOrderItems extends IProduct {
  id: string;
  orderId: string;
}

export interface IOrder {
  status: Status;
  items: IOrderItems[];
  khaltiUrl: string | null;
  orderDetails: IOrderDetail[];
}

export enum PaymentMethod {
  Esewa = "esewa",
  Khalti = "khalti",
  Cod = "cod",
}

export interface IData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addressLine: string;
  city: string;
  street: string;
  zipcode: string;
  email: string;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  products: IProduct[];
}

const initialState: IOrder = {
  status: Status.LOADING,
  items: [],
  khaltiUrl: null,
  orderDetails: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setItems(state: IOrder, action: PayloadAction<IOrderItems[]>) {
      state.items = action.payload;
    },
    setOrderDetails(state: IOrder, action: PayloadAction<IOrderDetail[]>) {
      state.orderDetails = action.payload;
    },
    setStatus(state: IOrder, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setKhaltiUrl(state: IOrder, action: PayloadAction<string>) {
      state.khaltiUrl = action.payload;
    },
    updateOrderStatusToCancel(
      state: IOrder,
      action: PayloadAction<{ orderId: string }>
    ) {
      const orderId = action.payload.orderId;

      const data = state.orderDetails.find(
        (order) => order.orderId === orderId
      );
      if (data) {
        data.Order.orderStatus = OrderStatus.Cancelled;
      }
    },
  },
});
export default orderSlice.reducer;
export const {
  setItems,
  setStatus,
  setKhaltiUrl,
  setOrderDetails,
  updateOrderStatusToCancel,
} = orderSlice.actions;

export function postOrderItem(data: IData) {
  return async function postOrderItemThunk(dispatch: AppDispatch) {
    try {
      const res = await APIS.post("/order", data);
      if (res.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(res.data.data));
        console.log(res.data.url, "Url");
        if (res.data.url) {
          dispatch(setKhaltiUrl(res.data.url));
          window.location.href = res.data.url;
        } else {
          dispatch(setStatus(Status.ERROR));
        }
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}

export function fetchMyOrders() {
  return async function fetchMyOrdersThunk(dispatch: AppDispatch) {
    try {
      const response = await APIS.get("/order");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchMyOrderDetails(id: string) {
  return async function fetchMyOrderDetailsThunk(dispatch: AppDispatch) {
    try {
      const response = await APIS.get("/order/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setOrderDetails(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function cancelOrderAPI(id: string) {
  return async function cancelOrderAPIThunk(dispatch: AppDispatch) {
    try {
      const response = await APIS.patch("/order/cancel-order/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(updateOrderStatusToCancel({ orderId: id }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
