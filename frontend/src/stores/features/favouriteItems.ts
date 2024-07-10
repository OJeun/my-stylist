import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClothingItem } from "../../components/ItemCard";

export interface FavouriteItem {
  id: number | string;
  selectedItem: ClothingItem;
  generatedItems: string[];
}

interface FavouriteItemState {
  favouriteItems: FavouriteItem[];
}

const initialState: FavouriteItemState = {
  favouriteItems: [],
};


export const fetchFavouriteItems = createAsyncThunk(
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
  async ({ selectedItem, generatedItems, id } : FavouriteItem, thunkAPI) => {
    const response = await fetch("http://localhost:3001/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        selectedItem,
        generatedItems
      }),
    });
    const data = response.json();
    return data;
  }
);

export const FavourtieItemSlice= createSlice({
  name: "favouriteItem",
  initialState,
  reducers: {
    addFavouriteItems: (
      state: FavouriteItemState,
      action: PayloadAction<FavouriteItem>
    ) => {
      state.favouriteItems.push({
        id: action.payload.id,
        selectedItem: action.payload.selectedItem,
        generatedItems: action.payload.generatedItems,
      });
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
        fetchFavouriteItems.fulfilled,
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

export default FavourtieItemSlice.reducer;
export const { addFavouriteItems } = FavourtieItemSlice.actions;
