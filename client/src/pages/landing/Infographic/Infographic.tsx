import { FaTrain } from 'react-icons/fa';
import { BsPersonLinesFill } from 'react-icons/bs';
import { MdPeopleAlt } from 'react-icons/md';
import { InfoCard } from './InfoCard';
import classes from './Infographic.module.scss';

export const Infographic = () => {
	return (
		<div className={classes.body}>
			<InfoCard
				icon={BsPersonLinesFill}
				title="Create your profile"
				text="Share more about yourself"
			/>
			<InfoCard
				icon={FaTrain}
				title="Create commutes"
				text="The travels that you are open to connect"
			/>
			<InfoCard
				icon={MdPeopleAlt}
				title="Create connections"
				text="Accept connections from others, or make a connection"
			/>
		</div>
	);
};
