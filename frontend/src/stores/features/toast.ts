import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    visible: boolean
}

const initialState: ToastState = {
    message: '',
    type: 'info',
    visible: false
}

export const ToastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (state: ToastState, action: PayloadAction<{ message: string; type: 'info' | 'success' | 'warning' | 'error'; visible: boolean }>) => {
          state.message = action.payload.message;
          state.type = action.payload.type;
          state.visible = action.payload.visible;
        },
        clearToast: (state: ToastState) => {
          state.message = '';
          state.type = 'info';
          state.visible = false
        },
      },
});

export const { setToast, clearToast } = ToastSlice.actions;
export default ToastSlice.reducer;