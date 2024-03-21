import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export default class UserDTO {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
