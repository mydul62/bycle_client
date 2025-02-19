import { bicycleData } from '@/app/Components/shared/data/bycleData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the options
export interface Options {
  frame_material: string[];
  size: string[];
}

// Define a type for the bicycle state
export type IBicycle ={
  brand: string;
  category: string;
  colors: { name: string; hex: string }[]; 
  description: string;
  image_url: string;
  inStock: boolean;
  name: string;
  price: number;
  quantity: number;
  rating: number;
  sku: number;
  stock: number;
  tags: string[];
  type: string;
  _id: string;
}

// Define a type for the slice state
export interface BicyclesState {
  bicycles: IBicycle[];
  selectedBicycle: IBicycle | null; // Add a property for the selected bicycle
}

// Define the initial state
const initialState: BicyclesState = {
  bicycles: bicycleData,
  selectedBicycle: null,
};

// Create the slice
const bicycleSlice = createSlice({
  name: 'bicycles',
  initialState,
  reducers: {
    // Get all bicycles (no state modification needed)
    getAll: (state) => {
      return state;
    },
    // Set the selected bicycle by ID
    getById: (state, action: PayloadAction<number>) => {
      state.selectedBicycle = state.bicycles.find(
        (bicycle) => bicycle.id === action.payload
      ) || null;
    },
  },
});

// Export actions
export const { getAll, getById } = bicycleSlice.actions;

// Export selector for selected bicycle
export const selectSelectedBicycle = (state: { bicycles: BicyclesState }) =>
  state.bicycles.selectedBicycle;

// Export reducer
export default bicycleSlice.reducer;
