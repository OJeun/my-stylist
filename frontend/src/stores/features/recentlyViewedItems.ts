import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClosetItem } from './closetItems';

export interface RecentlyViewedItem {
  recentlyViewedCombinationId?: number;
  userId: string;
  selectedItem: ClosetItem;
  generatedItems: ClosetItem[];
}

interface RecentlyViewedCombinationState {
  recentlyViewedItems: RecentlyViewedItem[];
}

const initialState: RecentlyViewedCombinationState = {
  recentlyViewedItems: [],
};


export const fetchRecentlyViewedItems = createAsyncThunk(
  'recentlyViewedItems/fetch',
  async (userId: string, thunkAPI) => {
    const response = await fetch(`/api/recently-viewed?userId=${userId}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }
);

export const addRecentlyViewedItems = createAsyncThunk(
  'recentlyViewedItems/add',
  async (
    { selectedItem, generatedItems, userId }: RecentlyViewedItem,
    thunkAPI
  ) => {
    const response = await fetch('/api/recently-viewed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        selectedItem,
        generatedItems,
      }),
    });
    const data = response.json();
    return data;
  }
);

export const deleteRecentlyViewedItems = createAsyncThunk(
  'recentlyViewedItems/delete',
  async (id: number, thunkAPI) => {
    try {
      const response = await fetch(`/api/recently-viewed/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete the outfit with id ${id}. Server responded with status ${response.status}`
        );
      }
      return id;
    } catch (error) {
      console.error('Error deleting the outfit combination:', error);
      return thunkAPI.rejectWithValue(
        'Failed to delete the outfit combination'
      );
    }
  }
);

export const RecentlyViewedItemSlice = createSlice({
  name: 'recentlyViewedItems',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(
      fetchRecentlyViewedItems.fulfilled,
      (
        state: RecentlyViewedCombinationState,
        action: PayloadAction<RecentlyViewedCombinationState>
      ) => {
        console.log("ACTION PAYLOAD!!!", action.payload)
        state.recentlyViewedItems =
          action.payload as unknown as RecentlyViewedItem[];
      }
    );
    builder.addCase(
      addRecentlyViewedItems.fulfilled,
      (
        state: RecentlyViewedCombinationState,
        action: PayloadAction<RecentlyViewedItem>
      ) => {
        state.recentlyViewedItems.push(action.payload);
      }
    );
    builder.addCase(
      deleteRecentlyViewedItems.fulfilled,
      (
        state: RecentlyViewedCombinationState,
        action: PayloadAction<RecentlyViewedItem>
      ) => {
        state.recentlyViewedItems = state.recentlyViewedItems.filter(
          (item) =>
            item.recentlyViewedCombinationId !==
            action.payload.recentlyViewedCombinationId
        );
      }
    );
  },
});

export default RecentlyViewedItemSlice.reducer;
