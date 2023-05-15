import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { BiError } from 'react-icons/bi';

import { Card } from './../ui/Card';
import { useOutsideClick } from '../../hooks';
import { hideLogin, showSignUp, login as storeLogin } from '../../store';
import logo from '/src/assets/logo-light.png';
import classes from './LoginForm.module.scss';

const schema = z.object({
	email: z.string().email('Invalid email'),
	password: z.string().min(8, 'Password is too short'),
});

type LoginInput = {
	email: string;
	password: string;
};

export const LoginForm = () => {
	const [formError, setFormError] = useState<string | null>(null);
	const [emailFocus, setEmailFocus] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);
	const dispatch = useDispatch();
	const ref = useOutsideClick(() => {
		dispatch(hideLogin());
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<LoginInput>({ resolver: zodResolver(schema) });

	const login = async (credentials: LoginInput) => {
		const response = await fetch(
			'http://localhost:8080/auth/authenticate',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: credentials.email,
					password: credentials.password,
				}),
			}
		);
		if (response.status === 403) {
			setFormError('Invalid credentials');
			return;
		}
		if (!response.ok) {
			setFormError('Unexpected error, try again later');
			return;
		}
		const data = await response.json();
		dispatch(hideLogin());
		dispatch(
			storeLogin({
				token: data['access_token'],
			})
		);
		return data;
	};

	const { mutate } = useMutation<
		string,
		unknown,
		{ email: string; password: string },
		unknown
	>({
		mutationKey: ['login'],
		mutationFn: login,
	});

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

	const submitHandler = async (data: LoginInput) => {
		mutate(data);
	};

	register('email', {
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
							Not a member?{' '}
							<a onClick={() => dispatch(showSignUp())}>
								Sign Up
							</a>
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
							value={'Login'}
							onClick={() => clearFormErrors()}
						/>
					</div>
				</form>
			</Card>
		</div>
	);
};
