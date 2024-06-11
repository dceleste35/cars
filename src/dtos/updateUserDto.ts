import { IsString, IsNotEmpty, IsEmail, IsHash, IsOptional } from 'class-validator';

export default class updateUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;
}
