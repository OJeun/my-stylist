import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FavouriteItem {
  id: number | string;
  selectedItem: string;
  generatedItems: string[];
}

interface FavouriteItemState {
  favouriteItems: FavouriteItem[];
}

const initialState: FavouriteItemState = {
  favouriteItems: [],
};

export const fetchFavouriteItemState = createAsyncThunk(
  "favouriteItems/fetch",
  async (thunkAPI) => {
    const response = await fetch("http://localhost:3001/favourites", {
      method: "GET",
    });
    const data = response.json();
    return data;
  }
);

export const saveFavouriteItems = createAsyncThunk(
  "favouriteItems/save",
  async ({ selectedItem, generatedItems }: FavouriteItem, thunkAPI) => {
    const response = await fetch("http://localhost:3001/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedItem,
        generatedItems,
      }),
    });
    const data = response.json();
    return data;
  }
);

export const FavourtieSlice= createSlice({
  name: "favouriteItem",
  initialState,
  reducers: {
    addFavouriteItems: (
      state: FavouriteItemState,
      action: PayloadAction<FavouriteItem>
    ) => {
      state.favouriteItems.push({
        id: state.favouriteItems.length,
        selectedItem: action.payload.selectedItem,
        generatedItems: action.payload.generatedItems,
      });
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      fetchFavouriteItemState.fulfilled,
      (
        state: FavouriteItemState,
        action: PayloadAction<FavouriteItemState>
      ) => {
        state.favouriteItems = action.payload.favouriteItems;
      }
    );
    builder.addCase(
      saveFavouriteItems.fulfilled,
      (state: FavouriteItemState, action: PayloadAction<FavouriteItem>) => {
        state.favouriteItems.push(action.payload);
      }
    );
  },
});

export default FavourtieSlice.reducer;
export const { addFavouriteItems } = FavourtieSlice.actions;
