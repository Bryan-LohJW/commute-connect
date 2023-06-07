import { NavLink } from 'react-router-dom';
import { RxExit } from 'react-icons/rx';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPerson, BsKey } from 'react-icons/bs';

import profilePicture from './../../assets/temp-profile.png';
import classes from './ProfileSidebar.module.scss';

export const ProfileSidebar = () => {
	return (
		<div className={classes.sidebar}>
			<div className={classes['profile-picture-wrap']}>
				<img
					src={profilePicture}
					alt="profile picture"
					className={classes['profile-picture']}
				></img>
			</div>
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
