import classes from './Header.module.scss';
import logo from './../../../../public/images/logo-light.png';

const Header = () => {
	return (
		<header className={classes.header}>
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
};

export default Header;
