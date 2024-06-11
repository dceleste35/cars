import { IsString, IsNotEmpty, IsEmail, IsHash } from 'class-validator';

export default class UserDTO {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
