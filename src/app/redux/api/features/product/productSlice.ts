import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the product type
interface Product {
  id:string,
  _id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  quantity: number;
  inStock: boolean; 
  image: string;
}

interface CartState {
  items: Product[]; 
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      if (state.items.length > 0) {
        state.items[0] = action.payload; 
      } else {
        state.items.push(action.payload); 
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;