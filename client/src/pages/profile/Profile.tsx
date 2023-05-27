import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RxExit } from 'react-icons/rx';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPerson, BsKey } from 'react-icons/bs';

import { ProfileDetails } from './ProfileDetails';
import { hideHeader, showHeader } from '../../store/displayStore';
import profilePicture from './../../assets/temp-profile.png';
import classes from './Profile.module.scss';
import {
	RootState,
	hideProfileForm,
	setProfile,
	showProfileForm,
} from '../../store';
import { ProfileForm } from '.';

type UserDetails = {
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
			const profileDto = (await response.json()) as UserDetails;
			console.log(profileDto);
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

	// move sidebar to another component to make it neater
	return (
		<div className={classes.layout}>
			<div className={classes.sidebar}>
				<div className={classes['profile-picture-wrap']}>
					<img
						src={profilePicture}
						alt="profile picture"
						className={classes['profile-picture']}
					></img>
				</div>
				<div className={classes.links}>
					<NavLink to={'/'} className={classes.navlink}>
						<AiOutlineHome className={classes.icon} />
						<p className={classes['nav-label']}>Home</p>
					</NavLink>
					<NavLink
						to={'/'}
						className={`${classes.navlink} ${classes.active}`}
					>
						<BsPerson className={classes.icon} />
						<p className={classes['nav-label']}>Profile Details</p>
					</NavLink>
					<NavLink to={'/'} className={classes.navlink}>
						<BsKey className={classes.icon} />
						<p className={classes['nav-label']}>Change Password</p>
					</NavLink>
					<NavLink to={'/'} className={classes.navlink}>
						<RxExit className={classes.icon} />
						<p className={classes['nav-label']}>Logout</p>
					</NavLink>
				</div>
			</div>
			<div className={classes.content}>
				{editProfile ? <ProfileForm /> : <ProfileDetails />}
			</div>
		</div>
	);
};
