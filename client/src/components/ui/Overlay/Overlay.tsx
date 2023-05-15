import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { LoginForm } from './index';
import { SignUpForm } from '../../signup';
import { RootState } from '../../../store';

export const Overlay = () => {
	const headerRef = useRef<HTMLDivElement>(null);
	const [outletHeight, setOutletHeight] = useState(0);
	const formState = useSelector((state: RootState) => state.form);

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
			<Header ref={headerRef} />
			<div style={{ minHeight: `${outletHeight}px` }}>
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default Overlay;
