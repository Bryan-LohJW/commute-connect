import { IsEmail, IsNotEmpty, Length, isEmail } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(8)
    password: string;
}