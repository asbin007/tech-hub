import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'
import cartSlice from './cartSlice'
import productSlice from './productSlice'
import reviewSlice from './reviewSlice'
import orderSlice from "./orderSlice"
const store=configureStore({
    reducer:{
        auth:authSlice,
        cart:cartSlice,
        product:productSlice,
        review:reviewSlice,
        orders:orderSlice
        

    }
})

export default store;
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>