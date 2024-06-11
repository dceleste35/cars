import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import loginUserDto from 'src/dtos/loginUserDto';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private authRepository: Repository<User>, private readonly usersService: UsersService) {}

    async signup(email: string, password: string) {
        const user = await this.authRepository.create({ email, password });
        return this.authRepository.save(user);
    }

    async login(loginUserDto: loginUserDto) {
        const { email, password } = loginUserDto;

        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new BadRequestException(`User with email ${email} not found`);

        if (password !== user.password)
            throw new BadRequestException(`Invalid password`);

        return user;
    }
}
