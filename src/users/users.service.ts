import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async create(email: string, password: string) {

        if(await this.userRepository.findOneBy({ email }))
            throw new BadRequestException('User already exists');

        return await this.userRepository.save({ email, password });
    }

    async findById(id: number) {
        if(! await this.userRepository.findOneBy({ id }))
            throw new NotFoundException('User not found');

        return await this.userRepository.findOneBy({ id });
    }

    async findAll() {
        return await this.userRepository.find();
    }
}
