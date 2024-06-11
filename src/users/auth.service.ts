import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import loginUserDto from 'src/dtos/loginUserDto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService) {}

    async signup(email: string, password: string) {
        const users = await this.usersService.findByEmail(email);

        if (users)
            throw new BadRequestException(`User with email ${email} already exists`);

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');
        const user = await this.usersService.create(email, result);

        return user;
    }

    async login(loginUserDto: loginUserDto) {
        const { email, password } = loginUserDto;

        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new NotFoundException(`User with email ${email} not found`);

        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = hash.toString('hex');

        if (result !== storedHash)
            throw new BadRequestException('Invalid password');

        return user;
    }
}
