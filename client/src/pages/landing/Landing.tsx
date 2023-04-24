import { Infographic } from './Infographic';
import classes from './Landing.module.scss';

export const Landing = () => {
	return (
		<div className={classes.content}>
			<Infographic />
		</div>
	);
};
