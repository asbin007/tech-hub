import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/types";
import type { AppDispatch } from "./store";
import { API } from "../globals/http";
import type { RootState } from "./store";

export interface IProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string[];
  inStock: boolean;
  isNew: boolean;
  sizes: string[];
  colors: string[];
  badge: string;
  discount: number;
  RAM: string[];
  ROM: string[];
  specs: string[];
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  Category:{
    categoryName:string
  }
  displayOptions:string[],
  storageOptions:string[],
  ramOptions:string[],
  cpuOptions:string[]


}

export interface IProducts {
  products: IProduct[];
  status: Status;
  product: IProduct | null;
}

const initialState: IProducts = {
  products: [],
  status: Status.LOADING,
  product: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state: IProducts, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    setStatus(state: IProducts, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setProduct(state: IProducts, action: PayloadAction<IProduct>) {
      state.product = action.payload;
    },
  },
});
export const { setProducts, setStatus, setProduct } = productSlice.actions;
export default productSlice.reducer;

export function getProducts() {
  return async function getProductsThunk(dispatch: AppDispatch) {
    try {
      const res = await API.get("/product");
      if (res.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setProducts(res.data.data));
        console.log(res.data.data)
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function getSingleProduct(id: string) {
  return async function getSingleProductThunk(
    dispatch: AppDispatch,
    getState: () => RootState
  ) {
    const store = getState();

    const productExits = store.product.products.find(
      (product: IProduct) => product.id === id
    );
    if (productExits) {
      dispatch(setProduct(productExits));
      dispatch(setStatus(Status.SUCCESS));
      return;
    }
    try {
      const res = await API.get(`/product/${id}`);
      if (res.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setProduct(res.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}
