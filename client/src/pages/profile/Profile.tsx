import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileDetails } from './ProfileDetails';
import { hideHeader, showHeader } from '../../store/displayStore';
import classes from './Profile.module.scss';
import { RootState, hideProfileForm, setProfile } from '../../store';
import { ProfileForm } from '.';
import { ProfileSidebar } from './ProfileSidebar';

type UserDetailsDTO = {
	email: string;
	name: string | null;
	gender: 'MALE' | 'FEMALE' | 'NA' | null;
	age: number | null;
	occupation: string | null;
	interests: string[] | null;
	about: string | null;
};

export const Profile = () => {
	const editProfile = useSelector(
		(state: RootState) => state.profile.editProfile
	);
	const jwtToken = useSelector((state: RootState) => state.auth.token);

	const dispatch = useDispatch();

	useEffect(() => {
		const getUserProfile = async (jwtToken: string | null) => {
			if (!jwtToken) {
				console.error('No token');
				return;
			}
			const response = await fetch('http://localhost:8080/user', {
				method: 'GET',
				credentials: 'include',
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			});
			if (!response.ok) {
				console.error('Something went wrong');
				return;
			}
			const profileDto = (await response.json()) as UserDetailsDTO;
			const profile = {
				email: profileDto.email,
				name: profileDto.name,
				gender: profileDto.gender,
				age: profileDto.age ? profileDto.age?.toString() : null,
				occupation: profileDto.occupation,
				interests: profileDto.interests,
				aboutMe: profileDto.about,
			};
			dispatch(setProfile(profile));
		};

		dispatch(hideHeader());
		getUserProfile(jwtToken);

		return () => {
			dispatch(showHeader());
			dispatch(hideProfileForm());
		};
	}, [dispatch, jwtToken]);

	return (
		<div className={classes.layout}>
			<ProfileSidebar />
			<div className={classes.content}>
				{editProfile ? <ProfileForm /> : <ProfileDetails />}
			</div>
		</div>
	);
};
