import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authStore';
import { formReducer } from './formStore';
import { displayReducer } from './displayStore';
import { profileReducer } from './profileStore';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		form: formReducer,
		display: displayReducer,
		profile: profileReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
