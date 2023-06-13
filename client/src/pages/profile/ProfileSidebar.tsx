import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RxExit } from 'react-icons/rx';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPerson, BsKey } from 'react-icons/bs';
import { BiPlusCircle } from 'react-icons/bi';

import profilePicture from './../../assets/temp-profile.png';
import { RootState, showProfilePictureForm } from '../../store';
import { ProfilePictureForm } from './ProfilePictureForm';
import classes from './ProfileSidebar.module.scss';

export const ProfileSidebar = () => {
	const showForm = useSelector(
		(state: RootState) => state.profile.editProfilePicture
	);
	const dispatch = useDispatch();

	return (
		<div className={classes.sidebar}>
			<div className={classes['profile-picture-wrap']}>
				<div
					className={classes['profile-overlay']}
					onClick={(event: React.MouseEvent<HTMLElement>) => {
						dispatch(showProfilePictureForm());
						event.stopPropagation();
					}}
				>
					<img
						src={profilePicture}
						alt="profile picture"
						className={`${classes['profile-picture']} ${classes.pointer}`}
					/>
					<div className={classes['change-picture']}>
						<BiPlusCircle
							className={classes['change-picture-icon']}
						/>
					</div>
				</div>
			</div>
			{showForm && <ProfilePictureForm />}
			<div className={classes.links}>
				<NavLink
					to={'/'}
					className={({ isActive }) =>
						`${classes.navlink} ${isActive ? classes.active : ''}`
					}
				>
					<AiOutlineHome className={classes.icon} />
					<p className={classes['nav-label']}>Home</p>
				</NavLink>
				<NavLink
					to={'/profile'}
					className={({ isActive }) =>
						`${classes.navlink} ${isActive ? classes.active : ''}`
					}
				>
					<BsPerson className={classes.icon} />
					<p className={classes['nav-label']}>Profile Details</p>
				</NavLink>
				<NavLink
					to={'/'}
					className={({ isActive }) =>
						`${classes.navlink} ${isActive ? classes.active : ''}`
					}
				>
					<BsKey className={classes.icon} />
					<p className={classes['nav-label']}>Change Password</p>
				</NavLink>
				<NavLink
					to={'/'}
					className={({ isActive }) =>
						`${classes.navlink} ${isActive ? classes.active : ''}`
					}
				>
					<RxExit className={classes.icon} />
					<p className={classes['nav-label']}>Logout</p>
				</NavLink>
			</div>
		</div>
	);
};
