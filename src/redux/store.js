import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import pizza from "./slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter: filter,
    cart:cart,
    pizza:pizza
  },
})