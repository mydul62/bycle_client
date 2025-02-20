import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the product type
type Color = {
  _id: string;
  name: string;
  hex: string;
};
export interface IProduct {
  brand: string;
  type: string;
  quantity: number;
  inStock: boolean;
  _id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  colors: Color[];
  stock: number;
  category: string;
  tags: string[];
  sku: number;
  image_url: string;
}

interface CartState {
  items: IProduct[]; 
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      if (state.items.length < 0) {
        state.items[0] = action.payload; 
      } else {
        state.items.push(action.payload); 
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
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

export const { addToCart, removeFromCart ,updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;