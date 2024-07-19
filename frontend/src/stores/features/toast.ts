import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
}

const initialState: ToastState = {
    message: '',
    type: 'info'
}

export const ToastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (state: ToastState, action: PayloadAction<{ message: string; type: 'info' | 'success' | 'warning' | 'error' }>) => {
          state.message = action.payload.message;
          state.type = action.payload.type;
        },
        clearToast: (state: ToastState) => {
          state.message = '';
          state.type = 'info';
        },
      },
});

export const { setToast, clearToast } = ToastSlice.actions;
export default ToastSlice.reducer;