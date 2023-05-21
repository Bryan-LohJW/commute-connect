import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BiError } from 'react-icons/bi';
import classes from './Profile.module.scss';

const schema = z.object({
	name: z.string().min(1, 'Enter your name'),
	gender: z.enum(['MALE', 'FEMALE', 'NA'], {
		errorMap: () => {
			return { message: 'Select an option' };
		},
	}),
	age: z.preprocess(
		(input) => parseInt(z.string().parse(input), 10),
		z.number().positive().max(99)
	),
	interests: z.preprocess((input: unknown) => {
		const array = (input as string).split(',');
		array.forEach((str) => {
			return str.trim();
		});
		return array;
	}, z.array(z.string().min(1, 'Enter your name')).min(1, 'Enter your nama')),
	occupation: z.string().min(1, 'Enter your occupation'),
	aboutMe: z.string().min(1, 'Enter something about yourself'),
});

type ProfileInput = {
	name: string;
	gender: string;
	age: string;
	interests: string;
	occupation: string;
	aboutMe: string;
};

export const ProfileForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfileInput>({
		resolver: zodResolver(schema),
	});

	const submitHandler = (data: ProfileInput) => {
		console.log(data);
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
						<label className={classes.label}>Name</label>
						<input
							{...register('name')}
							type="text"
							className={classes.input}
						/>
						{errors.name && (
							<span className={classes['error-message']}>
								<BiError className={classes['error-icon']} />
								{errors.name?.message}
							</span>
						)}
					</div>
					<div className={classes['input-wrap']}>
						<label className={classes.label}>Gender</label>
						<select
							{...register('gender')}
							className={classes.input}
						>
							<option value=""></option>
							<option value="MALE">Male</option>
							<option value="FEMALE">Female</option>
							<option value="NA">Prefer not to say</option>
						</select>
						{errors.gender && (
							<span className={classes['error-message']}>
								<BiError className={classes['error-icon']} />
								{errors.gender?.message}
							</span>
						)}
					</div>
					<div className={classes['input-wrap']}>
						<label className={classes.label}>Age</label>
						<input
							{...register('age')}
							type="number"
							className={classes.input}
						/>
						{errors.age && (
							<span className={classes['error-message']}>
								<BiError className={classes['error-icon']} />
								{errors.age?.message}
							</span>
						)}
					</div>
					<div className={classes['input-wrap']}>
						<label className={classes.label}>
							Interests (comma separated)
						</label>
						<input
							{...register('interests')}
							type="text"
							className={classes.input}
						/>
						{errors.interests && (
							<span className={classes['error-message']}>
								<BiError className={classes['error-icon']} />
								{errors.interests?.message}
							</span>
						)}
					</div>
					<div className={classes['input-wrap']}>
						<label className={classes.label}>Occupation</label>
						<input
							{...register('occupation')}
							type="text"
							className={classes.input}
						/>
						{errors.occupation && (
							<span className={classes['error-message']}>
								<BiError className={classes['error-icon']} />
								{errors.occupation?.message}
							</span>
						)}
					</div>
					<div className={classes['input-wrap']}>
						<label className={classes.label}>About Me</label>
						<textarea
							{...register('aboutMe')}
							className={classes.input}
						/>
						{errors.aboutMe && (
							<span className={classes['error-message']}>
								<BiError className={classes['error-icon']} />
								{errors.aboutMe?.message}
							</span>
						)}
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
						type="submit"
						value={'Reset'}
					/>
				</div>
			</form>
		</>
	);
};
