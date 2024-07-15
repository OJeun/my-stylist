// This slice is to pass selected category and season state from uplaodForm to closet

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategorySeasonImageState {
  category: string;
  season: string;
  imageString: string;
}

const initialState: CategorySeasonImageState = {
  category: "",
  season: "",
  imageString: "",
};

export const CategorySeasonImageSlice = createSlice({
  name: "categorySeasonImage",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSeason: (state, action: PayloadAction<string>) => {
      state.season = action.payload;
    },
    setImageBase64: (state, action: PayloadAction<string>) => {
      state.imageString = action.payload;
    },
  },
});

export const { setCategory, setSeason, setImageBase64 } =
  CategorySeasonImageSlice.actions;

export default CategorySeasonImageSlice.reducer;
