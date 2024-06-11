import { IsString, IsNotEmpty, IsEmail, IsHash } from 'class-validator';

export default class createUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
