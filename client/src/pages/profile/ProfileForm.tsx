import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BiError } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

import {
	RootState,
	hideProfileForm,
	setProfile,
	Profile as ProfileStore,
} from '../../store';
import classes from './ProfileForm.module.scss';

const schema = z.object({
	name: z
		.string()
		.min(1, 'Enter your name')
		.regex(/^[A-Za-z ]*$/, 'Enter a valid name'),
	gender: z.enum(['MALE', 'FEMALE', 'NA'], {
		errorMap: () => {
			return { message: 'Select an option' };
		},
	}),
	age: z.string().regex(/^\d{1,2}$/, 'Enter a valid age'),
	interests: z.string().min(1, 'Enter your interests'),
	occupation: z.string().min(1, 'Enter your occupation'),
	aboutMe: z.string().min(1, 'Enter something about yourself'),
});

type ProfileDTO = {
	name: string;
	gender: 'MALE' | 'FEMALE' | 'NA' | null;
	age: number;
	interests: string[];
	occupation: string;
	aboutMe: string;
};

type ProfileInput = {
	name: string;
	gender: 'MALE' | 'FEMALE' | 'NA' | null;
	age: string;
	interests: string;
	occupation: string;
	aboutMe: string;
};

export const ProfileForm = () => {
	const jwtToken = useSelector((state: RootState) => state.auth.token);
	const profileData = useSelector((state: RootState) => state.profile);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfileInput>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: profileData.name || '',
			gender: profileData.gender || null,
			age: profileData.age || undefined,
			interests: profileData.interests
				? profileData.interests.join(', ')
				: undefined,
			occupation: profileData.occupation || undefined,
			aboutMe: profileData.aboutMe || undefined,
		},
	});

	const submitHandler = async (data: ProfileInput) => {
		const mappedData: ProfileDTO = {
			name: data.name,
			gender: data.gender,
			age: parseInt(data.age),
			interests: data.interests
				.split(',')
				.map((interest) => interest.trim()),
			occupation: data.occupation,
			aboutMe: data.aboutMe,
		};
		const response = await fetch('http://localhost:8080/user/profile', {
			method: 'PUT',
			credentials: 'include',
			headers: {
				Authorization: `Bearer ${jwtToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(mappedData),
		});
		if (!response.ok) return;
		const UserDetailString: ProfileStore = {
			name: data.name,
			gender: data.gender,
			age: data.age,
			interests: data.interests
				.split(',')
				.map((interest) => interest.trim()),
			occupation: data.occupation,
			aboutMe: data.aboutMe,
		};
		dispatch(setProfile(UserDetailString));
		dispatch(hideProfileForm());
	};

	return (
		<>
			<div className={classes['form-title']}>Profile Details</div>
			<form
				className={classes.form}
				onSubmit={handleSubmit(submitHandler)}
			>
				<div className={classes.inputs}>
					<div className={classes['input-wrap']}>
						<label className={classes.label}>
							Name
							{errors.name && (
								<span className={classes['error-message']}>
									<BiError
										className={classes['error-icon']}
									/>
									{errors.name?.message}
								</span>
							)}
						</label>
						<input
							{...register('name')}
							type="text"
							className={classes.input}
						/>
					</div>
					<div className={classes['input-wrap']}>
						<label className={classes.label}>
							Gender{' '}
							{errors.gender && (
								<span className={classes['error-message']}>
									<BiError
										className={classes['error-icon']}
									/>
									{errors.gender?.message}
								</span>
							)}
						</label>
						<select
							{...register('gender')}
							className={classes.input}
						>
							<option value=""></option>
							<option value="MALE">Male</option>
							<option value="FEMALE">Female</option>
							<option value="NA">Prefer not to say</option>
						</select>
					</div>
					<div className={classes['input-wrap']}>
						<label className={classes.label}>
							Age{' '}
							{errors.age && (
								<span className={classes['error-message']}>
									<BiError
										className={classes['error-icon']}
									/>
									{errors.age?.message}
								</span>
							)}
						</label>
						<input
							{...register('age')}
							type="number"
							className={classes.input}
						/>
					</div>
					<div className={classes['input-wrap']}>
						<label className={classes.label}>
							Interests (comma separated)
							{errors.interests && (
								<span className={classes['error-message']}>
									<BiError
										className={classes['error-icon']}
									/>
									{errors.interests?.message}
								</span>
							)}
						</label>
						<input
							{...register('interests')}
							type="text"
							className={classes.input}
						/>
					</div>
					<div className={classes['input-wrap']}>
						<label className={classes.label}>
							Occupation
							{errors.occupation && (
								<span className={classes['error-message']}>
									<BiError
										className={classes['error-icon']}
									/>
									{errors.occupation?.message}
								</span>
							)}
						</label>
						<input
							{...register('occupation')}
							type="text"
							className={classes.input}
						/>
					</div>
					<div className={classes['input-wrap']}>
						<label className={classes.label}>
							About Me
							{errors.aboutMe && (
								<span className={classes['error-message']}>
									<BiError
										className={classes['error-icon']}
									/>
									{errors.aboutMe?.message}
								</span>
							)}
						</label>
						<textarea
							{...register('aboutMe')}
							className={classes.input}
						/>
					</div>
				</div>
				<div className={classes.action}>
					<input
						className={classes['button-primary']}
						type="submit"
						value={'Submit'}
					/>
					<input
						className={classes['button-secondary']}
						type="button"
						value={'Cancel'}
						onClick={() => dispatch(hideProfileForm())}
					/>
				</div>
			</form>
		</>
	);
};
