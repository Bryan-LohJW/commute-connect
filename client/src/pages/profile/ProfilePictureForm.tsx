import { IoCloseSharp } from 'react-icons/io5';

import profilePicture from './../../assets/temp-profile.png';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setProfilePictureURI,
	RootState,
	hideProfilePictureForm,
} from '../../store';
import classes from './ProfilePictureForm.module.scss';
import { useOutsideClick } from '../../hooks';

export const ProfilePictureForm = () => {
	const dispatch = useDispatch();
	const profilePictureURI = useSelector(
		(state: RootState) => state.profile.profilePictureURI
	);
	const [tempProfilePictureURI, setTempProfilePictureURI] =
		useState(profilePictureURI);
	const profilePictureInputRef = useRef<HTMLInputElement>(null);
	const profilePictureResetRef = useRef<HTMLInputElement>(null);
	const outsideClickRef = useOutsideClick(() =>
		dispatch(hideProfilePictureForm())
	);

	return (
		<div className={classes.modal} ref={outsideClickRef}>
			<div className={classes.header}>
				<p className={classes.title}>Profile Picture</p>
				<p onClick={() => dispatch(hideProfilePictureForm())}>
					<IoCloseSharp className={classes.icon} />
				</p>
			</div>
			<div className={classes.profilePictureWrap}>
				{!tempProfilePictureURI && (
					<img
						src={profilePicture}
						alt="default profile picture"
						className={classes['profile-picture']}
					/>
				)}
				{tempProfilePictureURI && (
					<img
						src={tempProfilePictureURI}
						alt="profile picture"
						className={classes['profile-picture']}
					/>
				)}
			</div>
			<div className={classes.footer}>
				<form style={{ display: 'none' }}>
					<input
						type="file"
						name="profile picture"
						style={{ display: 'none' }}
						ref={profilePictureInputRef}
						accept="image/png, image/jpeg, image/jpg"
						onChange={(event) => {
							if (event.currentTarget.files === null) return;
							setTempProfilePictureURI(
								URL.createObjectURL(
									event.currentTarget.files[0]
								)
							);
						}}
					/>
					<input
						type="reset"
						ref={profilePictureResetRef}
						style={{ display: 'none' }}
					/>
				</form>
				<div className={classes['sub-footer']}>
					<button
						onClick={() => profilePictureInputRef.current?.click()}
						className={classes['button-secondary']}
					>
						Upload Photo
					</button>
					<button
						onClick={() => {
							if (!profilePictureResetRef.current) return;
							profilePictureResetRef.current.click();
							setTempProfilePictureURI(null);
						}}
						className={classes['button-secondary']}
					>
						Delete
					</button>
				</div>
				<button
					className={classes['button-primary']}
					onClick={() => {
						dispatch(setProfilePictureURI(tempProfilePictureURI));
						dispatch(hideProfilePictureForm());
					}}
				>
					Save
				</button>
			</div>
		</div>
	);
};
