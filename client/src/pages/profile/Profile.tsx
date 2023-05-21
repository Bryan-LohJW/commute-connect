import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RxExit } from 'react-icons/rx';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPerson, BsKey } from 'react-icons/bs';

import profilePicture from './../../assets/temp-profile.png';

import { hideHeader, showHeader } from '../../store/displayStore';
import classes from './Profile.module.scss';
import { ProfileDetails } from './ProfileDetails';

export const Profile = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(hideHeader());

		return () => {
			dispatch(showHeader());
		};
	}, [dispatch]);

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
				<ProfileDetails />
			</div>
		</div>
	);
};
