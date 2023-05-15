import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BiError } from 'react-icons/bi';

import { Card } from './../ui/Card';
import { useOutsideClick } from '../../hooks';
import { hideSignUp, showLogin } from '../../store';
import logo from '/src/assets/logo-light.png';
import classes from './SignUpForm.module.scss';

const schema = z.object({
	email: z.string().email('Invalid email'),
	password: z.string().min(8, 'Password should be at least 8 characters'),
});

type SignUpInput = {
	email: string;
	password: string;
};

export const SignUpForm = () => {
	const [formError, setFormError] = useState<string | null>(null);
	const [emailFocus, setEmailFocus] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);
	const dispatch = useDispatch();
	const ref = useOutsideClick(() => {
		dispatch(hideSignUp());
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setFocus,
	} = useForm<SignUpInput>({ resolver: zodResolver(schema) });

	const signUp = async (credentials: SignUpInput) => {
		const response = await fetch('http://localhost:8080/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
		});
		if (response.status === 409) {
			const data = await response.json();
			setFormError(data.message);
			setFocus('email');
			return;
		}
		if (!response.ok) {
			const data = await response.json();
			setFormError(data.message);
			return;
		}
		const data = await response.json();
		dispatch(hideSignUp());
		return data;
	};

	const clearFormErrors = () => {
		setTimeout(() => {
			setFormError(null);
		}, 3000);
	};

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

	const submitHandler = async (data: SignUpInput) => {
		signUp(data);
	};

	register('email', {
		onChange: () => {
			setFormError(null);
		},
		onBlur: handleEmailBlur,
	});

	register('password', {
		onBlur: handlePasswordBlur,
	});
	return (
		<div ref={ref}>
			<Card>
				<form
					onSubmit={handleSubmit(submitHandler)}
					className={classes.form}
				>
					<div className={classes.heading}>
						<img src={logo} className={classes.logo} />
						<p className={classes['sign-up-action']}>
							Already signed up?{' '}
							<a onClick={() => dispatch(showLogin())}>Log In</a>
						</p>
					</div>
					<div className={classes.inputs}>
						<div className={classes['input-wrap']}>
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
							/>
							{errors.email && (
								<span className={classes['error-message']}>
									<BiError
										className={classes['error-icon']}
									/>
									{errors.email?.message}
								</span>
							)}
						</div>
						<div className={classes['input-wrap']}>
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
							/>
							{errors.password && (
								<span className={classes['error-message']}>
									<BiError
										className={classes['error-icon']}
									/>
									{errors.password?.message}
								</span>
							)}
						</div>
					</div>

					<div className={classes.action}>
						{formError && (
							<span className={classes['error-message']}>
								<BiError className={classes['error-icon']} />
								{formError}
							</span>
						)}
						<input
							className={classes['button-primary']}
							type="submit"
							value={'Sign Up'}
							onClick={() => clearFormErrors()}
						/>
					</div>
				</form>
			</Card>
		</div>
	);
};
