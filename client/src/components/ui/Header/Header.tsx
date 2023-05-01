import classes from './Header.module.scss';
import logo from '/src/assets/logo-light.png';
import { forwardRef } from 'react';

export const Header = forwardRef<HTMLDivElement>((props, ref) => {
	return (
		<header className={classes.header} ref={ref}>
			<img src={logo} className={classes.logo} />
			<div className={classes.actions}>
				<button
					className={`${classes.button} ${classes['button-secondary']}`}
				>
					Connects near you
				</button>
				<button
					className={`${classes.button} ${classes['button-secondary']}`}
				>
					About
				</button>
			</div>
			<div className={classes.actions}>
				<button
					className={`${classes.button} ${classes['button-secondary']}`}
				>
					Log in
				</button>
				<button
					className={`${classes.button} ${classes['button-primary']}`}
				>
					Sign up
				</button>
			</div>
		</header>
	);
});

export default Header;
