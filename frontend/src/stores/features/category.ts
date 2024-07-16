import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryState {
  category: string;
}

const initialState: CategoryState = {
  category: "top",
};

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = CategorySlice.actions;

export default CategorySlice.reducer;
