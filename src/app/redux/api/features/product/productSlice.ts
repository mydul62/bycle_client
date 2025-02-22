import { Icart } from "@/app/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface CartState {
  items: Icart[]; 
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Icart>) => {
      if (state.items.length < 0) {
        state.items[0] = action.payload; 
      } else {
        state.items.push(action.payload); 
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = []; // Clear all items from the cart
    },
    updateQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
      const item = state.items.find(item => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});
// Selector to get total price
export const getTotalPrice = (state: CartState): number => {
  return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const { addToCart, removeFromCart ,updateQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;