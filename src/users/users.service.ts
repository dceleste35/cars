import { Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    create(email: string, password: string) {
        return this.userRepository.save({ email, password });
    }

    findById(id: number) {
        return this.userRepository.findOneBy({ id });
    }

    findByEmail(email: string) {
        return this.userRepository.findOneBy({ email });
    }

    findAll() {
        return this.userRepository.find();
    }
}
