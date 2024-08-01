import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ClosetItem {
  clothId?: number;
  userId: string;
  description: string;
  imgSrc: string;
  season: string;
  typeId: string;
}

interface ClosetItemState {
  closetItems: ClosetItem[];
}

const initialState: ClosetItemState = {
  closetItems: [],
};

export const fetchClosetItems = createAsyncThunk(
  'closetItems/fetch',
  async (category: string, thunkAPI) => {
    const response = await fetch(`/api/clothes?category=${category}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return thunkAPI.rejectWithValue(await response.json());
    }
  }
);

export const saveClosetItems = createAsyncThunk(
  'closetItems/save',
  async ({ clothId, userId, description, imgSrc, season, typeId }: ClosetItem, thunkAPI) => {
    try {
      const response = await fetch('/api/save-cloth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clothId,
          userId,
          description,
          imgSrc,
          season,
          typeId,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to save item.');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error:', error);
    }
  }
);

export const deleteClosetItems = createAsyncThunk(
  'closetItems/delete',
  async (
    { category, imageId }: { category: string; imageId: string },
    thunkAPI
  ) => {
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

      }
    )
  },
});

export default ClosetItemSlice.reducer;
export const { addClosetItems } = ClosetItemSlice.actions;
