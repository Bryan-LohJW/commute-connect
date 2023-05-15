import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as jose from 'jose';

export type AuthState = {
	token: string | null;
	sub: string | null;
	authenticated: boolean;
};

type LoginParams = {
	token: string;
};

const initialState: AuthState = {
	token: null,
	sub: null,
	authenticated: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<LoginParams>) => {
			if (!action.payload.token) return;
			state.token = action.payload.token;
			const payload = jose.decodeJwt(action.payload.token);
			state.sub = payload.sub || null;
			state.authenticated = true;
		},
		logout: (state) => {
			state.token = null;
			state.sub = null;
			state.authenticated = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
