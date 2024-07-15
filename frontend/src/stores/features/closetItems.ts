import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ClosetItem {
  category: string;
  season: string;
  imageString: string;
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
  async ({ category, season, imageString } : ClosetItem, thunkAPI) => {
    const formatedCategory = category.slice(0, category.indexOf("-")).toLowerCase();
    const response = await fetch(`http://localhost:3002/${formatedCategory}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageString
      }),
    });
    const data = response.json();
    return data;
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
        imageString: action.payload.imageString,
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
  },
});

export default ClosetItemSlice.reducer;
export const { addClosetItems } = ClosetItemSlice.actions;
