import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClosetItem } from "../features/closetItems"

export interface FavouriteItem {
  favouriteCombinationId?: number;
  userId: string;
  selectedItem: ClosetItem;
  generatedItems: ClosetItem[];
}

interface FavouriteItemState {
  favouriteItems: FavouriteItem[];
}

const initialState: FavouriteItemState = {
  favouriteItems: [],
};


export const fetchFavouriteItems = createAsyncThunk(
  "favouriteItems/fetch",
  async (userId: string, thunkAPI) => {
    const response = await fetch(`/api/favorite?userId=${userId}`, {
      method: "GET",
    });
    const data = response.json();
    return data;
  }
);

export const saveFavouriteItems = createAsyncThunk(
  "favouriteItems/save",
  async ({ selectedItem, generatedItems, userId } : FavouriteItem, thunkAPI) => {
    const response = await fetch("/api/save-favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        selectedItem,
        generatedItems
      }),
    });
    const data = response.json();
    return data;
  }
);

export const deleteFavouriteItems = createAsyncThunk(
  "favouriteItems/delete",
  async (id: number, thunkAPI) => {
    try {
      const response = await fetch(`/api/favourites/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to delete the item with id ${id}. Server responded with status ${response.status}`);
      }
      return id;
    } catch (error) {
      console.error('Error deleting the item:', error);
      return thunkAPI.rejectWithValue('Failed to delete the item');
    }
  }
);



export const FavouriteItemSlice= createSlice({
  name: "favouriteItem",
  initialState,
  reducers: {
  },
  extraReducers: (builder: any) => {
    builder.addCase(
        fetchFavouriteItems.fulfilled,
      (
        state: FavouriteItemState,
        action: PayloadAction<FavouriteItemState>
      ) => {
        state.favouriteItems = action.payload as unknown as FavouriteItem[];
      }
    );
    builder.addCase(
      saveFavouriteItems.fulfilled,
      (state: FavouriteItemState, action: PayloadAction<FavouriteItem>) => {
        state.favouriteItems.push(action.payload);
      }
    );
    builder.addCase(
      deleteFavouriteItems.fulfilled,
      (state: FavouriteItemState, action: PayloadAction<FavouriteItem>) => {
        state.favouriteItems = state.favouriteItems.filter(
          item => item.favouriteCombinationId !== action.payload.favouriteCombinationId
        );
      }
    );
  },
});

export default FavouriteItemSlice.reducer;

