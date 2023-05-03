import { IsAlpha, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(8)
    password: string;

    @IsNotEmpty()
    @IsAlpha()
    firstName: string;

    @IsNotEmpty()
    @IsAlpha()
    lastName: string;

    @IsNotEmpty()
    occupation: string;
    
    @IsNotEmpty()
    interests: string[];

    @IsNotEmpty()
    about: string;
}