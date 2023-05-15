import { FC, PropsWithChildren } from 'react';
import classes from './Card.module.scss';

export const Card: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div
			className={classes.card}
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			{children}
		</div>
	);
};
