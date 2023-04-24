import { IconType } from 'react-icons';
import classes from './InfoCard.module.scss';
import { FC } from 'react';

type InfoCardProps = {
	icon: IconType;
	title: string;
	text: string;
};

export const InfoCard: FC<InfoCardProps> = ({ icon, title, text }) => {
	const Icon = icon;
	return (
		<div className={classes.body}>
			<Icon className={classes.icon} />
			<div className={classes.textField}>
				<p className={classes.title}>{title}</p>
				<p className={classes.text}>{text}</p>
			</div>
		</div>
	);
};
