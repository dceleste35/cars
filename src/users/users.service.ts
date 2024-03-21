import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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
}
