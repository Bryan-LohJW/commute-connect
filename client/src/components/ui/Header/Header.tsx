import classes from './Header.module.scss';
import logo from './../../../../public/images/logo-light.png';

const Header = () => {
	return (
		<header className={classes.header}>
			<img src={logo} className={classes.logo} />
			<div className={classes.actions}>
				<button className={`${classes.button} ${classes.secondary}`}>
					Connects Near You
				</button>
				<button className={`${classes.button} ${classes.secondary}`}>
					About
				</button>
			</div>
			<div className={classes.actions}>
				<button className={`${classes.button} ${classes.secondary}`}>
					Log In
				</button>
				<button className={`${classes.button} ${classes.primary}`}>
					Sign Up
				</button>
			</div>
		</header>
	);
};

export default Header;
