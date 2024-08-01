import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ClosetItem {
  clothId: string;
  category: string;
  season: string;
  imageSrc: string;
}

interface ClosetItemState {
  closetItems: ClosetItem[];
}

const initialState: ClosetItemState = {
  closetItems: [],
};


export const fetchClosetItems = createAsyncThunk(
  "closetItems/fetch",
  async (category: string, thunkAPI) => {
    category.toLowerCase()
    const response = await fetch(`http://localhost:3002/${category}`, {
      method: "GET",
    });
    const data = response.json();
    return data;
  }
);

export const saveClosetItems = createAsyncThunk(
  "closetItems/save",
  async ({ category, season, imageSrc, id } : ClosetItem, thunkAPI) => {
    const formatedCategory = category.slice(0, category.indexOf("-")).toLowerCase();
    const response = await fetch(`http://localhost:3002/${formatedCategory}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageSrc,
        id,
        season
      }),
    });
    const data = response.json();
    return data;
  }
);

export const deleteClosetItems = createAsyncThunk(
  "closetItems/delete",
  async ({ category, imageId }:  {category: string; imageId: string}  , thunkAPI)  => {
    try {
      const response = await fetch(`http://localhost:3002/${category}/${imageId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ClosetItemSlice= createSlice({
  name: "closetItem",
  initialState,
  reducers: {
    addClosetItems: (
      state: ClosetItemState,
      action: PayloadAction<ClosetItem>
    ) => {
      state.closetItems.push({
        category: action.payload.category,
        season: action.payload.season,
        imageSrc: action.payload.imageSrc,
        id: action.payload.id,
      });
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
        fetchClosetItems.fulfilled,
      (
        state: ClosetItemState,
        action: PayloadAction<ClosetItemState>
      ) => {
        state.closetItems = action.payload as unknown as ClosetItem[];
      }
    );
    builder.addCase(
        saveClosetItems.fulfilled,
      (state: ClosetItemState, action: PayloadAction<ClosetItem>) => {
        state.closetItems.push(action.payload);
      }
    );
    builder.addCase(
      deleteClosetItems.fulfilled,
      (state: ClosetItemState, action: PayloadAction<ClosetItem>) => {
        state.closetItems = state.closetItems.filter(item => item.id !== action.payload.id);
      }
    )
  },
});

export default ClosetItemSlice.reducer;
export const { addClosetItems } = ClosetItemSlice.actions;
