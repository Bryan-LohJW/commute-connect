import { createSlice } from '@reduxjs/toolkit';

export type FormState = {
	loginForm: boolean;
	signUpForm: boolean;
};

const initialState: FormState = {
	loginForm: false,
	signUpForm: false,
};

export const formSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		showLogin: (state) => {
			state.loginForm = true;
			state.signUpForm = false;
		},
		hideLogin: (state) => {
			state.loginForm = false;
		},
		showSignUp: (state) => {
			state.signUpForm = true;
			state.loginForm = false;
		},
		hideSignUp: (state) => {
			state.signUpForm = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { showLogin, hideLogin, showSignUp, hideSignUp } =
	formSlice.actions;

export const formReducer = formSlice.reducer;
