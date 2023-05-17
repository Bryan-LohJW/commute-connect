import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { LoginForm } from './index';
import { SignUpForm } from '../../signup';
import { RootState } from '../../../store';
import classes from './Overlay.module.scss';

export const Overlay = () => {
	const headerRef = useRef<HTMLDivElement>(null);
	const [outletHeight, setOutletHeight] = useState(0);
	const formState = useSelector((state: RootState) => state.form);
	const showHeader = useSelector<RootState>(
		(state) => state.display.showHeader
	);

	useEffect(() => {
		const headerHeight = headerRef.current?.offsetHeight;
		const screenHeight = window.visualViewport?.height;
		if (!headerHeight || !screenHeight) {
			setOutletHeight(900);
		} else {
			setOutletHeight(screenHeight - headerHeight);
		}
	}, []);

	return (
		<>
			<>
				{formState.loginForm && <LoginForm />}
				{formState.signUpForm && <SignUpForm />}
			</>
			{showHeader && <Header ref={headerRef} />}
			<div
				className={classes.overlay}
				style={{ minHeight: `${outletHeight}px` }}
			>
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default Overlay;
