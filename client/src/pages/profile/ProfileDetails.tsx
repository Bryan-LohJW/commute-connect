import { FaRegAddressCard } from 'react-icons/fa';
import { SlDirections } from 'react-icons/sl';
import { IoGameControllerOutline } from 'react-icons/io5';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { RiInformationLine } from 'react-icons/ri';

import classes from './ProfileDetails.module.scss';
import { useDispatch } from 'react-redux';
import { showProfileForm } from '../../store';

export const ProfileDetails = () => {
	const dispatch = useDispatch();

	return (
		<>
			<div className={classes['title']}>Profile Details</div>
			<div className={classes['details-wrapper']}>
				<div className={classes.details}>
					<div className={classes['detail']}>
						<label className={classes.label}>
							<FaRegAddressCard className={classes.icon} />
							Name
						</label>
						<p className={classes.info}>Bryan</p>
					</div>
					<div className={classes['detail']}>
						<label className={classes.label}>
							<SlDirections className={classes.icon} />
							Gender
						</label>
						<p className={classes.info}>Male</p>
					</div>
					<div className={classes['detail']}>
						<label className={classes.label}>
							<AiTwotoneCalendar className={classes.icon} />
							Age
						</label>
						<p className={classes.info}>26</p>
					</div>
					<div className={classes['detail']}>
						<label className={classes.label}>
							<IoGameControllerOutline className={classes.icon} />
							Interests
						</label>
						<div className={classes.interests}>
							<p className={classes.interest}>Table tennis</p>
							<p className={classes.interest}>Cycling</p>
						</div>
					</div>
					<div className={classes['detail']}>
						<label className={classes.label}>
							<MdOutlineWorkOutline className={classes.icon} />
							Occupation
						</label>
						<p className={classes.info}>Engineer</p>
					</div>
					<div className={classes['detail']}>
						<label className={classes.label}>
							<RiInformationLine className={classes.icon} />
							About me
						</label>
						<p className={classes.info}>Engineer</p>
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
