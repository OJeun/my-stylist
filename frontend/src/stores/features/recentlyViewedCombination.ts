import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClosetItem } from './closetItems';

export interface RecentlyViewedCombination {
  favouriteCombinationId?: number;
  userId: string;
  selectedItem: ClosetItem;
  generatedItems: ClosetItem[];
}

interface RecentlyViewedCombinationState {
  recentlyViewedCombinations: RecentlyViewedCombination[];
}

const initialState: RecentlyViewedCombinationState = {
  recentlyViewedCombinations: [],
};

export const fetchRecentlyViewedCombinations = createAsyncThunk(
  'recentlyViewedCombinations/fetch',
  async (thunkAPI) => {
    const response = await fetch('/api/recently-viewed', {
      method: 'GET',
    });
    const data = response.json();
    return data;
  }
);

export const addRecentlyViewedCombinations = createAsyncThunk(
  'recentlyViewedCombinations/add',
  async (
    { selectedItem, generatedItems, userId }: RecentlyViewedCombination,
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

export const deleteRecentlyViewedCombinations = createAsyncThunk(
  'recentlyViewedCombinations/delete',
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
      return thunkAPI.rejectWithValue('Failed to delete the outfit combination');
    }
  }
);

export const RecentlyViewedCombinationSlice = createSlice({
  name: 'favouriteItem',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(
      fetchRecentlyViewedCombinations.fulfilled,
      (
        state: RecentlyViewedCombinationState,
        action: PayloadAction<RecentlyViewedCombinationState>
      ) => {
        state.recentlyViewedCombinations =
          action.payload as unknown as RecentlyViewedCombination[];
      }
    );
    builder.addCase(
      addRecentlyViewedCombinations.fulfilled,
      (
        state: RecentlyViewedCombinationState,
        action: PayloadAction<RecentlyViewedCombination>
      ) => {
        state.recentlyViewedCombinations.push(action.payload);
      }
    );
    builder.addCase(
      deleteRecentlyViewedCombinations.fulfilled,
      (
        state: RecentlyViewedCombinationState,
        action: PayloadAction<RecentlyViewedCombination>
      ) => {
        state.recentlyViewedCombinations =
          state.recentlyViewedCombinations.filter(
            (item) =>
              item.favouriteCombinationId !==
              action.payload.favouriteCombinationId
          );
      }
    );
  },
});

export default RecentlyViewedCombinationSlice.reducer;
