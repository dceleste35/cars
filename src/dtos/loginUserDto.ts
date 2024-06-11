import { IsString, IsNotEmpty, IsEmail, IsHash } from 'class-validator';

export default class loginUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
