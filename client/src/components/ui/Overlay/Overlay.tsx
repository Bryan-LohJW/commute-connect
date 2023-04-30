import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useEffect, useRef, useState } from 'react';
import { Card, LoginForm } from './index';

export const Overlay = () => {
	const headerRef = useRef<HTMLDivElement>(null);
	const [outletHeight, setOutletHeight] = useState(0);

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
			<LoginForm />
			<Header ref={headerRef} />
			<div style={{ minHeight: `${outletHeight}px` }}>
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default Overlay;
