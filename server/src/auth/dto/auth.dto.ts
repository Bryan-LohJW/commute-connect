import { IsNotEmpty, Length } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @Length(8)
    password: string;
}