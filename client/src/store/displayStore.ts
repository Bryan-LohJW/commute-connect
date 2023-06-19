import { createSlice } from '@reduxjs/toolkit';

type displayState = {
	showHeader: boolean;
};

const initialState: displayState = {
	showHeader: true,
};

export const displaySlice = createSlice({
	name: 'display',
	initialState,
	reducers: {
		showHeader: (state) => {
			state.showHeader = true;
		},
		hideHeader: (state) => {
			state.showHeader = false;
		},
	},
});

export const { showHeader, hideHeader } = displaySlice.actions;

export const displayReducer = displaySlice.reducer;
