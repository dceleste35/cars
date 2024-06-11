import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async create(email: string, password: string): Promise<User> {
        if (await this.findByEmail(email))
             new BadRequestException('User already exists');

        const user = await this.userRepository.create({ email, password });
        return this.userRepository.save(user);
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new NotFoundException('User not found');

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ email });
        if (!user)
            throw new NotFoundException('User not found');

        return user;
    }

    findAll() {
        return this.userRepository.find();
    }

    async update(id: number, email: string, password: string): Promise<User> {
        const user = await this.findById(id);
        user.email = email;
        user.password = password;
        return this.userRepository.save(user);
    }
}
