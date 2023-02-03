import { createSlice } from "@reduxjs/toolkit";

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    crypto: [],
  },
  reducers: {
    setcrypto: (state, action) => {
      state.crypto = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setcrypto } = cryptoSlice.actions;

export const selectcrypto = (state) => state.crypto.crypto;

export default cryptoSlice.reducer;
