import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
	token: string;
};

const initialState: AuthState = {
	token: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<AuthState>) => {
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.token = '';
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
