import { createSlice } from '@reduxjs/toolkit'
interface DrawerState {
  open: boolean;
}

const initialState: DrawerState = {
  open: false,
};

export const drowerSlice = createSlice({
  name: 'drower',
  initialState,
  reducers: {
    setOpen: (state) => {
      state.open = true;
    },
    setClose: (state) => {
      state.open = false;
    }
  }
})

export const { setOpen, setClose} = drowerSlice.actions;

export default drowerSlice.reducer