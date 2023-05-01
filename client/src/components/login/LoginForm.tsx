import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '.';
import logo from '/src/assets/logo-light.png';
import classes from './LoginForm.module.scss';
import { useState } from 'react';

const schema = z.object({
	email: z
		.string()
		.regex(
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			'Invalid email'
		),
	password: z.string().min(8, 'Password should be at least 8 characters'),
});

type LoginData = {
	email: string;
	password: string;
};

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<LoginData>({ resolver: zodResolver(schema) });

	const [emailFocus, setEmailFocus] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const handleEmailFocus = () => {
		setEmailFocus(true);
	};
	const handleEmailBlur = () => {
		setEmailFocus(!!watch('email').length);
	};

	const handlePasswordFocus = () => {
		setPasswordFocus(true);
	};
	const handlePasswordBlur = () => {
		setPasswordFocus(!!watch('password').length);
	};

	const submitHandler = (data: LoginData) => {
		console.log(data);
	};

	return (
		<Card width="15%">
			<form
				onSubmit={handleSubmit(submitHandler)}
				className={classes.form}
			>
				<img src={logo} className={classes.logo} />
				<div className={classes.input}>
					<label
						className={`${classes.label} ${
							emailFocus && classes['label-focus']
						}`}
					>
						Email
					</label>
					<input
						{...register('email')}
						type="text"
						className={classes.input}
						onFocus={handleEmailFocus}
						onBlur={handleEmailBlur}
					/>
					<span className={classes['error-message']}>
						{errors.email?.message}
					</span>
				</div>
				<div className={classes.input}>
					<label
						className={`${classes.label} ${
							passwordFocus && classes['label-focus']
						}`}
					>
						Password
					</label>
					<input
						{...register('password')}
						type="password"
						className={classes.input}
						onFocus={handlePasswordFocus}
						onBlur={handlePasswordBlur}
					/>
					<span className={classes['error-message']}>
						{errors.password?.message}
					</span>
				</div>
				<div>
					<input
						className={classes['button-primary']}
						type="submit"
						value={'Login'}
					/>
				</div>
			</form>
		</Card>
	);
};
