import { createSlice } from "@reduxjs/toolkit";

const initialState: { isShow: boolean } = {
  isShow: false,
};

const showFilterSlice = createSlice({
  name: "showFilter",
  initialState,
  reducers: {
    isShow: (state) => {
      state.isShow = !state.isShow;
    },
  },
});

export default showFilterSlice.reducer;
export const { isShow } = showFilterSlice.actions;
