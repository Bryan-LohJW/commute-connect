import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, logout, showLogin, showSignUp } from '../../../store';
import logo from '/src/assets/logo-light.png';
import classes from './Header.module.scss';
import { NavLink } from 'react-router-dom';

export const Header = forwardRef<HTMLDivElement>((prop, ref) => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.authenticated
	);

	const loginHandler = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		dispatch(showLogin());
	};

	const signUpHandler = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		dispatch(showSignUp());
	};

	const logoutHandler = () => {
		dispatch(logout());
	};

	const loginActions = (
		<div className={classes.actions}>
			<button
				className={`${classes.button} ${classes['button-secondary']}`}
				onClick={loginHandler}
			>
				Log in
			</button>
			<button
				className={`${classes.button} ${classes['button-primary']}`}
				onClick={signUpHandler}
			>
				Sign up
			</button>
		</div>
	);

	const logoutActions = (
		<div className={classes.actions}>
			<NavLink to={'/profile'}>
				<button
					className={`${classes.button} ${classes['button-secondary']}`}
				>
					Profile
				</button>
			</NavLink>
			<button
				className={`${classes.button} ${classes['button-secondary']}`}
				onClick={logoutHandler}
			>
				Log Out
			</button>
		</div>
	);

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

			{!isAuthenticated && loginActions}
			{isAuthenticated && logoutActions}
		</header>
	);
});

export default Header;
