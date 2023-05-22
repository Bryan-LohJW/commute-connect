import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ProfileState = {
	editProfile: boolean;
	name: string | null;
	gender: 'MALE' | 'FEMALE' | 'NA' | null;
	age: string | null;
	interests: string[] | null;
	occupation: string | null;
	aboutMe: string | null;
};

type Profile = {
	name: string | null;
	gender: 'MALE' | 'FEMALE' | 'NA' | null;
	age: string | null;
	interests: string[] | null;
	occupation: string | null;
	aboutMe: string | null;
};

const initialState: ProfileState = {
	editProfile: false,
	name: null,
	gender: null,
	age: null,
	interests: null,
	occupation: null,
	aboutMe: null,
};

export const profileSlice = createSlice({
	name: 'profileSlice',
	initialState,
	reducers: {
		showProfileForm: (state) => {
			state.editProfile = true;
		},
		hideProfileForm: (state) => {
			state.editProfile = false;
		},
		setProfile: (state, action: PayloadAction<Profile>) => {
			state.name = action.payload.name;
			state.gender = action.payload.gender;
			state.age = action.payload.age;
			state.interests = action.payload.interests;
			state.occupation = action.payload.occupation;
			state.aboutMe = action.payload.aboutMe;
		},
		clearProfile: (state) => {
			state.name = initialState.name;
			state.gender = initialState.gender;
			state.age = initialState.age;
			state.interests = initialState.interests;
			state.occupation = initialState.occupation;
			state.aboutMe = initialState.aboutMe;
		},
	},
});

export const { showProfileForm, hideProfileForm, setProfile, clearProfile } =
	profileSlice.actions;

export const profileReducer = profileSlice.reducer;
