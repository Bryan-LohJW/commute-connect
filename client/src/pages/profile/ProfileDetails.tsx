import { FaRegAddressCard } from 'react-icons/fa';
import { SlDirections } from 'react-icons/sl';
import { IoGameControllerOutline } from 'react-icons/io5';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { RiInformationLine } from 'react-icons/ri';

import classes from './ProfileDetails.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, showProfileForm } from '../../store';

export const ProfileDetails = () => {
	const dispatch = useDispatch();
	const userProfile = useSelector((state: RootState) => state.profile);

	if (
		!userProfile.name ||
		!userProfile.gender ||
		!userProfile.age ||
		!userProfile.interests ||
		!userProfile.occupation ||
		!userProfile.aboutMe
	) {
		return (
			<>
				<div className={classes.wrapper}>
					<h2 className={classes.title}>Create your profile</h2>
					<p>Create your profile and start connecting with others.</p>
					<button
						className={classes['button-primary']}
						onClick={() => {
							dispatch(showProfileForm());
						}}
					>
						Edit
					</button>
				</div>
			</>
		);
	}

	let gender;
	switch (userProfile.gender) {
		case 'MALE':
			gender = 'Male';
			break;
		case 'FEMALE':
			gender = 'Female';
			break;
		case 'NA':
			gender = 'Not specified';
			break;
		default:
			gender = 'Not specified';
			break;
	}

	return (
		<>
			<h2 className={classes['title']}>Profile Details</h2>
			<div className={classes['details-wrapper']}>
				<div className={classes.details}>
					<div className={classes['detail']}>
						<label className={classes.label}>
							<FaRegAddressCard className={classes.icon} />
							Name
						</label>
						<p className={classes.info}>{userProfile.name}</p>
					</div>
					<div className={classes['detail']}>
						<label className={classes.label}>
							<SlDirections className={classes.icon} />
							Gender
						</label>
						<p className={classes.info}>{gender}</p>
					</div>
					<div className={classes['detail']}>
						<label className={classes.label}>
							<AiTwotoneCalendar className={classes.icon} />
							Age
						</label>
						<p className={classes.info}>{userProfile.age}</p>
					</div>
					<div className={classes['detail']}>
						<label className={classes.label}>
							<IoGameControllerOutline className={classes.icon} />
							Interests
						</label>
						<div className={classes.interests}>
							{userProfile.interests.map((interest) => (
								<p className={classes.interest}>{interest}</p>
							))}
						</div>
					</div>
					<div className={classes['detail']}>
						<label className={classes.label}>
							<MdOutlineWorkOutline className={classes.icon} />
							Occupation
						</label>
						<p className={classes.info}>{userProfile.occupation}</p>
					</div>
					<div className={classes['detail']}>
						<label className={classes.label}>
							<RiInformationLine className={classes.icon} />
							About me
						</label>
						<p className={classes.info}>{userProfile.aboutMe}</p>
					</div>
				</div>
				<div className={classes.action}>
					<button
						className={classes['button-secondary']}
						onClick={() => {
							dispatch(showProfileForm());
						}}
					>
						Edit
					</button>
				</div>
			</div>
		</>
	);
};
