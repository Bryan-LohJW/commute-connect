import { BsGithub } from 'react-icons/bs';
import classes from './Footer.module.scss';

export const Footer = () => {
	const year = () => {
		return new Date().getFullYear().toString();
	};
	return (
		<footer className={classes.footer}>
			<p>Ⓒ Copyright {`${year()}`}</p>
			<BsGithub
				className={classes.icon}
				onClick={() => {
					window.open(import.meta.env.VITE_GITHUB_LINK);
					console.log('hello');
				}}
			/>
		</footer>
	);
};

export default Footer;
