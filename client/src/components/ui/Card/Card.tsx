import { FC, PropsWithChildren } from 'react';
import classes from './Card.module.scss';

type CardProps = {
	height?: string;
	width?: string;
};

export const Card: FC<PropsWithChildren<CardProps>> = ({
	children,
	height,
	width,
}) => {
	const cardStyle = {
		height: height,
		width: width,
	};

	return (
		<div
			className={classes.card}
			style={cardStyle}
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			{children}
		</div>
	);
};
